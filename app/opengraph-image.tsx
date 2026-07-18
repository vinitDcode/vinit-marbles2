import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vinit Marbles - Masterpieces in Stone & Granite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: "1px solid rgba(212,175,55,0.35)",
            borderRadius: 24,
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -2,
            display: "flex",
          }}
        >
          Vinit&nbsp;<span style={{ color: "#D4AF37" }}>Marbles</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 4,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Masterpieces in Stone &amp; Granite
        </div>
      </div>
    ),
    { ...size }
  );
}
