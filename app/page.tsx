"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ClipboardList, Download, Save, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import UrlInput from "@/components/UrlInput";
import VideoCard from "@/components/VideoCard";
import Loader from "@/components/Loader";
import type { TikWMResponse } from "@/lib/tikwm";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Paste URL",
    desc: "Copy a TikTok or YouTube video link and paste it into the input field above.",
  },
  {
    icon: Download,
    title: "Click Download",
    desc: "Hit the Download button and we'll fetch the video info instantly.",
  },
  {
    icon: Save,
    title: "Save Video",
    desc: "Choose HD video or audio and save it directly to your device.",
  },
];

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState<TikWMResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    const trimmed = url.trim();
    if (!trimmed) {
      toast.error("Please enter a TikTok or YouTube URL");
      return;
    }

    setLoading(true);
    setVideoData(null);
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

      setVideoData(json.data as TikWMResponse);
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
    <div className="mesh-bg min-h-screen flex flex-col relative overflow-hidden">
      {/* Floating particles */}
      <div aria-hidden>
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className={`particle p${i + 1}`} />
        ))}
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-24 gap-12">

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4 max-w-xl"
        >
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 text-violet-300 text-xs font-medium mb-2">
            <Sparkles size={12} />
            TikTok &amp; YouTube · No Watermark · Free
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
              SnapTok
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Download{" "}
            <span className="text-violet-300 font-medium">TikTok</span> &amp;{" "}
            <span className="text-red-400 font-medium">YouTube</span> videos in HD
            .<br className="hidden sm:block" />
            No watermarks. No sign-up. Just paste &amp; save.
          </p>
        </motion.section>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glow-card w-full max-w-xl rounded-2xl bg-[#0d0d1a]/90 backdrop-blur-md p-6 sm:p-8 space-y-6 border border-violet-500/10"
        >
          {/* Input row */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-violet-300 text-sm font-medium">
              <Zap size={14} />
              Enter TikTok or YouTube URL
            </div>
            <UrlInput
              value={url}
              onChange={setUrl}
              onSubmit={handleDownload}
              loading={loading}
            />
          </div>

          {/* Loader / result / error */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader />
              </motion.div>
            )}

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

            {!loading && videoData && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <VideoCard data={videoData} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl space-y-6"
        >
          <h2 className="text-center text-lg font-bold text-slate-300 tracking-wide">
            How it works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center text-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                  <Icon size={18} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-slate-200 font-semibold text-sm mb-1">
                    <span className="text-violet-400 mr-1.5">{i + 1}.</span>
                    {title}
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-600 text-xs border-t border-white/5">
        Powered by{" "}
        <span className="text-violet-400 font-medium">TikWM API</span>
        {" & "}
        <span className="text-red-400 font-medium">ytdl-core</span>
        {" · "}
        <span>SnapTok &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
