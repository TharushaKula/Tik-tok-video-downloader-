"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import UrlInput from "@/components/UrlInput";
import VideoResult from "@/components/VideoResult";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

import { isValidUrl } from "@/lib/validators";
import type { VideoInfo } from "@/lib/types";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    const trimmed = url.trim();
    if (!trimmed) {
      toast.error("Please enter a TikTok, Instagram, Facebook, or YouTube URL");
      return;
    }

    if (!isValidUrl(trimmed)) {
      toast.error(
        "Please enter a valid TikTok, Instagram, Facebook, or YouTube URL"
      );
      return;
    }

    setLoading(true);
    setVideoInfo(null);
    setError(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Something went wrong");
      }

      setVideoInfo(json.data as VideoInfo);
      toast.success("Video info fetched!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unexpected error";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#080810] text-slate-200">
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 flex flex-col items-center">
        {/* Hero section */}
        <section className="w-full max-w-2xl mx-auto px-4 pt-16 pb-8 flex flex-col items-center gap-6">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-pink-300 text-xs font-medium">
              <Sparkles size={12} />
              TikTok · Instagram · Facebook · YouTube — HD Quality · Free
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center"
          >
            Download TikTok, Instagram, Facebook & YouTube Videos{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              in HD, for Free
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-center text-slate-400 text-base sm:text-lg max-w-md leading-relaxed"
          >
            Paste any TikTok, Instagram, Facebook, or YouTube link and download
            it in HD or SD quality — watermark-free for social videos, with MP3
            audio for TikTok and YouTube.
          </motion.p>

          {/* Input card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 space-y-5"
          >
            <UrlInput
              value={url}
              onChange={setUrl}
              onSubmit={handleSubmit}
              loading={loading}
            />

            {/* Inline error */}
            <AnimatePresence mode="wait">
              {!loading && error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-red-500/30 bg-red-900/20 p-4 text-red-300 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Video result */}
          <AnimatePresence mode="wait">
            {!loading && videoInfo && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <VideoResult info={videoInfo} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Below-fold sections */}
        <HowItWorks />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
