import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SnapLoad — Download TikTok, Instagram, Facebook & YouTube Videos",
  description:
    "Save videos from TikTok, Instagram, Facebook, and YouTube in HD — watermark-free, with MP3 audio. Free, no sign-up, no limits.",
  keywords: [
    "video downloader",
    "tiktok downloader",
    "instagram reels downloader",
    "facebook video downloader",
    "youtube downloader",
    "no watermark",
    "mp4",
    "mp3",
  ],
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
        {children}
      </body>
    </html>
  );
}
