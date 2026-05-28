"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/* useLenis — initializes smooth scroll site-wide.
   Call once in the root layout. After this, every scroll
   on the site gets the silk-smooth lerp interpolation. */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      /* Exponential ease: moves fast then slows gently at destination.
         t=0 → 0, t=1 → 1. The Math.pow curve creates the deceleration. */
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    /* RAF loop — updates lenis every frame.
       Without this, lenis calculates nothing and scroll is normal. */
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    /* Cleanup: stop the RAF loop and destroy lenis when component unmounts.
       Without cleanup, the loop keeps running even after navigation — memory leak. */
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
