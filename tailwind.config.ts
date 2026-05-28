import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-electric": "#0052FF",
        "blue-deep":     "#001AFF",
        "blue-glow":     "#4D8FFF",
        "blue-muted":    "#1A3A6B",
        "black-soft":    "#111111",
        "grey-dark":     "#1A1A1A",
        "grey-mid":      "#333333",
        "grey-light":    "#888888",
        "white-off":     "#F0F0F0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
        body:    ["var(--font-body)", "Helvetica Neue", "sans-serif"],
        accent:  ["var(--font-accent)", "Arial Narrow", "sans-serif"],
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-expo":  "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(40px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { from: { opacity: "0", transform: "scale(0.95)" }, to: { opacity: "1", transform: "scale(1)" } },
        shimmer: { from: { backgroundPosition: "-200% 0" }, to: { backgroundPosition: "200% 0" } },
      },
      animation: {
        "fade-in":  "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      maxWidth: {
        container: "1440px",
      },
      height: {
        nav: "72px",
      },
    },
  },
  plugins: [],
};

export default config;
