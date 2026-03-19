import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SnapTok – Download TikTok Videos Without Watermark",
  description:
    "Free TikTok video downloader. Save HD videos and audio without watermarks in seconds.",
  keywords: ["tiktok", "downloader", "no watermark", "mp4", "mp3"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#08080f] text-slate-200`}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
