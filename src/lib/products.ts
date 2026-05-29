export type ProductCategory = "hoodie" | "shirt" | "accessory";
export type ProductBadge = "new" | "limited" | "custom" | null;

export interface Product {
  id: string;
  name: string;
  price: number; // KES
  category: ProductCategory;
  badge: ProductBadge;
  description: string;
  sizes: string[];
  colors: string[];
  image: string; // path relative to /public
  slug: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "thg-001",
    name: "Block Drop Hoodie",
    price: 4500,
    category: "hoodie",
    badge: "new",
    description: "Heavyweight 380gsm French terry. Oversized fit, dropped shoulders.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black", "White", "Electric Blue"],
    image: "/images/products/hoodie-block-drop.jpg",
    slug: "block-drop-hoodie",
  },
  {
    id: "thg-002",
    name: "Arch Logo Hoodie",
    price: 4200,
    category: "hoodie",
    badge: "limited",
    description: "Arched wordmark across the chest. Classic boxy silhouette.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    image: "/images/products/hoodie-arch-logo.jpg",
    slug: "arch-logo-hoodie",
  },
  {
    id: "thg-003",
    name: "Serif Tee",
    price: 2200,
    category: "shirt",
    badge: "new",
    description: "230gsm combed cotton. Clean serif graphic, relaxed fit.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["White", "Black", "Sand"],
    image: "/images/products/tee-serif.jpg",
    slug: "serif-tee",
  },
  {
    id: "thg-004",
    name: "Custom Order",
    price: 5500,
    category: "hoodie",
    badge: "custom",
    description: "Your design. Your colorway. Minimum 1 piece. Ships in 7 days.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Any"],
    image: "/images/products/hoodie-custom.jpg",
    slug: "custom-order",
  },
  {
    id: "thg-005",
    name: "Stamp Hoodie",
    price: 4800,
    category: "hoodie",
    badge: null,
    description: "Heat-stamp print technique. Subtle texture, bold impact.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Navy"],
    image: "/images/products/hoodie-stamp.jpg",
    slug: "stamp-hoodie",
  },
  {
    id: "thg-006",
    name: "Core Logo Tee",
    price: 1900,
    category: "shirt",
    badge: null,
    description: "The everyday essential. Small chest logo, premium cotton blend.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black", "White", "Grey"],
    image: "/images/products/tee-core-logo.jpg",
    slug: "core-logo-tee",
  },
];

export function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString("en-KE")}`;
}
