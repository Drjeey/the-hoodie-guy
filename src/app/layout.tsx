import type { Metadata } from "next";
import { Bebas_Neue, Geist, Barlow_Condensed } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Providers } from "@/components/layout/Providers";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
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

const BASE_URL = "https://thehoodieguy.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | The Hoodie Guy",
    default: "The Hoodie Guy — You Imagine, We Create",
  },
  description:
    "Custom print-on-demand hoodies and shirts. You design it, we make it. Minimum 1 piece. 7-day turnaround. Shipping across East Africa.",
  keywords: [
    "custom hoodies Kenya",
    "custom t-shirts Nairobi",
    "print on demand East Africa",
    "custom streetwear Kenya",
    "hoodie printing Nairobi",
    "custom apparel Uganda",
  ],
  authors: [{ name: "The Hoodie Guy", url: BASE_URL }],
  creator: "The Hoodie Guy",
  openGraph: {
    type:      "website",
    locale:    "en_KE",
    url:       BASE_URL,
    siteName:  "The Hoodie Guy",
    title:     "The Hoodie Guy — You Imagine, We Create",
    description:
      "Custom hoodies and shirts made to order. 1 piece minimum. Ships across East Africa in 7 days.",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "The Hoodie Guy — You Imagine, We Create",
    description: "Custom hoodies and shirts made to order. Ships across East Africa.",
    creator:     "@_the_hoodie_guy_1",
  },
  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "The Hoodie Guy",
    description:
      "Custom print-on-demand hoodies and shirts. You design it, we make it. Shipping across East Africa.",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo-dark.png`,
    telephone: "+254707582239",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    areaServed: ["KE", "UG", "TZ", "RW", "ET"],
    sameAs: ["https://instagram.com/_the_hoodie_guy_1"],
    priceRange: "KES 1900–5500",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${geist.variable} ${barlowCondensed.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <ScrollProgressBar />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
