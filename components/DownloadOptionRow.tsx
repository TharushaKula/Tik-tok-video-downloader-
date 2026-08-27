"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Download,
  Film,
  ImageIcon,
  Loader2,
  Music2,
} from "lucide-react";
import toast from "react-hot-toast";
import type { DownloadOption, PlatformId } from "@/lib/types";

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

export function optionKind(
  option: DownloadOption
): "audio" | "video" | "image" {
  return option.isAudio ? "audio" : option.format === "jpg" ? "image" : "video";
}

/** Kick off a download for one option. Set `notify` for a per-file toast. */
export function startOptionDownload(
  option: DownloadOption,
  platform: PlatformId,
  notify = true
) {
  if (option.isProxy) {
    triggerProxyDownload(
      option.url,
      optionKind(option),
      option.format,
      platform,
      option.quality
    );
  } else {
    window.open(option.url, "_blank", "noopener,noreferrer");
  }
  if (notify) {
    if (platform === "youtube") {
      toast.success(
        "Preparing your file — the download starts when it's ready",
        { duration: 5000 }
      );
    } else {
      toast.success("Download started — check your browser downloads");
    }
  }
}

type OptionStatus = "idle" | "working" | "started";

export default function DownloadOptionRow({
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

  const kind = optionKind(option);
  const Icon = kind === "audio" ? Music2 : kind === "image" ? ImageIcon : Film;
  // YouTube converts on demand — the browser download starts when it's ready.
  const slow = platform === "youtube" && !option.isAudio;
  const isYouTube = platform === "youtube";

  function handleClick() {
    if (status !== "idle") return;
    try {
      setStatus("working");
      startOptionDownload(option, platform);
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
