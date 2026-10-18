"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { resolveImage } from "@/lib/images";

const CATEGORIES = [
  "Mixed-Use",
  "Residential High-Rise",
  "Multi-Residential",
  "Private Residence",
  "Interiors",
  "Commercial & Civic",
  "Recreational",
] as const;

const STORAGE_BUCKET = "project-images";

type FormState = {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  date: string;
  year: string;
  tier: "hero" | "gallery";
  legacy: boolean;
  sort_order: string;
  images: string[];
};

const EMPTY: FormState = {
  id: "",
  title: "",
  type: "",
  category: CATEGORIES[0],
  location: "",
  date: "",
  year: String(new Date().getFullYear()),
  tier: "gallery",
  legacy: false,
  sort_order: "",
  images: [],
};

export default function ProjectForm({
  mode,
  id,
}: {
  mode: "new" | "edit";
  id?: string;
}) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [form, setForm] = useState<FormState>(
    mode === "edit" && id ? { ...EMPTY, id } : EMPTY,
  );
  const [loading, setLoading] = useState(mode === "edit");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Load the existing row when editing.
  useEffect(() => {
    if (mode !== "edit" || !id) return;
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (!active) return;
      if (error || !data) {
        setLoadError(error?.message ?? "Project not found.");
        setLoading(false);
        return;
      }
      setForm({
        id: data.id,
        title: data.title ?? "",
        type: data.type ?? "",
        category: data.category ?? CATEGORIES[0],
        location: data.location ?? "",
        date: data.date ?? "",
        year: data.year != null ? String(data.year) : "",
        tier: data.tier === "hero" ? "hero" : "gallery",
        legacy: Boolean(data.legacy),
        sort_order: data.sort_order != null ? String(data.sort_order) : "",
        images: Array.isArray(data.images) ? data.images : [],
      });
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [mode, id, supabase]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = ""; // allow re-selecting the same file later
    if (files.length === 0) return;

    const projectId = form.id.trim();
    if (!projectId) {
      setUploadError("Enter a project ID before uploading images.");
      return;
    }

    setUploadError(null);
    setUploading(true);
    try {
      for (const file of files) {
        const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${projectId}/${Date.now()}_${safe}`;
        const { error: upErr } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type || undefined,
          });
        if (upErr) {
          setUploadError(upErr.message);
          break;
        }
        const { data: pub } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(path);
        setForm((f) => ({ ...f, images: [...f.images, pub.publicUrl] }));
      }
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saving || uploading) return;
    setError(null);

    const trimmedId = form.id.trim();
    if (!trimmedId) {
      setError("ID is required.");
      return;
    }
    const year = Number(form.year);
    if (!form.year.trim() || !Number.isFinite(year)) {
      setError("Year must be a number.");
      return;
    }
    let sortOrder: number | null = null;
    if (form.sort_order.trim() !== "") {
      sortOrder = Number(form.sort_order);
      if (!Number.isFinite(sortOrder)) {
        setError("Sort order must be a number.");
        return;
      }
    }

    const row = {
      id: trimmedId,
      title: form.title.trim(),
      type: form.type.trim(),
      category: form.category,
      location: form.location.trim(),
      date: form.date.trim(),
      year,
      tier: form.tier,
      legacy: form.legacy,
      sort_order: sortOrder,
      images: form.images,
    };

    setSaving(true);
    const { error: saveErr } =
      mode === "new"
        ? await supabase.from("projects").insert(row)
        : await supabase.from("projects").update(row).eq("id", trimmedId);

    if (saveErr) {
      setError(saveErr.message);
      setSaving(false);
      return;
    }

    const status = mode === "new" ? "created" : "updated";
    router.push(`/admin?status=${status}&id=${encodeURIComponent(trimmedId)}`);
    router.refresh();
  };

  if (loading) {
    return (
      <p className="text-meta" style={{ color: "var(--slate)" }}>
        Loading project.
      </p>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col gap-6">
        <p role="alert" style={{ color: "var(--vermilion)" }}>
          {loadError}
        </p>
        <Link href="/admin" className="ok-ul text-meta" style={{ color: "var(--ink)" }}>
          Back to dashboard
        </Link>
      </div>
    );
  }

  const idReadOnly = mode === "edit";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-12 max-w-[48rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        <Field label="ID" hint={idReadOnly ? "Read-only" : "Required, unique"}>
          <input
            className="ok-field mt-3"
            value={form.id}
            onChange={(e) => set("id", e.target.value)}
            readOnly={idReadOnly}
            required
            autoComplete="off"
            style={idReadOnly ? { opacity: 0.6 } : undefined}
          />
        </Field>

        <Field label="Title">
          <input
            className="ok-field mt-3"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            required
          />
        </Field>

        <Field label="Type">
          <input
            className="ok-field mt-3"
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
          />
        </Field>

        <Field label="Category">
          <select
            className="ok-field mt-3"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Location">
          <input
            className="ok-field mt-3"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </Field>

        <Field label="Date" hint="Free text, e.g. May 2026">
          <input
            className="ok-field mt-3"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </Field>

        <Field label="Year">
          <input
            className="ok-field mt-3"
            type="number"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            required
          />
        </Field>

        <Field label="Sort order" hint="Lower sorts first">
          <input
            className="ok-field mt-3"
            type="number"
            value={form.sort_order}
            onChange={(e) => set("sort_order", e.target.value)}
          />
        </Field>

        <Field label="Tier">
          <select
            className="ok-field mt-3"
            value={form.tier}
            onChange={(e) => set("tier", e.target.value as "hero" | "gallery")}
          >
            <option value="gallery">gallery</option>
            <option value="hero">hero</option>
          </select>
        </Field>

        <div className="flex items-center gap-3 self-end pb-2">
          <input
            id="legacy"
            type="checkbox"
            checked={form.legacy}
            onChange={(e) => set("legacy", e.target.checked)}
            style={{ width: 18, height: 18, accentColor: "var(--vermilion)" }}
          />
          <label htmlFor="legacy" className="text-meta" style={{ color: "var(--slate)" }}>
            Legacy (early work)
          </label>
        </div>
      </div>

      {/* Image uploader */}
      <div>
        <div className="text-meta" style={{ color: "var(--slate)" }}>
          Images
        </div>

        {form.images.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-5">
            {form.images.map((img, i) => (
              <li key={`${img}-${i}`} style={{ width: 120 }}>
                <div style={{ position: "relative", width: 120, height: 150 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveImage(img)}
                    alt=""
                    style={{
                      width: 120,
                      height: 150,
                      objectFit: "cover",
                      background: "rgba(11,26,46,0.06)",
                      display: "block",
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="ok-ul text-meta mt-2"
                  style={{ color: "var(--vermilion)" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-meta" style={{ color: "var(--slate)" }}>
            No images attached yet.
          </p>
        )}

        <label className="mt-6 inline-block">
          <span className="ok-admin-btn font-display" aria-hidden={false}>
            {uploading ? "Uploading" : "Add images"}
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
            multiple
            onChange={onFiles}
            disabled={uploading}
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              overflow: "hidden",
              clip: "rect(0 0 0 0)",
            }}
          />
        </label>

        {uploadError ? (
          <p role="alert" className="mt-4" style={{ color: "var(--vermilion)" }}>
            {uploadError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <button type="submit" disabled={saving || uploading} className="ok-admin-btn font-display">
          {saving ? "Saving" : mode === "new" ? "Create project" : "Save changes"}
        </button>
        <Link href="/admin" className="ok-ul text-meta" style={{ color: "var(--slate)" }}>
          Cancel
        </Link>
        {error ? (
          <p role="alert" style={{ color: "var(--vermilion)" }}>
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-meta flex items-center gap-2" style={{ color: "var(--slate)" }}>
        {label}
        {hint ? (
          <span style={{ textTransform: "none", letterSpacing: 0, opacity: 0.7 }}>
            ({hint})
          </span>
        ) : null}
      </span>
      {children}
    </div>
  );
}
