"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

/* Word-by-word reveal animation used on hero headlines.
   How it works:
   1. Split text into words with .split(" ")
   2. Wrap each word in overflow:hidden so the sliding-up word
      is clipped — it appears to rise up from behind a mask
   3. Each word delays 80ms more than the previous (stagger)

   The overflow:hidden + translateY trick is the standard
   "text mask reveal" used on premium editorial sites. */
export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.08,  /* 80ms stagger per word */
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}
