"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Check,
  Clock,
  Download,
  Eye,
  Film,
  Heart,
  ImageIcon,
  Loader2,
  MessageCircle,
  Music2,
  RotateCcw,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";
import type { VideoInfo, DownloadOption, PlatformId } from "@/lib/types";
import PlatformBadge from "./PlatformBadge";

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
  if (h > 0)
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function triggerProxyDownload(
  url: string,
  type: "video" | "audio" | "image",
  format: string,
  platform: PlatformId,
  quality?: string
) {
  const params = new URLSearchParams({ url, type, format, platform });
  if (quality) params.set("quality", quality);
  const proxyUrl = `/api/proxy-download?${params.toString()}`;
  const ext = format === "mp3" ? "mp3" : format === "jpg" ? "jpg" : "mp4";
  const filename = `${platform}-${type}.${ext}`;

  const a = document.createElement("a");
  a.href = proxyUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

type OptionStatus = "idle" | "working" | "started";

function DownloadOptionRow({
  option,
  platform,
}: {
  option: DownloadOption;
  platform: PlatformId;
}) {
  const [status, setStatus] = useState<OptionStatus>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const type: "audio" | "video" | "image" = option.isAudio
    ? "audio"
    : option.format === "jpg"
    ? "image"
    : "video";
  const Icon = option.isAudio ? Music2 : type === "image" ? ImageIcon : Film;
  // YouTube converts on demand — the browser download starts when it's ready.
  const slow = platform === "youtube" && !option.isAudio;
  const isYouTube = platform === "youtube";

  function handleClick() {
    if (status !== "idle") return;
    try {
      setStatus("working");
      if (option.isProxy) {
        triggerProxyDownload(
          option.url,
          type,
          option.format,
          platform,
          option.quality
        );
      } else {
        window.open(option.url, "_blank", "noopener,noreferrer");
      }
      if (isYouTube) {
        toast.success("Preparing your file — the download starts when it's ready", {
          duration: 5000,
        });
      } else {
        toast.success("Download started — check your browser downloads");
      }
      const workingMs = slow ? 9000 : isYouTube ? 5000 : 1200;
      timers.current.push(
        setTimeout(() => {
          setStatus("started");
          timers.current.push(setTimeout(() => setStatus("idle"), 3500));
        }, workingMs)
      );
    } catch {
      setStatus("idle");
      toast.error("Failed to start the download");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === "working"}
      className={`focus-ring group flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-left transition-all hover:border-white/[0.18] hover:bg-white/[0.05] active:scale-[0.99] ${
        status === "working" ? "cursor-wait opacity-80" : ""
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04]">
        <Icon size={15} className="text-slate-300" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-slate-200">
          {option.label}
        </span>
        <span className="block text-[11px] uppercase tracking-wider text-slate-500">
          {option.format}
          {option.quality ? ` · ${option.quality}` : ""}
        </span>
      </span>
      <span
        className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${
          status === "started"
            ? "text-emerald-400"
            : status === "working"
            ? "text-slate-400"
            : "text-slate-500 transition-colors group-hover:text-slate-200"
        }`}
      >
        {status === "working" ? (
          <>
            <Loader2 size={13} className="animate-spin" />
            {slow ? "Preparing…" : "Starting…"}
          </>
        ) : status === "started" ? (
          <>
            <Check size={13} />
            {slow ? "In your downloads" : "Started"}
          </>
        ) : (
          <>
            <Download size={13} />
            Save
          </>
        )}
      </span>
    </button>
  );
}

interface VideoResultProps {
  info: VideoInfo;
  onReset: () => void;
}

export default function VideoResult({ info, onReset }: VideoResultProps) {
  const statItems = [
    { icon: Eye, label: "views", value: info.stats?.views },
    { icon: Heart, label: "likes", value: info.stats?.likes },
    { icon: MessageCircle, label: "comments", value: info.stats?.comments },
    { icon: Share2, label: "shares", value: info.stats?.shares },
  ].filter((s) => (s.value ?? 0) > 0);

  return (
    <div className="card w-full overflow-hidden">
      {/* Media + meta */}
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-black/50 sm:w-56">
          {info.thumbnail ? (
            <Image
              src={info.thumbnail}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Film size={20} className="text-slate-600" />
            </div>
          )}
          <div className="absolute left-2 top-2">
            <PlatformBadge platform={info.platform} />
          </div>
          {info.duration && info.duration > 0 ? (
            <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
              <Clock size={9} />
              {formatDuration(info.duration)}
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-[15px] font-medium leading-snug text-slate-100">
              {info.title}
            </h3>
            <button
              onClick={onReset}
              className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-slate-200"
              aria-label="Start a new download"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">New</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {info.authorAvatar ? (
              <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-white/10">
                <Image
                  src={info.authorAvatar}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </span>
            ) : null}
            <p className="truncate text-sm text-slate-400">{info.author}</p>
          </div>

          {statItems.length > 0 && (
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
              {statItems.map(({ icon: StatIcon, label, value }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-slate-500"
                >
                  <StatIcon size={12} aria-hidden />
                  <span className="font-medium text-slate-400">
                    {formatCount(value ?? 0)}
                  </span>
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Download options */}
      <div className="border-t border-white/[0.06] p-4 sm:p-5">
        <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-slate-500">
          Save as
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {info.downloads.map((option, i) => (
            <DownloadOptionRow key={i} option={option} platform={info.platform} />
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-600">
          {info.platform === "youtube"
            ? "YouTube files are converted on the fly — HD can take up to a minute before the download appears."
            : "Files are fetched through our server, so nothing is installed and no app is needed."}
        </p>
      </div>
    </div>
  );
}
