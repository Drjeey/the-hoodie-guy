"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StaggerWrapperProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;     /* seconds between each child */
  delayStart?: number;  /* initial delay before first child */
  amount?: number;      /* 0-1: how much must be visible to trigger */
}

const container = (stagger: number, delayStart: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delayStart },
  },
});

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

/* Wraps direct children with a scroll-triggered stagger reveal.
   Each direct child slides up in sequence once the wrapper enters the viewport. */
export function StaggerWrapper({
  children,
  className,
  stagger    = 0.1,
  delayStart = 0,
  amount     = 0.15,
}: StaggerWrapperProps) {
  const ref       = useRef<HTMLDivElement>(null);
  const isInView  = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      variants={container(stagger, delayStart)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>{child}</motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>
      }
    </motion.div>
  );
}
