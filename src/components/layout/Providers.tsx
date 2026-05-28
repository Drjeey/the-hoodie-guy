"use client";

import { useLenis } from "@/hooks/useLenis";

/* Client-only wrapper inside the server-rendered root layout.
   Hooks (useLenis) need a browser environment — isolating them here
   keeps layout.tsx as a pure Server Component for better SEO and performance. */
export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
