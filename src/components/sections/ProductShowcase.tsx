"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/animations/SectionWrapper";
import { PRODUCTS } from "@/lib/products";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function ProductShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section
      className="grain"
      style={{
        backgroundColor: "var(--color-black)",
        paddingTop: "var(--section-pad)",
        paddingBottom: "var(--section-pad)",
      }}
    >
      <Container>
        {/* Header */}
        <SectionWrapper className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="label text-blue-electric mb-3">The Collection</p>
              <h2
                className="font-display text-white uppercase leading-none"
                style={{ fontSize: "clamp(2.5rem, 2rem + 2.5vw, 5rem)" }}
              >
                The Drop
              </h2>
            </div>
            <p className="text-grey-light max-w-xs" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)" }}>
              Heavyweight GSM. Streetwear cuts. Shipped across East Africa in 3–5 days.
            </p>
          </div>
        </SectionWrapper>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid gap-4 md:gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))" }}
        >
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <SectionWrapper delay={0.3} className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/shop">View Full Collection</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/custom">Order Custom</Link>
          </Button>
        </SectionWrapper>
      </Container>
    </section>
  );
}
