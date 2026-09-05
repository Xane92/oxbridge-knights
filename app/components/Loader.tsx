"use client";

import { useEffect, useState } from "react";

export const SEEN_KEY = "ok:loader-seen";

const COUNT_MS = 1300;
const CURTAIN_MS = 1000;

/**
 * Loader to hero (§5). Ink full screen, wordmark and taglines centred, a
 * counter running 000 to 100, then the panel lifts as a curtain. Once per
 * session.
 *
 * Hydration contract: the server renders this, so the first client render has
 * to match it byte for byte. That means no sessionStorage and no matchMedia
 * during render or in a state initialiser. Both renders start with the curtain
 * down and the counter at zero; the session check happens after mount, in the
 * effect, where the DOM actually exists.
 */
export default function Loader() {
  const [count, setCount] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage can throw outright (private mode, blocked site data). An
      // unreadable store counts as a first visit rather than a crash.
      seen = false;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const remember = () => {
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Nothing to do: the loader simply plays again next visit.
      }
    };

    let raf = 0;
    let timer = 0;

    // Skip path. Deferred one frame so the state change never lands
    // synchronously inside the effect body.
    if (seen || reduced) {
      remember();
      raf = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(raf);
    }

    // Hold the page still behind the curtain. Lenis cannot move a document
    // that has no overflow to scroll.
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const release = () => {
      html.style.overflow = previousOverflow;
    };

    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / COUNT_MS);
      setCount(Math.round(t * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setLifting(true);
      timer = window.setTimeout(() => {
        remember();
        release();
        // The scrollbar was gone while the curtain was down, so anything that
        // measured the viewport in that window (the pinned works index) has
        // stale geometry. Tell the scroll layer to re-measure.
        window.dispatchEvent(new Event("ok:loader-done"));
        setDone(true);
      }, CURTAIN_MS);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      release();
    };
  }, []);

  if (done) return null;

  return (
    <div className={`ok-loader${lifting ? " ok-loader-lift" : ""}`} aria-hidden>
      <div className="ok-loader-inner">
        <div className="font-display ok-loader-mark">Oxbridge Knights</div>
        <div className="text-meta ok-loader-meta">
          Architecture{" "}
          <span style={{ color: "var(--vermilion)" }}>·</span> Real Estate{" "}
          <span style={{ color: "var(--vermilion)" }}>·</span> Construction
        </div>
        <div className="text-meta ok-loader-sub">Lagos · London</div>
      </div>

      <div className="text-meta ok-loader-count">
        {String(count).padStart(3, "0")}
      </div>
    </div>
  );
}
