"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/",       label: "Home" },
  { href: "/shop",   label: "Shop" },
  { href: "/custom", label: "Custom" },
];

import { WHATSAPP_URL } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  /* Scroll-aware background: transparent at top → frosted glass after 80px.
     passive: true tells the browser this won't block scrolling — no jank. */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-nav",
          "flex items-center",
          "transition-all duration-300 ease-out",
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-grey-dark"
            : "bg-transparent",
        )}
      >
        <div className="w-full max-w-container mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo-dark.png"
              alt="The Hoodie Guy"
              width={52}
              height={52}
              className="object-contain"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "font-accent text-sm tracking-widest uppercase",
                  "text-grey-light hover:text-white",
                  "relative transition-colors duration-150",
                  /* sliding underline via ::after — scales from 0→1 on hover */
                  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
                  "after:bg-blue-electric after:scale-x-0 after:origin-left",
                  "after:transition-transform after:duration-200 after:ease-out",
                  "hover:after:scale-x-100",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {/* WhatsApp — primary contact for East Africa */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="text-grey-light hover:text-white transition-colors duration-150"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* Cart icon */}
            <button
              aria-label="Open cart"
              className="text-grey-light hover:text-white transition-colors duration-150 relative"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay menu
          AnimatePresence lets the exit animation play before unmounting */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-5xl text-white hover:text-blue-electric transition-colors"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* WhatsApp CTA in mobile menu */}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.08 }}
                className="mt-4 flex items-center gap-2 font-accent text-sm tracking-widest uppercase text-blue-electric"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
