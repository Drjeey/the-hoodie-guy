"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/animations/SectionWrapper";
import { INSTAGRAM_URL, EASE_OUT_EXPO } from "@/lib/constants";

/* Brand facts written as typographic statements — not metric cards.
   These are specific product truths, not vanity numbers. */
const FACTS = [
  { number: "380",  unit: "gsm",  statement: "Heavyweight French terry that outlasts every trend." },
  { number: "7",    unit: "days", statement: "Custom orders turned around. Minimum 1 piece." },
  { number: "5+",   unit: "countries", statement: "Shipping routes across East Africa, door to door." },
  { number: "100%", unit: "",    statement: "Custom. Your design, your colorway, no compromises." },
];

/* Placeholder testimonials — replace with real ones when collected */
const TESTIMONIALS = [
  {
    quote: "Ordered a custom hoodie for our crew. Quality hit different — everyone thought we flew it in from overseas.",
    name: "Brian M.",
    location: "Nairobi, Kenya",
    product: "Custom Drop Hoodie",
  },
  {
    quote: "The fit is exactly what I described. Dropped shoulders, right weight. Didn't think a local brand could do this.",
    name: "Aisha K.",
    location: "Kampala, Uganda",
    product: "Block Drop Hoodie",
  },
  {
    quote: "Took 6 days from WhatsApp message to delivery. Came in a proper box. Felt like buying from ACRONYM.",
    name: "Theo O.",
    location: "Mombasa, Kenya",
    product: "Arch Logo Hoodie",
  },
];

export function SocialProof() {
  const factsRef = useRef<HTMLDivElement>(null);
  const factsInView = useInView(factsRef, { once: true, amount: 0.2 });

  return (
    <section style={{ backgroundColor: "var(--color-black)", paddingTop: "var(--section-pad)", paddingBottom: "var(--section-pad)" }}>
      <Container>

        {/* ── BRAND FACTS ── */}
        <SectionWrapper className="mb-20 md:mb-28">
          <p className="label text-blue-electric mb-8">Why It Works</p>
        </SectionWrapper>

        <div
          ref={factsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ border: "1px solid var(--color-grey-dark)", borderRight: "none", borderBottom: "none" }}
        >
          {FACTS.map((fact, i) => (
            <motion.div
              key={fact.number}
              initial={{ opacity: 0, y: 30 }}
              animate={factsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE_OUT_EXPO }}
              className="p-8 md:p-10"
              style={{ borderRight: "1px solid var(--color-grey-dark)", borderBottom: "1px solid var(--color-grey-dark)" }}
            >
              {/* Number + unit inline — typographic, not a card metric */}
              <div className="flex items-baseline gap-2 mb-3">
                <span
                  className="font-display text-white leading-none"
                  style={{ fontSize: "clamp(3rem, 2rem + 3vw, 5rem)" }}
                >
                  {fact.number}
                </span>
                {fact.unit && (
                  <span className="font-accent text-blue-electric uppercase tracking-widest" style={{ fontSize: "clamp(0.7rem, 0.6rem + 0.3vw, 0.9rem)" }}>
                    {fact.unit}
                  </span>
                )}
              </div>
              <p className="text-grey-light leading-snug" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.3vw, 1rem)" }}>
                {fact.statement}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── TESTIMONIALS ── */}
        <div className="mt-24 md:mt-32">
          <SectionWrapper className="mb-12">
            <p className="label text-blue-electric mb-3">From The Customers</p>
            <h2
              className="font-display text-white uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 1.5rem + 2.5vw, 4rem)" }}
            >
              They Wore It First
            </h2>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {TESTIMONIALS.map((t, i) => (
              <SectionWrapper key={t.name} delay={i * 0.12}>
                <div
                  className="p-6 md:p-8 flex flex-col h-full"
                  style={{ border: "1px solid var(--color-grey-dark)" }}
                >
                  {/* Opening mark — typographic, not a star rating */}
                  <span
                    className="font-display text-blue-electric leading-none mb-4 block"
                    style={{ fontSize: "4rem", lineHeight: 0.8 }}
                    aria-hidden="true"
                  >
                    "
                  </span>
                  <p
                    className="text-white leading-relaxed flex-1 mb-6"
                    style={{ fontSize: "clamp(0.9rem, 0.8rem + 0.4vw, 1.05rem)" }}
                  >
                    {t.quote}
                  </p>
                  <div>
                    <p className="font-accent text-white uppercase tracking-widest" style={{ fontSize: "0.8rem" }}>
                      {t.name}
                    </p>
                    <p className="label text-grey-light mt-1" style={{ fontSize: "0.6rem" }}>
                      {t.location} · {t.product}
                    </p>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>

        {/* ── INSTAGRAM CALLOUT ── */}
        <SectionWrapper delay={0.2} className="mt-24 md:mt-32">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 px-8 md:px-12"
            style={{ border: "1px solid var(--color-grey-dark)" }}
          >
            <div>
              <p className="label text-blue-electric mb-2">Follow The Brand</p>
              <p
                className="font-display text-white uppercase leading-none"
                style={{ fontSize: "clamp(1.5rem, 1rem + 2vw, 2.5rem)" }}
              >
                @_the_hoodie_guy_1
              </p>
              <p className="text-grey-light mt-2" style={{ fontSize: "clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem)" }}>
                Behind the scenes. New drops. Real customers.
              </p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 font-accent text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-150"
              style={{
                border: "1px solid var(--color-blue-electric)",
                color: "var(--color-blue-electric)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-blue-electric)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-white)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-blue-electric)";
              }}
            >
              Follow on Instagram
            </a>
          </div>
        </SectionWrapper>

      </Container>
    </section>
  );
}
