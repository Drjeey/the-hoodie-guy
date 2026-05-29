import { ImageResponse } from "next/og";

export const alt = "The Hoodie Guy — You Imagine, We Create";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Dynamic OG image — rendered at build time, served as PNG.
   Appears when links are shared on WhatsApp, Twitter/X, Instagram DMs, etc. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           "100%",
          height:          "100%",
          display:         "flex",
          flexDirection:   "column",
          alignItems:      "flex-start",
          justifyContent:  "flex-end",
          backgroundColor: "#0A0A0A",
          padding:         "72px 80px",
          fontFamily:      "sans-serif",
          position:        "relative",
        }}
      >
        {/* Blue accent bar — top left */}
        <div
          style={{
            position:        "absolute",
            top:             0,
            left:            0,
            width:           "4px",
            height:          "100%",
            backgroundColor: "#0052FF",
          }}
        />

        {/* Top label */}
        <div
          style={{
            position:      "absolute",
            top:           "72px",
            left:          "80px",
            fontSize:      "14px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#0052FF",
            fontWeight:    600,
          }}
        >
          Custom Print-on-Demand · East Africa
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize:      "120px",
            fontWeight:    900,
            color:         "#FAFAFA",
            lineHeight:    0.9,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            marginBottom:  "24px",
          }}
        >
          THE HOODIE
          <br />
          GUY
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize:      "22px",
            color:         "#888888",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight:    400,
          }}
        >
          You Imagine. We Create.
        </div>

        {/* Bottom right — location */}
        <div
          style={{
            position:      "absolute",
            bottom:        "72px",
            right:         "80px",
            fontSize:      "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color:         "#333333",
            fontWeight:    600,
          }}
        >
          Nairobi, Kenya
        </div>
      </div>
    ),
    { ...size },
  );
}
