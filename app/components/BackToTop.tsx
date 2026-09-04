"use client";

export default function BackToTop() {
  const onClick = () => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      window.scrollTo({ top: 0 });
      return;
    }
    window.dispatchEvent(new CustomEvent("ok:scroll-top"));
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="view"
      data-cursor-label="Top"
      className="text-meta hover:opacity-70 transition-opacity"
    >
      Back to top ↑
    </button>
  );
}
