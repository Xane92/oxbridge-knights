import Image from "next/image";
import Link from "next/link";
import { getProjects, type Project } from "@/lib/projects";
import { resolveImage } from "@/lib/images";
import LineMask from "../components/LineMask";
import ClipReveal from "../components/ClipReveal";

export default async function ServicesPage() {
  const modern = (await getProjects()).filter((p) => !p.legacy);

  /**
   * Renders are pulled by category, sharpest first (hero tier, then newest),
   * and never reused across two services.
   */
  const claimed = new Set<string>();

  function pick(categories: string[], count: number): Project[] {
    const ranked = modern
      .filter((p) => categories.includes(p.category) && !claimed.has(p.id))
      .sort(
        (a, b) =>
          categories.indexOf(a.category) - categories.indexOf(b.category) ||
          Number(b.tier === "hero") - Number(a.tier === "hero") ||
          b.year - a.year ||
          a.id.localeCompare(b.id),
      )
      .slice(0, count);

    ranked.forEach((p) => claimed.add(p.id));
    return ranked;
  }

  const services: {
    n: string;
    name: string;
    line: string;
    renders: Project[];
  }[] = [
    {
      n: "01",
      name: "Architecture",
      line: "Concept to completion, across residential, commercial and civic.",
      renders: pick(["Residential High-Rise", "Mixed-Use"], 2),
    },
    {
      n: "02",
      name: "Interior Design",
      line: "Interiors that finish the architecture, not decorate it.",
      renders: pick(["Interiors"], 2),
    },
    {
      n: "03",
      name: "Real Estate Development",
      line: "We originate, design and de-risk the projects we believe in.",
      renders: pick(["Multi-Residential"], 2),
    },
    {
      n: "04",
      name: "Construction & Project Delivery",
      line: "Drawings become buildings, on the ground, in Lagos conditions.",
      renders: pick(["Commercial & Civic"], 2),
    },
    {
      n: "05",
      name: "Master Planning",
      line: "Estates and mixed-use districts planned to grow well.",
      renders: pick(["Mixed-Use", "Recreational"], 2),
    },
  ];

  return (
    <>
      <section
        aria-labelledby="services-heading"
        className="w-full px-[5vw] md:px-[6vw] pt-[26vh] pb-[12vh]"
        style={{ background: "var(--ink)", color: "var(--white)" }}
      >
        <div className="text-meta text-white/60">
          <span style={{ color: "var(--vermilion)" }}>(002)</span> Services
        </div>

        <h1
          id="services-heading"
          className="mt-8 font-display"
          style={{
            fontSize: "var(--step-display-xl)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          <LineMask className="block">
            <span>Services</span>
          </LineMask>
        </h1>

        <p className="mt-10 text-white/75 max-w-[54ch]">
          Five disciplines, one team. We can take a site from first sketch to
          handover without passing it between studios.
        </p>
      </section>

      <section
        className="w-full px-[5vw] md:px-[6vw]"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        <ul className="flex flex-col">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <li
                key={s.n}
                className="grid grid-cols-12 gap-x-6 gap-y-10 items-start py-[12vh]"
                style={{ borderTop: "1px solid var(--hair)" }}
              >
                <div
                  className={
                    flip
                      ? "col-span-12 md:col-span-4 md:col-start-9 md:order-2"
                      : "col-span-12 md:col-span-4 md:col-start-1"
                  }
                >
                  <div
                    className="text-meta"
                    style={{ color: "var(--vermilion)" }}
                  >
                    ({s.n})
                  </div>
                  <h2
                    className="mt-5 font-display"
                    style={{
                      fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
                      lineHeight: 1.02,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {s.name}
                  </h2>
                  <p className="mt-5 max-w-[38ch]" style={{ opacity: 0.78 }}>
                    {s.line}
                  </p>
                </div>

                <div
                  className={
                    flip
                      ? "col-span-12 md:col-span-7 md:col-start-1 md:order-1"
                      : "col-span-12 md:col-span-7 md:col-start-6"
                  }
                >
                  <div
                    className={
                      s.renders.length > 1
                        ? "grid grid-cols-2 gap-4 md:gap-6"
                        : "grid grid-cols-1"
                    }
                  >
                    {s.renders.map((p, n) => (
                      <div
                        key={p.id}
                        className={n === 1 ? "mt-[12%]" : undefined}
                      >
                        <ClipReveal
                          style={{
                            aspectRatio:
                              s.renders.length > 1
                                ? n === 0
                                  ? "4 / 5"
                                  : "3 / 4"
                                : "16 / 10",
                          }}
                        >
                          {p.images[0] ? (
                            <Image
                              src={resolveImage(p.images[0])}
                              alt={`${p.title}, ${p.location}`}
                              fill
                              sizes="(min-width: 700px) 30vw, 45vw"
                              loading={i === 0 ? "eager" : "lazy"}
                              style={{ objectFit: "cover" }}
                            />
                          ) : null}
                        </ClipReveal>
                        <div
                          className="mt-3 text-meta"
                          style={{ color: "var(--slate)" }}
                        >
                          {p.title} · {p.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        className="w-full px-[5vw] md:px-[6vw] py-[18vh]"
        style={{ background: "var(--ink)", color: "var(--white)" }}
      >
        <h2
          className="font-display max-w-[18ch]"
          style={{
            fontSize: "var(--step-display-l)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
          }}
        >
          <LineMask className="block">
            <span>One team, start to</span>
            <span>
              <em
                className="italic"
                style={{ color: "var(--vermilion)", fontStyle: "italic" }}
              >
                handover.
              </em>
            </span>
          </LineMask>
        </h2>

        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5">
          <Link
            href="/contact"
            data-cursor="view"
            data-cursor-label="Contact"
            className="text-meta ok-ul"
          >
            Start a project →
          </Link>
          <Link
            href="/projects"
            data-cursor="view"
            data-cursor-label="Work"
            className="text-meta ok-ul text-white/70"
          >
            See the work →
          </Link>
        </div>
      </section>
    </>
  );
}
