import type { Metadata } from "next";
import { Bebas_Neue, Geist, Barlow_Condensed } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | The Hoodie Guy",
    default: "The Hoodie Guy — You Imagine, We Create",
  },
  description:
    "Custom print-on-demand hoodies and shirts. You design it, we make it. Shipping across East Africa.",
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "The Hoodie Guy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${geist.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <Providers>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
