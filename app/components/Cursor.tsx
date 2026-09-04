"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "idle" | "view" | "drag" | "close";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<CursorMode>("idle");
  const [label, setLabel] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: target.x, y: target.y };
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      const el = dotRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const findCursorEl = (start: EventTarget | null): HTMLElement | null => {
      let node = start as HTMLElement | null;
      while (node && node.nodeType === 1) {
        if (node.dataset && node.dataset.cursor) return node;
        node = node.parentElement;
      }
      return null;
    };

    const reset = () => {
      setMode("idle");
      setLabel("");
    };

    const apply = (el: HTMLElement) => {
      const kind = el.dataset.cursor as CursorMode;
      if (kind !== "view" && kind !== "drag" && kind !== "close") return false;
      setMode(kind);
      const fallback =
        kind === "drag" ? "Drag" : kind === "close" ? "Close" : "View";
      setLabel(el.dataset.cursorLabel ?? fallback);
      return true;
    };

    const onOver = (e: MouseEvent) => {
      const el = findCursorEl(e.target);
      if (el) apply(el);
    };

    const onOut = (e: MouseEvent) => {
      const from = findCursorEl(e.target);
      const to = findCursorEl(e.relatedTarget);
      if (!from || from === to) return;
      // Leaving a nested target (a card link) back onto its container (the
      // works rail) must fall back to the container's cursor, not to idle.
      if (!to || !apply(to)) reset();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    >
      <div
        style={{
          width: mode === "idle" ? 8 : 78,
          height: mode === "idle" ? 8 : 78,
          borderRadius: 9999,
          background: "var(--white)",
          color: "var(--ink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          transition:
            "width 380ms var(--ease-out-expo), height 380ms var(--ease-out-expo)",
        }}
      >
        {mode === "drag" || mode === "close" ? (
          <span className="flex flex-col items-center gap-1">
            <span
              aria-hidden
              className="font-display"
              style={{
                fontSize: 30,
                lineHeight: 1,
                letterSpacing: "0",
                textTransform: "none",
                fontWeight: 400,
              }}
            >
              K
            </span>
            <span style={{ fontSize: 9, letterSpacing: "0.16em" }}>{label}</span>
          </span>
        ) : mode === "view" ? (
          label
        ) : null}
      </div>
    </div>
  );
}
