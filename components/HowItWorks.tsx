"use client";

import { motion } from "framer-motion";
import { Copy, Zap, Download } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Copy,
    title: "Copy Link",
    desc: "Copy the TikTok, Instagram, Facebook, or YouTube video URL from the app or browser.",
    gradient: "from-pink-500 to-purple-500",
    glow: "shadow-pink-500/20",
  },
  {
    number: "02",
    icon: Zap,
    title: "Paste & Fetch",
    desc: "Paste it into the input above. We fetch the video info instantly.",
    gradient: "from-purple-500 to-cyan-500",
    glow: "shadow-purple-500/20",
  },
  {
    number: "03",
    icon: Download,
    title: "Download",
    desc: "Choose HD, SD, or audio and download without watermark.",
    gradient: "from-cyan-500 to-teal-500",
    glow: "shadow-cyan-500/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-3">
          Simple Process
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          How it works
        </h2>
        <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto">
          Download any TikTok, Instagram, Facebook, or YouTube video in three
          simple steps. No sign-up required.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STEPS.map(({ number, icon: Icon, title, desc, gradient, glow }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative flex flex-col items-center text-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <span className="absolute top-3 right-4 text-5xl font-black text-white/[0.04] select-none">
              {number}
            </span>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ${glow}`}
            >
              <Icon size={22} className="text-white" />
            </div>

            <div>
              <h3 className="mb-1.5 font-semibold text-slate-100">{title}</h3>
              <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
            </div>

            {i < STEPS.length - 1 && (
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                <div className="h-px w-6 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
