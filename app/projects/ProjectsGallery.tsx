"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import type { Project } from "@/lib/projects";
import { resolveImage } from "@/lib/images";

/** Exactly the seven categories used in the manifest, in spec order. */
const CATEGORIES = [
  "Mixed-Use",
  "Residential High-Rise",
  "Multi-Residential",
  "Private Residence",
  "Interiors",
  "Commercial & Civic",
  "Recreational",
] as const;

const ALL = "All";
const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * The photographic wipe (§5): frame clips bottom to top, render settles from
 * 1.08 to 1. Driven off an explicit in-view flag rather than `whileInView`,
 * because AnimatePresence's `initial={false}` would otherwise strip the closed
 * starting state off every tile present on first render.
 */
function Reveal({
  reduce,
  children,
}: {
  reduce: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // `open` must not depend on reduced motion: the server renders it as false
  // either way, so branching here would hydrate into an attribute mismatch.
  // Reduced motion is carried by the duration instead, which makes the same
  // reveal land instantly.
  const open = useInView(ref, { once: true, amount: 0.2 });
  const transition = reduce ? { duration: 0 } : { duration: 1.1, ease: EXPO };

  return (
    // The observer sits on the wrapper, not the frame: a frame clipped to zero
    // height never intersects, so watching it would deadlock its own reveal.
    <div ref={ref}>
      <motion.div
        className="ok-frame"
        animate={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={transition}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: open ? 1 : 1.08 }}
          transition={transition}
          style={{ willChange: "transform" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>(ALL);
  const [open, setOpen] = useState<number | null>(null);

  // The gallery is the modern book only. Legacy work belongs on About.
  const modern = useMemo(
    () =>
      projects
        .filter((p) => !p.legacy)
        .sort((a, b) => b.year - a.year || a.id.localeCompare(b.id)),
    [projects],
  );

  const visible = useMemo(
    () => (filter === ALL ? modern : modern.filter((p) => p.category === filter)),
    [filter, modern],
  );

  const isOpen = open !== null;
  const current = isOpen ? visible[open] : undefined;

  const close = useCallback(() => setOpen(null), []);
  // The open index addresses the filtered list, so a new filter has to reset
  // it rather than leave the overlay pointing at a project that moved.
  const pick = useCallback((c: string) => {
    setFilter(c);
    setOpen(null);
  }, []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) =>
        i === null ? i : (i + dir + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  // Lenis owns the scroll position, so the lock has to go through it; the
  // inline overflow covers the reduced-motion path where Lenis never starts.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    window.dispatchEvent(new Event("ok:scroll-lock"));
    return () => {
      html.style.overflow = previous;
      window.dispatchEvent(new Event("ok:scroll-unlock"));
    };
  }, [isOpen]);

  const count =
    filter === ALL
      ? `${visible.length} Projects`
      : `${visible.length} · ${filter}`;

  return (
    <>
      <section
        aria-labelledby="projects-heading"
        className="w-full px-[5vw] md:px-[6vw] pt-[26vh] pb-[10vh]"
        style={{ background: "var(--ink)", color: "var(--white)" }}
      >
        <div className="text-meta text-white/60">
          <span style={{ color: "var(--vermilion)" }}>(003)</span> Index
        </div>

        <h1
          id="projects-heading"
          className="mt-6 font-display"
          style={{
            fontSize: "var(--step-display-xl)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          Projects
        </h1>

        <p className="mt-6 text-meta text-white/70" aria-live="polite">
          {count}
        </p>

        <div className="mt-12 md:mt-16 -mx-[5vw] md:-mx-[6vw] px-[5vw] md:px-[6vw] overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-6 md:gap-8 min-w-max">
            {[ALL, ...CATEGORIES].map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => pick(c)}
                  aria-pressed={filter === c}
                  data-cursor="view"
                  data-cursor-label={c === ALL ? "All" : "Filter"}
                  className="ok-filter text-meta"
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="w-full px-[5vw] md:px-[6vw] py-[12vh]"
        style={{ background: "var(--paper)", color: "var(--ink)" }}
      >
        <motion.ul layout className="ok-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        ease: EXPO,
                        delay: Math.min(i, 10) * 0.03,
                      }
                }
                className={`ok-tile${p.tier === "hero" ? " ok-tile-hero" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  data-cursor="view"
                  data-cursor-label="View"
                  className="ok-tile-btn"
                  aria-label={`${p.title}, ${p.location}. Open images`}
                >
                  <Reveal reduce={!!reduce}>
                    {p.images[0] ? (
                    <Image
                      src={resolveImage(p.images[0])}
                      alt={`${p.title}, ${p.location}`}
                      fill
                      sizes={
                        p.tier === "hero"
                          ? "(min-width: 700px) 50vw, 90vw"
                          : "(min-width: 700px) 33vw, 90vw"
                      }
                      loading={i < 4 ? "eager" : "lazy"}
                      fetchPriority={i < 2 ? "high" : "auto"}
                      style={{ objectFit: "cover" }}
                    />
                    ) : null}
                  </Reveal>

                  <div className="mt-5">
                    <span className="ok-name">
                      {p.title}
                      <span aria-hidden className="ok-rule" />
                    </span>
                  </div>

                  <div
                    className="mt-3 text-meta ok-meta-shift"
                    style={{ color: "var(--slate)" }}
                  >
                    {p.year} &middot; {p.location}
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>

      <AnimatePresence>
        {isOpen && current ? (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${current.title}, ${current.location}`}
            data-cursor="close"
            data-cursor-label="Close"
            onClick={close}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.35, ease: EXPO }
            }
            className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain"
            style={{ background: "var(--ink)", color: "var(--white)" }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              data-cursor="view"
              data-cursor-label="View"
              className="ok-lightbox-body min-h-full px-[5vw] md:px-[6vw] py-[6vh] flex flex-col gap-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="text-meta text-white/60">
                  {String(open + 1).padStart(2, "0")} /{" "}
                  {String(visible.length).padStart(2, "0")}
                  {filter === ALL ? "" : ` · ${filter}`}
                </div>
                <button
                  type="button"
                  onClick={close}
                  data-cursor="close"
                  data-cursor-label="Close"
                  className="text-meta text-white/70 hover:text-white transition-colors"
                >
                  Close &times;
                </button>
              </div>

              <div className="flex flex-col gap-4 md:gap-6">
                {current.images.map((src, n) => (
                  <div key={src} className="ok-lightbox-frame">
                    <Image
                      src={resolveImage(src)}
                      alt={`${current.title}, ${current.location}${
                        n > 0 ? `, view ${n + 1}` : ""
                      }`}
                      fill
                      sizes="(min-width: 700px) 88vw, 90vw"
                      loading={n === 0 ? "eager" : "lazy"}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-[4vh]">
                <div>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: "var(--step-display-m)",
                      lineHeight: 1.02,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {current.title}
                  </h2>
                  <p className="mt-3 text-meta text-white/60">
                    {current.type} &middot; {current.location} &middot;{" "}
                    {current.date}
                  </p>
                </div>

                <div className="flex items-center gap-8 shrink-0">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    data-cursor="view"
                    data-cursor-label="Prev"
                    className="text-meta text-white/70 hover:text-white transition-colors"
                  >
                    &larr; Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    data-cursor="view"
                    data-cursor-label="Next"
                    className="text-meta text-white/70 hover:text-white transition-colors"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
