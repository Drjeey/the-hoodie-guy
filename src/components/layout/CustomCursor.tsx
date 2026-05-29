"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible]   = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* useSpring adds lerp-like smoothing to the motion values.
     stiffness/damping control how snappy vs floaty the trail feels. */
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    /* Hide on touch devices — pointer: coarse = finger, not mouse */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    /* Detect hovering over interactive elements */
    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) setHovering(true);
    };
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    /* Hide native cursor via CSS */
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.documentElement.style.cursor = "";
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        /* Center the circle on the cursor point */
        style={{ x: "-50%", y: "-50%" }}
        animate={{
          width:  hovering ? 40 : 20,
          height: hovering ? 40 : 20,
          backgroundColor: hovering ? "#0052FF" : "rgba(0,0,0,0)",
          borderColor: hovering ? "#0052FF" : "#FAFAFA",
          opacity: 0.85,
        }}
        transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
        className="rounded-full border"
      />
    </motion.div>
  );
}
