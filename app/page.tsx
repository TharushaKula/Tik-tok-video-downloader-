"use client";

import { motion, useReducedMotion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
import DownloaderTool from "@/components/DownloaderTool";
import PlatformsSection from "@/components/PlatformsSection";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const reduce = useReducedMotion();

  return (
    <div id="top" className="relative min-h-screen text-ink-1">
      <Backdrop />
      <Navbar />

      <main className="relative z-10">
        {/* Hero + tool */}
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-4 pb-6 pt-16 sm:px-6 sm:pt-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-ink-hi sm:text-5xl">
              Download any video,
              <br />
              <span className="text-ink-3">clean and watermark-free.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
              TikTok, Instagram, YouTube, Facebook, X, Reddit, Pinterest,
              Twitch, and SoundCloud. Paste a link and save it in HD, or grab
              just the audio as MP3.
            </p>
          </motion.div>

          <DownloaderTool />
        </section>

        <PlatformsSection />
        <HowItWorks />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
