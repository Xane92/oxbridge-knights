"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { resolveImage } from "@/lib/images";
import type { ProjectRecord } from "@/lib/projects";

const STORAGE_BUCKET = "project-images";

/** Pull the in-bucket object path out of a Supabase public Storage URL. */
function storagePath(url: string): string | null {
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const at = url.indexOf(marker);
  return at === -1 ? null : decodeURIComponent(url.slice(at + marker.length));
}

export default function Dashboard() {
  const router = useRouter();
  const search = useSearchParams();
  const supabase = useMemo(() => createClient(), []);

  const [projects, setProjects] = useState<ProjectRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      setError(error.message);
      setProjects([]);
      return;
    }
    setProjects((data ?? []) as ProjectRecord[]);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  // One-time banner after returning from a save.
  useEffect(() => {
    const status = search.get("status");
    const id = search.get("id");
    if (!status) return;
    if (status === "created") setNotice(`Project ${id ?? ""} created.`);
    else if (status === "updated") setNotice(`Project ${id ?? ""} updated.`);
    // Strip the query so a refresh does not repeat the banner.
    router.replace("/admin");
  }, [search, router]);

  const remove = async (project: ProjectRecord) => {
    setBusyId(project.id);
    setError(null);

    const { error: delErr } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (delErr) {
      setError(delErr.message);
      setBusyId(null);
      return;
    }

    // Best-effort Storage cleanup: only objects we uploaded (public URLs into
    // our bucket). Failure here must not undo the row delete.
    const paths = (project.images ?? [])
      .map(storagePath)
      .filter((p): p is string => Boolean(p));
    if (paths.length > 0) {
      try {
        await supabase.storage.from(STORAGE_BUCKET).remove(paths);
      } catch {
        // Ignore: the row is gone; an orphaned object is harmless here.
      }
    }

    setProjects((prev) => (prev ?? []).filter((p) => p.id !== project.id));
    setConfirmingId(null);
    setBusyId(null);
    setNotice(`Project ${project.id} deleted.`);
  };

  const signOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  const total = projects?.length ?? 0;

  return (
    <section
      className="w-full px-[5vw] md:px-[6vw] pt-[20vh] pb-[16vh]"
      style={{ background: "var(--paper)", color: "var(--ink)", minHeight: "100svh" }}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="text-meta" style={{ color: "var(--slate)" }}>
            <span style={{ color: "var(--vermilion)" }}>(000)</span> Studio
          </div>
          <h1
            className="mt-6 font-display"
            style={{
              fontSize: "var(--step-display-l)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Projects
          </h1>
          <p className="mt-4 text-meta" style={{ color: "var(--slate)" }}>
            {projects === null ? "Loading" : `${total} total`}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/admin/projects/new"
            className="ok-admin-btn font-display"
          >
            Add project <span aria-hidden style={{ color: "var(--vermilion)" }}>+</span>
          </Link>
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="ok-ul text-meta"
            style={{ color: "var(--slate)" }}
          >
            {signingOut ? "Logging out" : "Log out"}
          </button>
        </div>
      </div>

      {notice ? (
        <p
          role="status"
          className="mt-10"
          style={{ color: "var(--ink)", borderLeft: "2px solid var(--vermilion)", paddingLeft: "0.9rem" }}
        >
          {notice}
        </p>
      ) : null}

      {error ? (
        <p role="alert" className="mt-10" style={{ color: "var(--vermilion)" }}>
          {error}
        </p>
      ) : null}

      <div className="mt-12 overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: 720 }}>
          <thead>
            <tr className="text-meta" style={{ color: "var(--slate)" }}>
              <th className="text-left font-medium py-3 pr-4">Image</th>
              <th className="text-left font-medium py-3 pr-4">Title</th>
              <th className="text-left font-medium py-3 pr-4">Category</th>
              <th className="text-left font-medium py-3 pr-4">Year</th>
              <th className="text-left font-medium py-3 pr-4">Tier</th>
              <th className="text-left font-medium py-3 pr-4">Legacy</th>
              <th className="text-right font-medium py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects === null ? (
              <tr>
                <td colSpan={7} className="py-8" style={{ color: "var(--slate)" }}>
                  Loading projects.
                </td>
              </tr>
            ) : total === 0 ? (
              <tr>
                <td colSpan={7} className="py-8" style={{ color: "var(--slate)" }}>
                  {error ? "Could not load projects." : "No projects yet."}
                </td>
              </tr>
            ) : (
              projects.map((p) => {
                const src = resolveImage(p.images?.[0]);
                const confirming = confirmingId === p.id;
                const busy = busyId === p.id;
                return (
                  <tr
                    key={p.id}
                    style={{ borderTop: "1px solid var(--hair)", verticalAlign: "middle" }}
                  >
                    <td className="py-3 pr-4">
                      {/* Plain img: the admin tool skips next/image optimisation. */}
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={src}
                          alt=""
                          width={44}
                          height={55}
                          style={{
                            width: 44,
                            height: 55,
                            objectFit: "cover",
                            background: "rgba(11,26,46,0.06)",
                            display: "block",
                          }}
                        />
                      ) : (
                        <div
                          aria-hidden
                          style={{
                            width: 44,
                            height: 55,
                            background: "rgba(11,26,46,0.06)",
                          }}
                        />
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <div style={{ fontWeight: 500 }}>{p.title}</div>
                      <div className="text-meta" style={{ color: "var(--slate)" }}>
                        {p.id} · {p.location}
                      </div>
                    </td>
                    <td className="py-3 pr-4">{p.category}</td>
                    <td className="py-3 pr-4">{p.year}</td>
                    <td className="py-3 pr-4" style={{ textTransform: "capitalize" }}>
                      {p.tier}
                    </td>
                    <td className="py-3 pr-4">
                      {p.legacy ? (
                        <span style={{ color: "var(--vermilion)" }}>Yes</span>
                      ) : (
                        <span style={{ color: "var(--slate)" }}>No</span>
                      )}
                    </td>
                    <td className="py-3">
                      {confirming ? (
                        <div className="flex items-center justify-end gap-4">
                          <span className="text-meta" style={{ color: "var(--slate)" }}>
                            Delete?
                          </span>
                          <button
                            type="button"
                            onClick={() => remove(p)}
                            disabled={busy}
                            className="ok-ul text-meta"
                            style={{ color: "var(--vermilion)" }}
                          >
                            {busy ? "Deleting" : "Confirm"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmingId(null)}
                            disabled={busy}
                            className="ok-ul text-meta"
                            style={{ color: "var(--slate)" }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            href={`/admin/projects/${p.id}/edit`}
                            className="ok-ul text-meta"
                            style={{ color: "var(--ink)" }}
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => setConfirmingId(p.id)}
                            className="ok-ul text-meta"
                            style={{ color: "var(--slate)" }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
