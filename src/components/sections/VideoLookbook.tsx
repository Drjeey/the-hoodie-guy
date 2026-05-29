"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";
import { EASE_OUT_EXPO } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Three editorial statements that sequence in while the section is pinned.
   Each one appears as the user scrolls through the pin window. */
const PANELS = [
  { label: "Fabric",    copy: "380gsm French terry. Built to last past the trend." },
  { label: "Fit",       copy: "Oversized silhouettes. Dropped shoulders. No compromise." },
  { label: "Location",  copy: "Designed in Nairobi. Worn across East Africa." },
];

export function VideoLookbook() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const frameRef    = useRef<HTMLDivElement>(null);
  const panelsRef   = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [activePanel, setActivePanel] = useState(0);

  const headingInView = useInView(sectionRef, { once: true, amount: 0.2 });

  /* IntersectionObserver: play video only when it's in the viewport.
     Saves bandwidth and CPU for users who never scroll this far. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setVideoError(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  /* GSAP ScrollTrigger pin — holds the section while the three panels
     sequence through on scroll. Each panel gets one-third of the pin window. */
  useGSAP(() => {
    if (!sectionRef.current || !panelsRef.current) return;

    const totalPanels = PANELS.length;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${totalPanels * 400}`,
      pin: true,
      scrub: false,
      onUpdate: (self) => {
        const index = Math.min(
          Math.floor(self.progress * totalPanels),
          totalPanels - 1,
        );
        setActivePanel(index);
      },
    });

    /* Video frame: subtle scale as section scrolls into view */
    gsap.fromTo(
      frameRef.current,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative grain overflow-hidden"
      style={{
        backgroundColor: "var(--color-black-soft)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--color-grey-dark), transparent)" }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-24 lg:py-32">

          {/* ── LEFT: Framed video / fallback ── */}
          <div ref={frameRef} className="relative" style={{ opacity: 0 }}>
            {/* Outer frame: the letterbox border gives editorial print feel */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "4/5",
                border: "1px solid var(--color-grey-dark)",
              }}
            >
              {/* Branded fallback when no video file exists */}
              {videoError && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  style={{ background: "linear-gradient(160deg, #111111 0%, #0A0A0A 50%, #1A1A1A 100%)" }}
                >
                  <span
                    className="font-display text-white tracking-widest uppercase"
                    style={{ fontSize: "clamp(3rem, 2rem + 4vw, 6rem)", opacity: 0.08 }}
                  >
                    THG
                  </span>
                  <p className="label text-grey-mid absolute bottom-6 left-6" style={{ fontSize: "0.6rem" }}>
                    Season 01 · Coming Soon
                  </p>
                </div>
              )}

              <video
                ref={videoRef}
                src="/videos/lookbook.mp4"
                muted
                loop
                playsInline
                preload="none"
                onError={() => setVideoError(true)}
                className="w-full h-full object-cover"
                style={{ display: videoError ? "none" : "block" }}
              />

              {/* Corner accent marks — editorial print reference */}
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-4 h-4 pointer-events-none`}
                  style={{
                    borderTop:    i < 2 ? "1px solid var(--color-blue-electric)" : undefined,
                    borderBottom: i >= 2 ? "1px solid var(--color-blue-electric)" : undefined,
                    borderLeft:   i % 2 === 0 ? "1px solid var(--color-blue-electric)" : undefined,
                    borderRight:  i % 2 === 1 ? "1px solid var(--color-blue-electric)" : undefined,
                  }}
                />
              ))}
            </div>

            {/* Caption below frame */}
            <p className="label text-grey-mid mt-3" style={{ fontSize: "0.6rem" }}>
              The Hoodie Guy · Season 01 · East Africa
            </p>
          </div>

          {/* ── RIGHT: Sequencing editorial panels ── */}
          <div ref={panelsRef}>
            {/* Section label */}
            <motion.p
              className="label text-blue-electric mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              Season 01 · East Africa
            </motion.p>

            {/* Main heading */}
            <motion.h2
              className="font-display text-white uppercase leading-none mb-10"
              style={{ fontSize: "clamp(2.5rem, 2rem + 3vw, 5rem)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
            >
              The Look
            </motion.h2>

            {/* Panel indicators */}
            <div className="flex gap-2 mb-8">
              {PANELS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePanel(i)}
                  aria-label={`View panel ${i + 1}`}
                  className="h-px transition-all duration-300 ease-out"
                  style={{
                    width:           activePanel === i ? "2rem" : "0.75rem",
                    backgroundColor: activePanel === i
                      ? "var(--color-blue-electric)"
                      : "var(--color-grey-mid)",
                  }}
                />
              ))}
            </div>

            {/* Active panel content */}
            <div style={{ minHeight: "8rem" }}>
              {PANELS.map((panel, i) => (
                <motion.div
                  key={panel.label}
                  initial={false}
                  animate={{
                    opacity:    activePanel === i ? 1 : 0,
                    y:          activePanel === i ? 0 : 12,
                    pointerEvents: activePanel === i ? "auto" : "none",
                  }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                  className={i === 0 ? "" : "absolute"}
                >
                  <p className="label text-blue-electric mb-3" style={{ fontSize: "0.65rem" }}>
                    {String(i + 1).padStart(2, "0")} / {panel.label}
                  </p>
                  <p
                    className="text-white leading-snug"
                    style={{ fontSize: "clamp(1.25rem, 1rem + 1.5vw, 1.75rem)", fontFamily: "var(--font-display)", letterSpacing: "0.02em", textTransform: "uppercase" }}
                  >
                    {panel.copy}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Navigation buttons */}
            <motion.div
              className="flex gap-3 mt-10"
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT_EXPO }}
            >
              <button
                onClick={() => setActivePanel((p) => Math.max(0, p - 1))}
                disabled={activePanel === 0}
                aria-label="Previous"
                className="w-10 h-10 flex items-center justify-center transition-colors duration-150"
                style={{
                  border: "1px solid var(--color-grey-dark)",
                  color:  activePanel === 0 ? "var(--color-grey-mid)" : "var(--color-white)",
                }}
              >
                ←
              </button>
              <button
                onClick={() => setActivePanel((p) => Math.min(PANELS.length - 1, p + 1))}
                disabled={activePanel === PANELS.length - 1}
                aria-label="Next"
                className="w-10 h-10 flex items-center justify-center transition-colors duration-150"
                style={{
                  border: "1px solid var(--color-grey-dark)",
                  color:  activePanel === PANELS.length - 1 ? "var(--color-grey-mid)" : "var(--color-white)",
                }}
              >
                →
              </button>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--color-grey-dark), transparent)" }}
      />
    </section>
  );
}
