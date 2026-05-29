"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/* Thin blue line at the very top of the viewport.
   Fills left-to-right as the user scrolls down the page.
   Spring physics makes it feel fluid rather than mechanical. */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    function update() {
      const scrolled   = window.scrollY;
      const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? scrolled / maxScroll : 0);
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.div
      style={{
        scaleX,
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        height:          "2px",
        backgroundColor: "var(--color-blue-electric)",
        transformOrigin: "left center",
        zIndex:          100,
      }}
      aria-hidden="true"
    />
  );
}
