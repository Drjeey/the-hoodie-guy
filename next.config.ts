import type { NextConfig } from "next";

const securityHeaders = [
  /* Prevents clickjacking — page cannot be embedded in iframes on other domains */
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  /* Prevents MIME-type sniffing — browsers respect the declared Content-Type */
  { key: "X-Content-Type-Options", value: "nosniff" },
  /* Controls referrer info sent with requests — full URL within origin, only origin cross-site */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  /* Disables browser features not needed by this site */
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  /* Enables DNS prefetching for faster third-party resource loading */
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
