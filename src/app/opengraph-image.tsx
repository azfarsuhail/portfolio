import { ImageResponse } from "next/og";
import { site } from "@/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0b",
          color: "#e8e5de",
          borderTop: "12px solid #bf00bf",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, textTransform: "uppercase" }}>
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 104,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: -3,
            textTransform: "uppercase",
          }}
        >
          <span>AI, backend</span>
          <span>and the wiring</span>
          <span style={{ color: "rgba(232,229,222,.55)" }}>underneath.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#e979df" }}>{site.availability}</div>
      </div>
    ),
    size,
  );
}
