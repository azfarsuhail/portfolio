import { ImageResponse } from "next/og";

// The iOS home-screen icon: public/favicon.svg's mark as a 180x180 PNG (iOS
// ignores SVG touch icons). Full bleed with no border or radius, because iOS
// applies its own rounded mask; a drawn corner would show as a second edge.
// Prerendered at build on the default Node runtime (the Edge runtime is
// deprecated). Keep the shapes in step with favicon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#050505" }}>
        <svg width="180" height="180" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 23 16 9 24 23Z" fill="none" stroke="#F4F5F6" strokeWidth="2" strokeLinejoin="round" />
          <rect x="6" y="21" width="4" height="4" fill="#F4F5F6" />
          <rect x="22" y="21" width="4" height="4" fill="#F4F5F6" />
          <rect x="13" y="6" width="6" height="6" fill="#0066FF" />
        </svg>
      </div>
    ),
    size,
  );
}
