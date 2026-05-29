"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product, formatKES } from "@/lib/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const href = product.badge === "custom" ? "/custom" : `/shop/${product.slug}`;

  return (
    <motion.article
      className="group relative overflow-hidden bg-black-soft cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-grey-dark">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            // Fallback placeholder when image doesn't exist yet
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = "none";
          }}
        />

        {/* Placeholder shown when no real image */}
        <div className="absolute inset-0 flex items-center justify-center bg-grey-dark">
          <span className="font-display text-grey-mid text-2xl tracking-widest uppercase">
            {product.category}
          </span>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={product.badge} />
          </div>
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-end p-4 z-10"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                className="w-full"
              >
                <Button asChild size="sm" className="w-full">
                  <Link href={href}>
                    {product.badge === "custom" ? "Order Custom" : "Shop Now"}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-display text-white uppercase tracking-wide leading-tight"
            style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.25rem)" }}
          >
            {product.name}
          </h3>
          <span className="font-accent text-blue-electric shrink-0" style={{ fontSize: "clamp(0.8rem, 0.75rem + 0.25vw, 0.95rem)" }}>
            {formatKES(product.price)}
          </span>
        </div>
        <p className="text-grey-light mt-1" style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)" }}>
          {product.description}
        </p>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {product.colors.map((color) => (
            <span key={color} className="label text-grey-light" style={{ fontSize: "0.65rem" }}>
              {color}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
