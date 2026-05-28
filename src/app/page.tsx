import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/animations/SectionWrapper";
import { TextReveal } from "@/components/animations/TextReveal";

/* Design system preview page — replaced by real sections in Phase 4+ */
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO PLACEHOLDER */}
      <section className="grain min-h-screen flex items-center relative overflow-hidden">
        {/* Subtle blue glow behind headline */}
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,82,255,0.08) 0%, transparent 70%)" }}
        />
        <Container className="relative z-10 py-32">
          <SectionWrapper>
            <p className="label text-blue-electric mb-6">New Collection · 2025</p>
            <h1 className="font-display text-white leading-none mb-6">
              <TextReveal text="YOU IMAGINE" delay={0.1} />
              <br />
              <TextReveal text="WE CREATE" delay={0.3} />
            </h1>
            <p className="text-grey-light max-w-md mb-10 text-lg">
              Custom hoodies and shirts, made exactly how you picture them.
              Shipping across East Africa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">Shop Now</Button>
              <Button variant="ghost" size="lg">Custom Order</Button>
            </div>
          </SectionWrapper>
        </Container>
      </section>

      {/* DESIGN SYSTEM PREVIEW */}
      <section className="py-24 border-t border-grey-dark">
        <Container>
          <SectionWrapper>
            <p className="label text-grey-light mb-12">Design System — Phase 2 Preview</p>

            {/* Typography */}
            <div className="mb-16 space-y-4">
              <h2 className="font-display text-white">The Drop</h2>
              <h3 className="font-display text-white">New Arrivals</h3>
              <p className="font-body text-grey-light">Body text — Geist. Clean, technical, warm enough.</p>
              <p className="label text-grey-light">Label · Barlow Condensed · Uppercase</p>
            </div>

            {/* Colors */}
            <div className="flex flex-wrap gap-4 mb-16">
              {[
                { bg: "bg-blue-electric", label: "Blue Electric #0052FF" },
                { bg: "bg-blue-deep",     label: "Blue Deep #001AFF" },
                { bg: "bg-blue-glow",     label: "Blue Glow #4D8FFF" },
                { bg: "bg-black-soft border border-grey-dark", label: "Black Soft #111" },
                { bg: "bg-grey-mid",      label: "Grey Mid #333" },
              ].map(({ bg, label }) => (
                <div key={label} className="flex flex-col gap-2">
                  <div className={`w-16 h-16 ${bg}`} />
                  <span className="label text-grey-light text-[10px]">{label}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Button variant="primary">Primary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="text">Text Link</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-16">
              <Badge variant="new" />
              <Badge variant="limited" />
              <Badge variant="custom" />
            </div>

            {/* Logo */}
            <div className="flex gap-8 items-center">
              <Image src="/images/logo-dark.png" alt="The Hoodie Guy" width={120} height={120} />
              <div className="bg-white p-4">
                <Image src="/images/logo-light.png" alt="The Hoodie Guy" width={120} height={120} />
              </div>
            </div>
          </SectionWrapper>
        </Container>
      </section>
    </main>
  );
}
