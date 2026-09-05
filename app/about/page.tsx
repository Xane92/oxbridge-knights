import Image from "next/image";
import Link from "next/link";
import manifest from "@/data/manifest.json";
import LineMask from "../components/LineMask";
import ClipReveal from "../components/ClipReveal";
import Asterisk from "../components/Asterisk";

type Project = {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  date: string;
  year: number;
  legacy: boolean;
  tier: "hero" | "gallery";
  images: string[];
};

const projects = manifest as Project[];
const modernCount = projects.filter((p) => !p.legacy).length;

/** The one place the early work appears: proof of track record, kept quiet. */
const legacy = projects
  .filter((p) => p.legacy)
  .sort((a, b) => a.year - b.year || a.id.localeCompare(b.id));

const values: { name: string; line: string }[] = [
  {
    name: "Nerve",
    line: "We design buildings confident enough to look unlike their neighbours.",
  },
  {
    name: "Rigor",
    line: "Every line is drawn to be built. Beauty that survives the site.",
  },
  {
    name: "Context",
    line: "Lagos is the brief. We build for how this city actually lives.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section
        aria-labelledby="about-heading"
        className="w-full px-[5vw] md:px-[6vw] pt-[26vh] pb-[14vh]"
        style={{ background: "var(--ink)", color: "var(--white)" }}
      >
        <div className="text-meta text-white/60">
          <span style={{ color: "var(--vermilion)" }}>(001)</span> Studio
        </div>

        <h1
          id="about-heading"
          className="mt-8 font-display max-w-[16ch]"
          style={{
            fontSize: "var(--step-display-xl)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          <LineMask className="block">
            <span>Heritage in the name.</span>
            <span>
              <em
                className="italic"
                style={{ color: "var(--vermilion)", fontStyle: "italic" }}
              >
                Not
              </em>{" "}
              in the work.
            </span>
          </LineMask>
        </h1>
      </section>

      <section
        className="w-full px-[5vw] md:px-[6vw] py-[16vh]"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        <div className="grid grid-cols-12 gap-6">
          <div
            className="col-span-12 md:col-span-3 text-meta"
            style={{ color: "var(--slate)" }}
          >
            The studio
          </div>

          <div className="col-span-12 md:col-span-8 md:col-start-4 flex flex-col gap-8 max-w-[62ch]">
            <p style={{ opacity: 0.82 }}>
              We are an architecture, real estate and construction studio based
              in Lagos, with a standing presence in London. Ten years of built
              work sits behind the name, across private clients, developers and
              institutions.
            </p>
            <p style={{ opacity: 0.82 }}>
              The team is young on purpose. A conservative profession reads
              ambition as arrogance; we read it as the brief. We work at every
              scale the city asks for, from residential high-rises and
              mixed-use districts to private residences, interiors, civic
              buildings and recreational schemes, and we stay on the ground
              until the drawings are buildings.
            </p>
            <p style={{ opacity: 0.82 }}>
              The belief underneath all of it is simple. Lagos deserves
              architecture as ambitious as the city already is.
            </p>

            <Link
              href="/projects"
              data-cursor="view"
              data-cursor-label="Work"
              className="text-meta mt-4 ok-ul self-start"
              style={{ color: "var(--ink)" }}
            >
              See the work →
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="values-heading"
        className="w-full px-[5vw] md:px-[6vw] pt-[16vh] pb-[10vh]"
        style={{ background: "var(--ink)", color: "var(--white)" }}
      >
        <h2 id="values-heading" className="sr-only">
          What we hold to
        </h2>

        <ul className="flex flex-col">
          {values.map((v) => (
            <li
              key={v.name}
              className="grid grid-cols-12 gap-6 py-10 md:py-14"
              style={{ borderTop: "1px solid rgba(251, 250, 247, 0.16)" }}
            >
              <div className="col-span-12 md:col-span-5">
                <span
                  className="font-display"
                  style={{
                    fontSize: "var(--step-display-m)",
                    lineHeight: 1,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {v.name}
                  <span
                    aria-hidden
                    style={{ color: "var(--vermilion)" }}
                  >
                    .
                  </span>
                </span>
              </div>
              <p className="col-span-12 md:col-span-6 md:col-start-7 text-white/75 max-w-[46ch]">
                {v.line}
              </p>
            </li>
          ))}
        </ul>

        <div
          className="mt-[8vh] pt-8 text-meta text-white/70 flex flex-wrap items-center gap-x-3 gap-y-2"
          style={{ borderTop: "1px solid rgba(251, 250, 247, 0.16)" }}
        >
          <span>{modernCount} Projects</span>
          <span aria-hidden className="text-white/35">
            ·
          </span>
          <span>10+ Years</span>
          <span aria-hidden className="text-white/35">
            ·
          </span>
          <span>2 Cities</span>
          <span aria-hidden className="text-white/35">
            ·
          </span>
          <span>
            Lagos <Asterisk /> London
          </span>
        </div>
      </section>

      <section
        aria-labelledby="legacy-heading"
        className="ok-legacy w-full px-[5vw] md:px-[6vw] py-[16vh]"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        <div className="grid grid-cols-12 gap-6 items-end">
          <h2
            id="legacy-heading"
            className="col-span-12 md:col-span-6 font-display"
            style={{
              fontSize: "var(--step-display-m)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
            }}
          >
            Built since 2016
          </h2>
          <p
            className="col-span-12 md:col-span-5 md:col-start-8 text-meta"
            style={{ color: "var(--slate)" }}
          >
            The early book / {legacy.length} works
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10">
          {legacy.map((p) => (
            <li key={p.id}>
              <Link
                href="/projects"
                data-cursor="view"
                data-cursor-label="Work"
                className="block"
              >
                <ClipReveal style={{ aspectRatio: "4 / 3" }}>
                  <Image
                    src={`/library/${p.images[0]}`}
                    alt={`${p.title}, ${p.location}`}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 700px) 30vw, 44vw"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />
                </ClipReveal>

                <div
                  className="mt-4 font-display"
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.15,
                    color: "var(--slate)",
                  }}
                >
                  {p.title}
                </div>
                <div
                  className="mt-2 text-meta"
                  style={{ color: "var(--slate)", opacity: 0.75 }}
                >
                  {p.location}
                </div>
                <div
                  className="mt-1 text-meta"
                  style={{ color: "var(--slate)", opacity: 0.75 }}
                >
                  {p.year}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
