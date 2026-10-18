"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  // No smooth-scroll hijacking inside the admin tool.
  const isAdmin = usePathname().startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.088,
      smoothWheel: true,
    });

    // Drive ScrollTrigger from Lenis so the two never fight over the scroll
    // position: Lenis owns the value, GSAP's ticker owns the clock.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    const onScrollTop = () => lenis.scrollTo(0);
    window.addEventListener("ok:scroll-top", onScrollTop);

    // Overlays (the projects lightbox) park the page rather than fighting it:
    // Lenis owns the scroll position, so only Lenis can freeze it.
    const onLoaderDone = () => ScrollTrigger.refresh();
    window.addEventListener("ok:loader-done", onLoaderDone);

    const onLock = () => lenis.stop();
    const onUnlock = () => lenis.start();
    window.addEventListener("ok:scroll-lock", onLock);
    window.addEventListener("ok:scroll-unlock", onUnlock);

    return () => {
      window.removeEventListener("ok:scroll-top", onScrollTop);
      window.removeEventListener("ok:loader-done", onLoaderDone);
      window.removeEventListener("ok:scroll-lock", onLock);
      window.removeEventListener("ok:scroll-unlock", onUnlock);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [isAdmin]);

  return null;
}
