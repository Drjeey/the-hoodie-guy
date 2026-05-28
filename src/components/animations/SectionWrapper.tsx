"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;       /* stagger between sections, in seconds */
  amount?: number;      /* 0–1: how much of the element must be visible to trigger */
}

/* Wraps every section with a scroll-entry animation.
   We define it once here instead of repeating the same motion.div
   with identical props across 8 different section files. */
export function SectionWrapper({
  children,
  className,
  delay = 0,
  amount = 0.15,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  /* useInView triggers once when the element enters the viewport.
     once: true means it won't re-animate when scrolling back up. */
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1], /* ease-out-expo */
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
