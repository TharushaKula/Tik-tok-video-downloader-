"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link2, Sparkles, Download } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Link2,
    title: "Copy a link",
    desc: "Use the share button in TikTok, Instagram, Facebook, or YouTube and copy the video link.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Paste it here",
    desc: "The platform is detected automatically and the video details appear in seconds.",
  },
  {
    number: "03",
    icon: Download,
    title: "Save your file",
    desc: "Pick a quality — MP4 in HD or MP3 audio — and it lands straight in your downloads.",
  },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-4xl scroll-mt-20 px-4 py-20 sm:px-6"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          How it works
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Three steps, ten seconds
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          No account, no app, no browser extension.
        </p>
      </motion.div>

      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STEPS.map(({ number, icon: Icon, title, desc }, i) => (
          <motion.div
            key={number}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card relative p-5"
          >
            <span className="absolute right-4 top-4 font-mono text-xs text-slate-600">
              {number}
            </span>
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10">
              <Icon size={17} className="text-violet-300" />
            </span>
            <h3 className="mb-1.5 text-sm font-semibold text-slate-100">
              {title}
            </h3>
            <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
