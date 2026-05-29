"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "text";
type Size    = "sm" | "md" | "lg";

/* asChild: when true, Button renders its child element instead of a <button>,
   but applies all button styles to it. Lets us write:
     <Button asChild><a href="/shop">Shop Now</a></Button>
   — an <a> tag that looks and animates like a Button. */
interface ButtonProps {
  variant?:  Variant;
  size?:     Size;
  loading?:  boolean;
  disabled?: boolean;
  asChild?:  boolean;
  className?: string;
  children:  React.ReactNode;
  onClick?:  () => void;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-electric text-white border border-blue-electric hover:bg-blue-deep hover:border-blue-deep",
  ghost:   "bg-transparent text-white border border-white/30 hover:border-white",
  text:    "bg-transparent text-blue-electric border border-transparent hover:text-blue-deep underline-offset-4 hover:underline",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const baseClass = (variant: Variant, size: Size, disabled: boolean, className?: string) =>
  cn(
    "relative inline-flex items-center justify-center gap-2",
    "font-accent uppercase tracking-widest cursor-pointer",
    "transition-colors duration-150 ease-out",
    disabled && "opacity-40 cursor-not-allowed pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

export function Button({
  variant  = "primary",
  size     = "md",
  loading  = false,
  disabled = false,
  asChild  = false,
  className,
  children,
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const classes    = baseClass(variant, size, isDisabled, className);

  /* asChild: clone the child element and merge our classes onto it */
  if (asChild && !loading) {
    const child = children as React.ReactElement<{ className?: string }>;
    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.1, ease: [0.25, 1, 0.5, 1] }}
        className="inline-block"
      >
        {React.cloneElement(child, {
          className: cn(classes, child.props.className),
        })}
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.1, ease: [0.25, 1, 0.5, 1] }}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
      {children}
    </motion.button>
  );
}

import React from "react";
