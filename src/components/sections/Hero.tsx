"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/animations/TextReveal";
import { Container } from "@/components/ui/Container";
import {
  staggerContainer,
  fadeUp,
  fadeIn,
  scaleIn,
  slideInRight,
  WHATSAPP_URL,
} from "@/lib/constants";

/* Register GSAP plugins once at module level.
   Must happen before any ScrollTrigger is created. */
gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);

  /* GSAP scroll-driven parallax.
     useGSAP handles cleanup automatically — no manual ScrollTrigger.kill() needed.
     scope: sectionRef means all gsap.utils.toArray queries are scoped to this section. */
  useGSAP(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    /* Parallax: image moves UP at 40% of scroll speed.
       scrub: true = animation progress is directly tied to scroll position.
       As user scrolls down → image moves up. Creates depth. */
    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    /* Text moves at 10% speed — slower than the image.
       The separation between text (slow) and image (fast) creates 3D depth. */
    gsap.to(textRef.current, {
      yPercent: -5,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    /* Overlay fades in as you scroll — the hero dramatically darkens,
       signalling to the user that new content is coming below. */
    gsap.to(overlayRef.current, {
      opacity: 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "30% top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black grain"
    >
      {/* Blue radial glow — pulses subtly to add life without distraction */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          left: "20%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          background: "radial-gradient(ellipse, rgba(0,82,255,0.09) 0%, transparent 65%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scroll-fade overlay — darkens the hero as user scrolls */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none z-10 opacity-0"
      />

      {/* ── HERO IMAGE (right column, behind on mobile) ── */}
      <div ref={imageRef} className="absolute inset-0 md:left-1/2 overflow-hidden">
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="relative w-full h-full"
        >
          {/* Gradient mask: fades image into black on the left side */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.7) 30%, transparent 60%)",
            }}
          />
          {/* Bottom gradient — fades into page below */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }}
          />

          {/* Hero image — replace src with a real product photo.
              Using a placeholder gradient until product photography is available. */}
          <div className="w-full h-full bg-gradient-to-br from-grey-dark via-black-soft to-black flex items-center justify-center">
            <Image
              src="/images/logo-dark.png"
              alt="The Hoodie Guy — Custom Hoodies"
              width={320}
              height={320}
              className="opacity-10 object-contain"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* ── TEXT CONTENT (left column) ── */}
      <Container className="relative z-20 pt-nav">
        <motion.div
          ref={textRef}
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl py-32 md:py-40"
        >
          {/* Collection label */}
          <motion.p variants={fadeIn} className="label text-blue-electric mb-6">
            New Collection · 2025
          </motion.p>

          {/* Hero headline — Bebas Neue, word-by-word reveal */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-white leading-none mb-6"
            style={{ fontSize: "clamp(4.5rem, 3rem + 7.5vw, 10rem)" }}
          >
            <TextReveal text="YOU IMAGINE" delay={0.3} />
            <br />
            <TextReveal text="WE CREATE" delay={0.55} />
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            className="text-grey-light max-w-md mb-10 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.25rem)" }}
          >
            Custom hoodies and shirts, made exactly how you picture them.
            Shipping across East Africa.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={scaleIn} className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" asChild>
              <a href="/shop">Shop Now</a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href="/custom">Custom Order</a>
            </Button>
          </motion.div>

          {/* WhatsApp quick-contact */}
          <motion.div variants={fadeIn} className="mt-8">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-grey-light hover:text-blue-electric transition-colors duration-150 flex items-center gap-2"
            >
              <span className="inline-block w-4 h-px bg-grey-mid" />
              Order via WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator — bobs up and down */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-grey-light"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 0.5 },
          y: { delay: 1.8, duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-hidden="true"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
