import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* cn() — merge Tailwind classes without conflicts.
   cn("text-white", condition && "text-blue-electric")
   Resolves conflicts: cn("p-4 p-8") → "p-8" */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "KES") {
  return `${currency} ${amount.toLocaleString("en-KE")}`;
}
