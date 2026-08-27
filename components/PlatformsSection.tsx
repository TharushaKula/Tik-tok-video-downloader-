"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Facebook,
  Instagram,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";
import { PLATFORMS, PLATFORM_IDS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

const ICONS: Record<PlatformId, typeof Music2> = {
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
};

export default function PlatformsSection() {
  const reduce = useReducedMotion();

  return (
    <section id="platforms" className="mx-auto w-full max-w-4xl scroll-mt-20 px-4 py-20 sm:px-6">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          Supported platforms
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          One tool for every feed
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          Paste a link from any of these platforms — SnapLoad detects it and
          fetches the best quality available.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_IDS.map((id, i) => {
          const meta = PLATFORMS[id];
          const Icon = ICONS[id];
          return (
            <motion.div
              key={id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`card p-5 transition-colors duration-300 ${meta.hoverBorder}`}
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]">
                <Icon size={18} className={meta.text} />
              </span>
              <h3 className="mb-2.5 text-sm font-semibold text-slate-100">
                {meta.name}
              </h3>
              <ul className="space-y-1.5">
                {meta.supports.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-1.5 text-xs leading-relaxed text-slate-500"
                  >
                    <Check size={12} className="mt-0.5 shrink-0 text-slate-600" />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
