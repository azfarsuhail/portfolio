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
          // The site's off-black ground with its faint blue spotlight, Ice White ink.
          background: "radial-gradient(70% 80% at 20% 85%, #041328, #050505 75%)",
          color: "#f4f5f6",
          borderTop: "6px solid #0066ff",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, textTransform: "uppercase" }}>
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          <span>AI, backend and the wiring</span>
          <span style={{ color: "#9e9ea7" }}>underneath.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#297fff" }}>{site.availability}</div>
      </div>
    ),
    size,
  );
}
