import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "limited" | "custom";

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new:     "bg-blue-electric text-white",
  limited: "bg-transparent text-white border border-white/50",
  custom:  "bg-transparent text-blue-electric border border-blue-electric",
};

const labels: Record<BadgeVariant, string> = {
  new:     "New",
  limited: "Limited",
  custom:  "Custom",
};

export function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-accent text-xs tracking-widest uppercase px-2 py-0.5",
        variantStyles[variant],
        className,
      )}
    >
      {labels[variant]}
    </span>
  );
}
