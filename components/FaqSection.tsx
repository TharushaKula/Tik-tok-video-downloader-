"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Which platforms and formats are supported?",
    a: "TikTok (watermark-free videos, photo slideshows, MP3), Instagram Reels and posts, Facebook videos and Reels, YouTube videos and Shorts (MP4 up to 1080p or MP3), X (Twitter) videos and GIFs, Reddit videos with sound, and Pinterest video and image pins.",
  },
  {
    q: "Can I download several videos at once?",
    a: "Yes — paste multiple links together (or use the Batch button) and SnapLoad fetches up to 10 at a time. Each video gets its own row with quality options, and Save all grabs the best quality for everything in one go.",
  },
  {
    q: "Is it really free?",
    a: "Yes — every download, in every quality, with no account, no limits, and no hidden fees.",
  },
  {
    q: "Why do YouTube downloads take longer to start?",
    a: "YouTube files are converted to your chosen quality on the fly. Most start within seconds, but long HD videos can take up to a minute — keep the tab open and the file will land in your downloads automatically.",
  },
  {
    q: "Can I download private videos?",
    a: "No. Only public posts can be fetched. Private, followers-only, or age-restricted content is not accessible — by design, to respect creators' privacy.",
  },
  {
    q: "Is downloading videos allowed?",
    a: "Downloading is fine for your own content, content you have permission to save, and public-domain or Creative Commons media. Always respect creators' rights and each platform's terms of service.",
  },
  {
    q: "Do you store my links or downloads?",
    a: "No. Links are processed on the fly and discarded immediately. Your recent-downloads list lives only in your own browser and can be cleared anytime.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span className="text-sm font-medium text-slate-200">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={15} className="text-slate-500" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-slate-400">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FaqSectionProps {
  /** Override the default FAQ list (used by platform landing pages) */
  faqs?: { q: string; a: string }[];
}

export default function FaqSection({ faqs = FAQS }: FaqSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="mx-auto w-full max-w-2xl scroll-mt-20 px-4 py-20 sm:px-6">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          FAQ
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Questions, answered
        </h2>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="card divide-y divide-white/[0.06] overflow-hidden"
      >
        {faqs.map((faq) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </motion.div>
    </section>
  );
}
