"use client";

import { MotionConfig } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";

/* Client-only wrapper inside the server-rendered root layout.
   MotionConfig reducedMotion="user" makes Framer Motion respect the OS
   "prefers-reduced-motion" setting — all FM animations are disabled automatically.
   CSS handles the same via @media (prefers-reduced-motion) in globals.css. */
export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
