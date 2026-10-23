import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/site";
import "./globals.css";

// One variable file carries both axes: weight for text and display, width for
// the expanded display setting (font-stretch maps onto wdth).
const archivo = localFont({
  src: "../fonts/archivo-latin-standard-normal.woff2",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  variable: "--font-archivo",
});

const dmMono = localFont({
  src: [
    { path: "../fonts/dm-mono-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/dm-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dm-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  // apple points at the PNG route from app/apple-icon.tsx (iOS ignores SVG). It
  // has to be listed: Next only injects file-based icons when `icons` is unset.
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    title: site.title,
    description: site.ogDescription,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.ogDescription },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
