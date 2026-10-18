import type { Metadata } from "next";
import Link from "next/link";
import ProjectForm from "../../ProjectForm";

export const metadata: Metadata = {
  title: "Edit project · Oxbridge Knights",
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section
      className="w-full px-[5vw] md:px-[6vw] pt-[20vh] pb-[16vh]"
      style={{ background: "var(--paper)", color: "var(--ink)", minHeight: "100svh" }}
    >
      <Link href="/admin" className="ok-ul text-meta" style={{ color: "var(--slate)" }}>
        ← Dashboard
      </Link>

      <h1
        className="mt-6 font-display"
        style={{
          fontSize: "var(--step-display-l)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
        }}
      >
        Edit project
      </h1>
      <p className="mt-4 text-meta" style={{ color: "var(--slate)" }}>
        {id}
      </p>

      <div className="mt-14">
        <ProjectForm mode="edit" id={id} />
      </div>
    </section>
  );
}
