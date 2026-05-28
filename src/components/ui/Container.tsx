import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: React.ElementType;  /* semantic HTML: div, section, main, article */
  className?: string;
  children: React.ReactNode;
}

/* Constrains content to max-width and adds consistent horizontal padding.
   Use `as` to keep semantics correct — a hero section should be <section>,
   not a <div>. Matters for accessibility and SEO. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "w-full max-w-container mx-auto",
        "px-4 sm:px-8 lg:px-16 xl:px-20",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
