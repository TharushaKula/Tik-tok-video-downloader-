import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ToastProvider from "@/components/ToastProvider";
import PwaSetup from "@/components/PwaSetup";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Resolves the saved theme preference before first paint so the page never
// flashes the wrong theme. Kept tiny and inline on purpose.
const THEME_INIT = `(function(){try{var p=localStorage.getItem("snapload:theme");var t=p==="light"||p==="dark"?p:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SnapLoad  Free Video Downloader for TikTok, YouTube & More",
  description:
    "Save videos from TikTok, Instagram, Facebook, YouTube, X (Twitter), Reddit, and Pinterest in HD  watermark-free, with MP3 audio. Free, no sign-up, no limits.",
  keywords: [
    "video downloader",
    "tiktok downloader",
    "instagram reels downloader",
    "facebook video downloader",
    "youtube downloader",
    "twitter video downloader",
    "x video downloader",
    "reddit video downloader",
    "pinterest video downloader",
    "no watermark",
    "mp4",
    "mp3",
  ],
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SnapLoad",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9fc" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-base text-ink-1`}
      >
        <ToastProvider />
        <PwaSetup />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
