import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

/* Max-width wrapper with fluid horizontal padding.
   Uses inline style for padding so it works regardless of Tailwind version.
   clamp(1.5rem, 5vw, 5rem) = 24px min, scales with viewport, 80px max. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag
      className={cn("w-full mx-auto", className)}
      style={{ maxWidth: "1440px", paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)" }}
    >
      {children}
    </Tag>
  );
}
