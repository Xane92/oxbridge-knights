import Image from "next/image";
import Link from "next/link";
import manifest from "@/data/manifest.json";
import SelectedWorks from "./components/SelectedWorks";
import Asterisk from "./components/Asterisk";

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

// Curated, hand-ordered: no two adjacent cards share a category, and the
// sharpest exterior renders lead. Order matters — do not sort.
const worksOrder = ["p03", "p14", "p50", "p20", "p17", "p11", "p23", "p52"];

// The end panel counts the modern book only, matching /projects.
const modernCount = projects.filter((p) => !p.legacy).length;

const heroPicks: Project[] = worksOrder.map((id) => {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Selected Works: no manifest entry for "${id}"`);
  return project;
});

const services: { n: string; name: string; line: string }[] = [
  {
    n: "01",
    name: "Architecture",
    line: "Concept to completion, across residential, commercial and civic.",
  },
  {
    n: "02",
    name: "Interior Design",
    line: "Interiors that finish the architecture, not decorate it.",
  },
  {
    n: "03",
    name: "Real Estate Development",
    line: "We originate, design and de-risk the projects we believe in.",
  },
  {
    n: "04",
    name: "Construction & Project Delivery",
    line: "Drawings become buildings, on the ground, in Lagos conditions.",
  },
  {
    n: "05",
    name: "Master Planning",
    line: "Estates and mixed-use districts planned to grow well.",
  },
];

const marqueeItems = [
  "Architecture",
  "Real Estate",
  "Construction",
  "Interiors",
  "Master Planning",
  "Lagos",
  "London",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Plate />
      <Studio />
      <Marquee />
      <SelectedWorks items={heroPicks} total={modernCount} />
      <ServicesTeaser />
      <Approach />
      <Cta />
    </>
  );
}

function Hero() {
  return (
    <section
      className="relative w-full flex flex-col justify-between px-[5vw] md:px-[6vw] pt-[28vh] pb-8"
      style={{ background: "var(--ink)", minHeight: "100svh" }}
    >
      <h1
        className="font-display max-w-[18ch]"
        style={{
          fontSize: "var(--step-display-xl)",
          lineHeight: 0.9,
          letterSpacing: "-0.025em",
        }}
      >
        <span className="block">Old name.</span>
        <span className="block">
          New{" "}
          <em
            className="italic"
            style={{ color: "var(--vermilion)", fontStyle: "italic" }}
          >
            rules.
          </em>
        </span>
      </h1>

      <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-meta flex items-center gap-3 text-white/85">
          <span
            aria-hidden
            className="inline-block rounded-full"
            style={{
              width: 8,
              height: 8,
              background: "var(--vermilion)",
            }}
          />
          Lagos / London
        </div>
        <div className="text-meta text-white/70">
          Architecture, Real Estate &amp; Construction
        </div>
      </div>

      <div className="mt-16 flex items-end justify-between">
        <div className="text-meta text-white/60">Scroll ↓</div>
        <div className="text-meta text-white/60">Since 2016</div>
      </div>
    </section>
  );
}

function Plate() {
  return (
    <section
      className="relative w-full"
      style={{ background: "var(--ink)", minHeight: "100svh" }}
    >
      <div
        className="relative w-full"
        style={{ height: "100svh", minHeight: "100svh" }}
      >
        <Image
          src="/library/p03_a.webp"
          alt="Mixed-Use Development, Victoria Island, Lagos"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,26,46,0.35) 0%, rgba(11,26,46,0) 25%, rgba(11,26,46,0) 60%, rgba(11,26,46,0.55) 100%)",
          }}
        />
        <div
          className="absolute top-[10vh] right-[5vw] md:right-[6vw] font-display leading-none"
          style={{
            fontSize: "clamp(4rem, 12vw, 12rem)",
            color: "var(--white)",
            letterSpacing: "-0.03em",
          }}
        >
          01
        </div>
        <div className="absolute left-[5vw] md:left-[6vw] bottom-[6vh] text-meta text-white/90 max-w-[80vw]">
          Mixed-Use Development / Victoria Island / 2026
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section
      className="w-full px-[5vw] md:px-[6vw] py-[16vh]"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2 text-meta" style={{ color: "var(--slate)" }}>
          <span style={{ color: "var(--vermilion)" }}>(01)</span> Studio
        </div>

        <h2
          className="col-span-12 md:col-span-10 font-display"
          style={{
            fontSize: "var(--step-display-l)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          An architecture, real estate &amp; construction studio in Lagos, with
          a foot in London.
        </h2>

        <div className="col-span-12 md:col-start-3 md:col-span-8 mt-10 md:mt-14">
          <p style={{ color: "var(--ink)", opacity: 0.82 }}>
            Ten years of built work, and a young team that treats a
            conservative profession as an open invitation. We design at every
            scale, from private residences to mixed-use districts, and we stay
            on the ground until the drawings become buildings.
          </p>
          <Link
            href="/about"
            data-cursor="view"
            data-cursor-label="Read"
            className="text-meta mt-10 inline-block"
            style={{ color: "var(--ink)" }}
          >
            Read the studio →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const line = (
    <span
      className="font-display italic whitespace-nowrap"
      style={{
        fontSize: "clamp(2.5rem, 8vw, 7rem)",
        letterSpacing: "-0.015em",
        color: "var(--ink)",
      }}
    >
      {marqueeItems.map((w, i) => (
        <span key={`w-${i}`}>
          {w}
          <Asterisk style={{ margin: "0 0.4em" }} />
        </span>
      ))}
    </span>
  );

  return (
    <section
      aria-label="Practice"
      className="w-full overflow-hidden"
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--hair)",
        borderBottom: "1px solid var(--hair)",
        padding: "2.4rem 0",
      }}
    >
      <div
        className="ok-marquee flex whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        <div className="flex shrink-0 pr-[3ch]">{line}</div>
        <div aria-hidden className="flex shrink-0 pr-[3ch]">
          {line}
        </div>
      </div>
    </section>
  );
}

function ServicesTeaser() {
  return (
    <section
      className="w-full px-[5vw] md:px-[6vw] py-[16vh]"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3 text-meta" style={{ color: "var(--slate)" }}>
          <span style={{ color: "var(--vermilion)" }}>(003)</span> Services
        </div>
        <h2
          className="col-span-12 md:col-span-9 font-display"
          style={{
            fontSize: "var(--step-display-l)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          What we do, in five lines.
        </h2>
      </div>

      <ul className="mt-16 grid grid-cols-1 divide-y" style={{ borderColor: "var(--hair)" }}>
        {services.map((s) => (
          <li
            key={s.n}
            className="grid grid-cols-12 gap-6 py-8"
            style={{ borderTop: "1px solid var(--hair)" }}
          >
            <div
              className="col-span-2 md:col-span-1 text-meta"
              style={{ color: "var(--vermilion)" }}
            >
              ({s.n})
            </div>
            <div
              className="col-span-10 md:col-span-6 font-display"
              style={{
                fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              {s.name}
            </div>
            <div
              className="col-span-12 md:col-span-5"
              style={{ color: "var(--ink)", opacity: 0.75 }}
            >
              {s.line}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Approach() {
  return (
    <section
      className="w-full px-[5vw] md:px-[6vw] py-[18vh]"
      style={{ background: "var(--ink)", color: "var(--white)" }}
    >
      <div className="text-meta text-white/60">
        <span style={{ color: "var(--vermilion)" }}>(004)</span> Approach
      </div>

      <h2
        className="mt-10 font-display max-w-[20ch]"
        style={{
          fontSize: "var(--step-display-l)",
          lineHeight: 0.98,
          letterSpacing: "-0.02em",
        }}
      >
        Luxury isn&apos;t loud. It&apos;s{" "}
        <em
          className="italic"
          style={{ color: "var(--vermilion)", fontStyle: "italic" }}
        >
          built
        </em>{" "}
        right.
      </h2>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-[100ch]">
        <p className="text-white/80">
          A conservative profession takes ambition for arrogance. We&apos;d
          rather be judged by what stands after the site is cleared than by how
          softly we introduce ourselves. Every proposal is drawn to be built,
          costed on Lagos terms, and detailed for the trades that will actually
          hold the trowel.
        </p>
        <p className="text-white/80">
          The heritage is in the name, not the work. We look at the city as it
          is, and we design buildings confident enough to look unlike their
          neighbours. Ten years in, that stubbornness is still the shortest
          route to work that lasts.
        </p>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section
      className="w-full px-[5vw] md:px-[6vw] py-[22vh] flex items-center"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <Link
        href="/contact"
        data-cursor="view"
        data-cursor-label="Contact"
        className="font-display block"
        style={{
          fontSize: "var(--step-display-xl)",
          lineHeight: 0.9,
          letterSpacing: "-0.025em",
          color: "var(--ink)",
        }}
      >
        Let&apos;s{" "}
        <em
          className="italic"
          style={{ color: "var(--vermilion)", fontStyle: "italic" }}
        >
          build.
        </em>{" "}
        <span aria-hidden style={{ color: "var(--vermilion)" }}>
          →
        </span>
      </Link>
    </section>
  );
}
