import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/site";
import "./globals.css";

const archivo = localFont({
  src: [
    { path: "../fonts/archivo-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/archivo-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/archivo-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
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

const newsreader = localFont({
  src: [
    { path: "../fonts/newsreader-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/newsreader-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    title: site.title,
    description: site.ogDescription,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.ogDescription },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmMono.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
