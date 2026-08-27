"use client";

import { Download, Music2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080810]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-cyan-500 shadow-lg shadow-pink-500/30">
              <Download size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Snap
              </span>
              <span className="text-white">Load</span>
            </span>
          </a>

          {/* Center */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
            <Music2 size={14} className="text-pink-400" />
            Multi-Platform Video Downloader
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-400">
              Free Forever
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
