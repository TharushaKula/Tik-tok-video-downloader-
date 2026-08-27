import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ToastProvider from "@/components/ToastProvider";
import PwaSetup from "@/components/PwaSetup";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SnapLoad — Free Video Downloader for TikTok, YouTube & More",
  description:
    "Save videos from TikTok, Instagram, Facebook, YouTube, X (Twitter), Reddit, and Pinterest in HD — watermark-free, with MP3 audio. Free, no sign-up, no limits.",
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
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a0a0f] text-slate-300`}
      >
        <ToastProvider />
        <PwaSetup />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
