import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SnapLoad - Free TikTok Video Downloader",
  description:
    "Download TikTok videos without watermark for free. HD quality, no sign-up required.",
  keywords: [
    "tiktok downloader",
    "tiktok video downloader",
    "no watermark",
    "free",
    "hd",
    "mp4",
    "mp3",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#080810] text-slate-200`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
