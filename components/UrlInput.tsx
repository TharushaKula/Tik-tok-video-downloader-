"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Clipboard,
  X,
  Download,
  Music2,
  Link2,
  Instagram,
  Facebook,
} from "lucide-react";
import toast from "react-hot-toast";
import { detectPlatform } from "@/lib/validators";

interface UrlInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function UrlInput({
  value,
  onChange,
  onSubmit,
  loading,
}: UrlInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const platform = value.trim() ? detectPlatform(value.trim()) : null;
  const isTikTok = platform === "tiktok";
  const isInstagram = platform === "instagram";
  const isFacebook = platform === "facebook";

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
      toast.success("Pasted from clipboard!");
      inputRef.current?.focus();
    } catch {
      toast.error("Clipboard access denied");
    }
  }

  function handleClear() {
    onChange("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !loading) onSubmit();
  }

  const glowColor = isTikTok
    ? "rgba(236,72,153,0.5)"
    : isInstagram
    ? "rgba(217,70,239,0.5)"
    : isFacebook
    ? "rgba(59,130,246,0.5)"
    : "rgba(139,92,246,0.5)";

  return (
    <div className="w-full space-y-3">
      {/* Input wrapper */}
      <motion.div
        animate={
          focused
            ? { boxShadow: `0 0 0 2px ${glowColor}, 0 0 24px ${glowColor}55` }
            : { boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }
        }
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 rounded-xl bg-[#0E0E1C] px-4 py-3"
      >
        {isTikTok ? (
          <Music2 size={18} className="text-pink-400 shrink-0" />
        ) : isInstagram ? (
          <Instagram size={18} className="text-fuchsia-400 shrink-0" />
        ) : isFacebook ? (
          <Facebook size={18} className="text-blue-400 shrink-0" />
        ) : (
          <Link2 size={18} className="text-slate-500 shrink-0" />
        )}

        <input
          ref={inputRef}
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Paste a TikTok, Instagram, or Facebook URL..."
          disabled={loading}
          className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 outline-none text-sm min-w-0"
          aria-label="Video URL"
        />

        {value && (
          <button
            onClick={handleClear}
            className="shrink-0 rounded-md p-1 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Clear URL"
          >
            <X size={15} />
          </button>
        )}

        <button
          onClick={handlePaste}
          className="shrink-0 flex items-center gap-1.5 rounded-lg border border-pink-500/30 px-2.5 py-1.5 text-xs text-pink-400 hover:border-pink-400/60 hover:text-pink-200 transition-colors"
          aria-label="Paste from clipboard"
        >
          <Clipboard size={12} />
          Paste
        </button>
      </motion.div>

      {/* Download button */}
      <motion.button
        onClick={onSubmit}
        disabled={loading || !value.trim()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full overflow-hidden rounded-xl py-3.5 font-semibold text-white text-sm tracking-wide
          bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600
          hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200 shadow-lg shadow-pink-900/30"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Fetching video info...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Download size={16} />
            Download
          </span>
        )}
      </motion.button>
    </div>
  );
}
