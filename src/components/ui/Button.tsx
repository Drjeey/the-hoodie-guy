"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "text";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  /* Solid blue fill — main CTAs like "Shop Now", "Send My Order" */
  primary: "bg-blue-electric text-white border border-blue-electric hover:bg-blue-deep hover:border-blue-deep",
  /* Transparent with border — secondary CTAs like "Custom Order" */
  ghost:   "bg-transparent text-white border border-white/30 hover:border-white",
  /* No border — inline actions like "View All →" */
  text:    "bg-transparent text-blue-electric border border-transparent hover:text-blue-deep underline-offset-4 hover:underline",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm tracking-widest",
  md: "px-6 py-3 text-sm tracking-widest",
  lg: "px-8 py-4 text-base tracking-widest",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}           /* physical press feel */
      whileHover={{ scale: 1.02 }}         /* subtle lift on hover */
      transition={{ duration: 0.1, ease: [0.25, 1, 0.5, 1] }}
      className={cn(
        /* base styles shared by all variants */
        "relative inline-flex items-center justify-center gap-2",
        "font-accent uppercase tracking-widest",
        "transition-colors duration-150 ease-out",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </motion.button>
  );
}
