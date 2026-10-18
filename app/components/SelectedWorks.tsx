"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resolveImage } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  year: number;
  images: string[];
};

/** Desktop, motion allowed. Below this the section is a plain swipe rail. */
const PINNED = "(min-width: 761px) and (prefers-reduced-motion: no-preference)";

export default function SelectedWorks({
  items,
  total,
}: {
  items: WorkItem[];
  total: number;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(PINNED, () => {
      // Full natural width of the rail (max-content + its own padding), so the
      // last card lands flush against the right margin.
      const distance = () => Math.max(0, track.offsetWidth - window.innerWidth);

      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true, // recompute distance on resize
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]", track);

      cards.forEach((card) => {
        const frame = card.querySelector<HTMLElement>("[data-work-frame]");
        const media = card.querySelector<HTMLElement>("[data-work-media]");
        if (!frame || !media) return;

        // Cards already on screen when the section pins can never cross the
        // horizontal trigger line, so they wipe in off the vertical entrance
        // instead. Everything past the fold rides containerAnimation.
        const onScreenAtRest =
          card.getBoundingClientRect().left < window.innerWidth * 0.95;

        const tl = gsap.timeline({
          defaults: { duration: 1.1, ease: "expo.out" },
          scrollTrigger: onScreenAtRest
            ? { trigger: section, start: "top 70%", once: true }
            : {
                trigger: card,
                containerAnimation: travel,
                start: "left 92%",
                once: true,
              },
        });

        tl.fromTo(
          frame,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)" },
          0,
        ).fromTo(media, { scale: 1.08 }, { scale: 1 }, 0);
      });
    });

    // Late-loading renders can change the rail width; re-measure once settled.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, [items]);

  return (
    // ScrollTrigger silently disables pinSpacing when the pinned element's
    // parent is display:flex (and <main> is), which lets the next section
    // scroll up over the pinned stage. This plain block wrapper restores it.
    <div>
      <section
        ref={sectionRef}
        aria-labelledby="works-heading"
        className="works-stage w-full flex flex-col justify-center"
        style={{ background: "var(--ink)", color: "var(--white)" }}
      >
        <div className="px-[5vw] md:px-[6vw] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            id="works-heading"
            className="font-display"
            style={{
              fontSize: "var(--step-display-l)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Selected Works
          </h2>
          <div className="text-meta text-white/60">
            <span style={{ color: "var(--vermilion)" }}>(002)</span> Index
          </div>
        </div>

        <div
          className="works-viewport no-scrollbar"
          data-cursor="drag"
          data-cursor-label="Drag"
        >
          <ul ref={trackRef} className="works-track flex items-start">
            {items.map((p, i) => (
              <li key={p.id} className="works-card" data-work-card>
                <Link href="/projects" className="block group">
                  <div className="works-frame" data-work-frame>
                    <div
                      className="absolute inset-0"
                      data-work-media
                      style={{ willChange: "transform" }}
                    >
                      {p.images[0] ? (
                        <Image
                          src={resolveImage(p.images[0])}
                          alt={`${p.title}, ${p.location}`}
                          fill
                          sizes="(min-width: 761px) 480px, 78vw"
                          style={{ objectFit: "cover" }}
                          priority={i < 2}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <div className="works-title">{p.title}</div>
                    <div className="text-meta text-white/60 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="mt-3 text-meta text-white/60">
                    {p.year} / {p.location} / {p.category}
                  </div>
                </Link>
              </li>
            ))}

            <li className="works-card flex">
              <Link
                href="/projects"
                data-cursor="view"
                data-cursor-label="All"
                className="works-panel flex-1 flex flex-col justify-between p-8"
              >
                <span className="text-meta text-white/60">The index</span>
                <span className="works-title">
                  All projects{" "}
                  <span style={{ color: "var(--vermilion)" }}>({total})</span> →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
