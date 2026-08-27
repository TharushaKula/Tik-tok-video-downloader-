"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Which platforms are supported?",
    a: "SnapLoad supports TikTok videos, Instagram Reels and posts, Facebook videos and Reels (including fb.watch and share links), and YouTube videos and Shorts — downloadable as MP4 in up to 1080p or as MP3 audio.",
  },
  {
    q: "Is it free to use?",
    a: "Yes, SnapLoad is completely free to use with no hidden charges or subscription fees. You can download as many TikTok, Instagram, Facebook, and YouTube videos as you like.",
  },
  {
    q: "How do I download videos without watermark?",
    a: "Simply paste your video URL into the input field and click Download. For TikTok, Instagram, and Facebook we fetch the watermark-free HD version directly. YouTube videos download exactly as published, with a choice of quality.",
  },
  {
    q: "Why do YouTube downloads take longer to start?",
    a: "YouTube files are converted to your chosen quality on the fly. Most downloads begin within a few seconds, but long HD videos can take up to a minute to start — keep the tab open and it will land in your downloads automatically.",
  },
  {
    q: "Can I download private videos?",
    a: "No. SnapLoad can only download public videos. Private or friends-only videos are not accessible through our service — and that's by design to respect privacy.",
  },
  {
    q: "What quality formats are supported?",
    a: "We offer HD and SD video downloads in MP4 format, plus MP3 audio extraction. The HD option gives you the best quality available for the video.",
  },
  {
    q: "How many videos can I download per day?",
    a: "There is no strict daily limit for casual use. However, excessive automated usage may be rate-limited by the underlying API.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. We never store the URLs you paste or any personal information. All requests are processed server-side on-the-fly and discarded immediately after the download.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-slate-200 text-sm">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={16} className="text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/[0.05] pt-3">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-3">
          FAQ
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-col gap-3"
      >
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
          >
            <FaqItem q={faq.q} a={faq.a} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
