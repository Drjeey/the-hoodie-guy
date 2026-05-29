"use client";

import { motion } from "framer-motion";

/* Wraps each page with a fade-in on mount.
   In Next.js App Router, exit animations are handled by the layout —
   this covers the enter side: opacity 0 → 1 over 400ms. */
export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
