"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Eye, Share2, MessageCircle, Clock } from "lucide-react";
import DownloadButtons from "./DownloadButtons";
import type { TikWMResponse } from "@/lib/tikwm";

interface VideoCardProps {
  data: TikWMResponse;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Stat items — YouTube may have 0 for likes/shares/comments; hide them if so.
const STATS = [
  { icon: Heart, label: "Likes", key: "digg_count" as const, color: "text-pink-400" },
  { icon: Eye, label: "Views", key: "play_count" as const, color: "text-sky-400" },
  { icon: Share2, label: "Shares", key: "share_count" as const, color: "text-emerald-400" },
  { icon: MessageCircle, label: "Comments", key: "comment_count" as const, color: "text-amber-400" },
];

// Platform badge colours & labels
const PLATFORM_META = {
  tiktok: { label: "TikTok", bg: "bg-black/60 border-white/10", dot: "bg-white" },
  youtube: { label: "YouTube", bg: "bg-red-950/60 border-red-500/30", dot: "bg-red-500" },
};

export default function VideoCard({ data }: VideoCardProps) {
  const isYT = data.platform === "youtube";
  const visibleStats = isYT
    ? STATS.filter((s) => data[s.key] > 0) // hide zero-stats for YouTube
    : STATS;
  const platformMeta = PLATFORM_META[data.platform];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full rounded-2xl overflow-hidden border border-violet-500/20 bg-[#0d0d1a]/80 backdrop-blur-sm"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-black">
        {data.cover ? (
          <Image
            src={data.cover}
            alt={data.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0f0f1a]">
            <span className="text-slate-500 text-sm">No preview available</span>
          </div>
        )}

        {/* Platform badge */}
        <span
          className={`absolute top-2 left-2 flex items-center gap-1.5 border text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm ${platformMeta.bg}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${platformMeta.dot}`} />
          {platformMeta.label}
        </span>

        {data.duration > 0 && (
          <span className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md">
            <Clock size={10} />
            {formatDuration(data.duration)}
          </span>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Author row */}
        <div className="flex items-center gap-3">
          {data.author.avatar && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-violet-500/40 shrink-0">
              <Image
                src={data.author.avatar}
                alt={data.author.nickname}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-slate-200 font-semibold text-sm truncate">
              {data.author.nickname}
            </p>
            <p className="text-slate-400 text-xs line-clamp-2">{data.title}</p>
          </div>
        </div>

        {/* Stats — only render if there's at least one visible stat */}
        {visibleStats.length > 0 && (
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${visibleStats.length}, minmax(0, 1fr))` }}
          >
            {visibleStats.map(({ icon: Icon, label, key, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 bg-white/5 rounded-xl py-2 px-1"
              >
                <Icon size={14} className={color} />
                <span className="text-slate-200 text-xs font-semibold">
                  {formatCount(data[key])}
                </span>
                <span className="text-slate-500 text-[10px]">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Download buttons */}
        <DownloadButtons
          hdUrl={data.hdplay}
          musicUrl={data.music}
          platform={data.platform}
        />
      </div>
    </motion.div>
  );
}
