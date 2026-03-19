"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Clipboard, X, Link } from "lucide-react";
import toast from "react-hot-toast";

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

  return (
    <div className="w-full space-y-3">
      <motion.div
        animate={
          focused
            ? { boxShadow: "0 0 0 2px rgba(139,92,246,0.8), 0 0 20px rgba(139,92,246,0.3)" }
            : { boxShadow: "0 0 0 1px rgba(139,92,246,0.2)" }
        }
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 bg-[#0f0f1a] rounded-xl px-4 py-3"
      >
        <Link className="text-violet-400 shrink-0" size={18} />

        <input
          ref={inputRef}
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Paste TikTok or YouTube URL here…"
          disabled={loading}
          className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 outline-none text-sm min-w-0"
          aria-label="TikTok or YouTube URL"
        />

        {value && (
          <button
            onClick={handleClear}
            className="text-slate-500 hover:text-slate-300 transition-colors shrink-0"
            aria-label="Clear URL"
          >
            <X size={16} />
          </button>
        )}

        <button
          onClick={handlePaste}
          className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-200 transition-colors shrink-0 border border-violet-500/30 hover:border-violet-400/60 rounded-lg px-2.5 py-1.5"
          aria-label="Paste from clipboard"
        >
          <Clipboard size={13} />
          Paste
        </button>
      </motion.div>

      <motion.button
        onClick={onSubmit}
        disabled={loading || !value.trim()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 rounded-xl font-semibold text-white text-sm tracking-wide
          bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600
          hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200 shadow-lg shadow-violet-900/40"
      >
        {loading ? "Fetching…" : "Download"}
      </motion.button>
    </div>
  );
}
