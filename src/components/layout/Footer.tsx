"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/",       label: "Home" },
  { href: "/shop",   label: "Shop" },
  { href: "/custom", label: "Custom Order" },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-black-soft)", borderTop: "1px solid var(--color-grey-dark)" }}>

      {/* ── MAIN FOOTER BODY ── */}
      <div
        className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 py-16 md:py-20"
        style={{ maxWidth: "1440px", paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)" }}
      >

        {/* Column 1: Brand */}
        <div>
          <Link href="/" className="inline-block mb-5">
            <Image
              src="/images/logo-dark.png"
              alt="The Hoodie Guy"
              width={48}
              height={48}
              className="object-contain"
              style={{ mixBlendMode: "screen" }}
            />
          </Link>
          <p
            className="text-grey-light leading-relaxed mb-6"
            style={{ fontSize: "clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem)", maxWidth: "22ch" }}
          >
            Premium custom apparel. Made in Nairobi. Worn across East Africa.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-grey-light hover:text-white transition-colors duration-150"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-grey-light hover:text-white transition-colors duration-150 font-accent uppercase tracking-widest"
              style={{ fontSize: "0.7rem" }}
            >
              IG
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <p className="label text-grey-mid mb-5" style={{ fontSize: "0.6rem" }}>Navigate</p>
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-accent text-grey-light hover:text-white uppercase tracking-widest transition-colors duration-150"
                style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.85rem)" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3: Drop list CTA */}
        <div>
          <p className="label text-grey-mid mb-5" style={{ fontSize: "0.6rem" }}>Join The Drop List</p>
          <p
            className="text-grey-light leading-relaxed mb-5"
            style={{ fontSize: "clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem)" }}
          >
            New drops, restocks, and exclusive offers. We announce on WhatsApp first.
          </p>
          <a
            href={`${WHATSAPP_URL}?text=DROP%20LIST%20%E2%80%94%20add%20me`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-accent text-sm tracking-widest uppercase px-6 py-3 transition-colors duration-150"
            style={{
              border: "1px solid var(--color-grey-dark)",
              color: "var(--color-white)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--color-blue-electric)";
              el.style.color = "var(--color-blue-electric)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--color-grey-dark)";
              el.style.color = "var(--color-white)";
            }}
          >
            <MessageCircle className="w-4 h-4" />
            Join via WhatsApp
          </a>
          <p className="label text-grey-mid mt-3" style={{ fontSize: "0.55rem" }}>
            Opens WhatsApp. No spam. Unsubscribe any time.
          </p>
        </div>

      </div>

      {/* ── LEGAL BAR ── */}
      <div
        className="w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 py-5"
        style={{
          maxWidth: "1440px",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          borderTop: "1px solid var(--color-grey-dark)",
        }}
      >
        <p className="label text-grey-mid" style={{ fontSize: "0.55rem" }}>
          © {currentYear} The Hoodie Guy. All rights reserved.
        </p>
        <p className="label text-grey-mid" style={{ fontSize: "0.55rem" }}>
          {INSTAGRAM_HANDLE} · Nairobi, Kenya
        </p>
      </div>

    </footer>
  );
}
