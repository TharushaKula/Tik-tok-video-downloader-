"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Eye,
  Share2,
  MessageCircle,
  Clock,
  Download,
  Music2,
  Film,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import type { VideoInfo, DownloadOption } from "@/lib/types";

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

function formatDuration(sec: number): string {
  if (!sec) return "";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function triggerProxyDownload(url: string, type: "video" | "audio", format: string) {
  const params = new URLSearchParams({ url, type });
  const proxyUrl = `/api/proxy-download?${params.toString()}`;
  const ext = format === "mp3" ? "mp3" : "mp4";
  const filename = `tiktok-${type}.${ext}`;

  const a = document.createElement("a");
  a.href = proxyUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function DownloadButton({ option }: { option: DownloadOption }) {
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  function handleClick() {
    if (downloading) return;
    try {
      setDownloading(true);
      const type = option.isAudio ? "audio" : "video";
      if (option.isProxy) {
        triggerProxyDownload(option.url, type, option.format);
      } else {
        window.open(option.url, "_blank", "noopener,noreferrer");
      }
      toast.success(option.isAudio ? "Audio download started!" : "Video download started!");
      setTimeout(() => {
        setDownloading(false);
        setDone(true);
        setTimeout(() => setDone(false), 3000);
      }, 1000);
    } catch {
      setDownloading(false);
      toast.error("Failed to start download");
    }
  }

  const isAudio = option.isAudio;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all
        ${
          isAudio
            ? "border-fuchsia-500/25 bg-fuchsia-900/10 hover:border-fuchsia-500/50 hover:bg-fuchsia-900/20"
            : "border-pink-500/25 bg-pink-900/10 hover:border-pink-500/50 hover:bg-pink-900/20"
        }
        ${downloading ? "opacity-75 cursor-wait" : "cursor-pointer"}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            isAudio ? "bg-fuchsia-500/15" : "bg-pink-500/15"
          }`}
        >
          {done ? (
            <CheckCircle2
              size={16}
              className={isAudio ? "text-fuchsia-400" : "text-pink-400"}
            />
          ) : isAudio ? (
            <Music2 size={16} className="text-fuchsia-400" />
          ) : (
            <Film size={16} className="text-pink-400" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-200">{option.label}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider">
            {option.format}
            {option.quality ? ` · ${option.quality}` : ""}
          </p>
        </div>
      </div>

      <div
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
          downloading
            ? "bg-white/5 text-slate-400"
            : isAudio
            ? "bg-fuchsia-500/20 text-fuchsia-300"
            : "bg-pink-500/20 text-pink-300"
        }`}
      >
        {downloading ? (
          <span className="h-3 w-3 animate-spin rounded-full border border-slate-400/30 border-t-slate-400" />
        ) : (
          <Download size={12} />
        )}
        {downloading ? "Starting..." : done ? "Done!" : "Download"}
      </div>
    </motion.button>
  );
}

export default function VideoResult({ info }: { info: VideoInfo }) {
  const hasStats =
    info.stats &&
    (
      (info.stats.views ?? 0) > 0 ||
      (info.stats.likes ?? 0) > 0 ||
      (info.stats.comments ?? 0) > 0 ||
      (info.stats.shares ?? 0) > 0
    );

  const statItems = [
    { icon: Eye, label: "Views", value: info.stats?.views, color: "text-sky-400" },
    { icon: Heart, label: "Likes", value: info.stats?.likes, color: "text-pink-400" },
    { icon: MessageCircle, label: "Comments", value: info.stats?.comments, color: "text-amber-400" },
    { icon: Share2, label: "Shares", value: info.stats?.shares, color: "text-emerald-400" },
  ].filter((s) => (s.value ?? 0) > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0E0E1C]">
        {info.thumbnail ? (
          <Image
            src={info.thumbnail}
            alt={info.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-slate-500 text-sm">No preview available</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

        {/* TikTok badge */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-900/20 px-2.5 py-0.5 text-xs font-semibold text-pink-300 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-pink-400" />
            TikTok
          </span>
        </div>

        {info.duration && info.duration > 0 && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
            <Clock size={10} />
            {formatDuration(info.duration)}
          </span>
        )}
      </div>

      <div className="space-y-4 p-4">
        {/* Author + title */}
        <div className="flex items-start gap-3">
          {info.authorAvatar && (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-pink-500/40">
              <Image
                src={info.authorAvatar}
                alt={info.author}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-slate-200 text-sm">
              {info.author}
            </p>
            <p className="line-clamp-2 text-xs text-slate-400 mt-0.5">
              {info.title}
            </p>
          </div>
        </div>

        {/* Stats row */}
        {hasStats && statItems.length > 0 && (
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${statItems.length}, minmax(0, 1fr))` }}
          >
            {statItems.map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-xl bg-white/[0.04] py-2.5 px-1"
              >
                <Icon size={13} className={color} />
                <span className="text-xs font-semibold text-slate-200">
                  {formatCount(value ?? 0)}
                </span>
                <span className="text-[10px] text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Download options */}
        <div>
          <p className="mb-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
            Download Options
          </p>
          <div className="flex flex-col gap-2">
            {info.downloads.map((option, i) => (
              <DownloadButton key={i} option={option} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
