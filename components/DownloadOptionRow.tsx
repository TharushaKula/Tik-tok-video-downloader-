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
import { downloadYouTubeOption, PollBlockedError } from "@/lib/youtube-client";

export function optionKind(
  option: DownloadOption
): "audio" | "video" | "image" {
  return option.isAudio ? "audio" : option.format === "jpg" ? "image" : "video";
}

/** Build the server-proxy URL for an option (inline = in-page playback). */
export function proxyUrlFor(
  option: DownloadOption,
  platform: PlatformId,
  inline = false,
  title?: string
): string {
  const params = new URLSearchParams({
    url: option.url,
    type: optionKind(option),
    format: option.format,
    platform,
  });
  if (option.quality) params.set("quality", option.quality);
  if (inline) params.set("inline", "1");
  // The server sanitizes this into the saved filename
  if (title) params.set("filename", title.slice(0, 150));
  return `/api/proxy-download?${params.toString()}`;
}

function triggerProxyDownload(
  option: DownloadOption,
  platform: PlatformId,
  title?: string
) {
  const type = optionKind(option);
  const ext =
    option.format === "mp3" ? "mp3" : option.format === "jpg" ? "jpg" : "mp4";
  const filename = `${title || `${platform}-${type}`}.${ext}`;

  const a = document.createElement("a");
  a.href = proxyUrlFor(option, platform, false, title);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/** The plain server-proxied download path (non-YouTube, and YT fallback). */
function proxyDownloadOption(
  option: DownloadOption,
  platform: PlatformId,
  title?: string
) {
  if (option.isProxy) {
    triggerProxyDownload(option, platform, title);
  } else {
    window.open(option.url, "_blank", "noopener,noreferrer");
  }
}

/** Kick off a download for one option. Set `notify` for a per-file toast. */
export function startOptionDownload(
  option: DownloadOption,
  platform: PlatformId,
  notify = true,
  title?: string
) {
  if (platform === "youtube" && option.isProxy) {
    // Fire-and-forget client conversion; server redirect flow as fallback
    void downloadYouTubeOption(option).catch(() =>
      proxyDownloadOption(option, platform, title)
    );
    if (notify) {
      toast.success(
        "Preparing your file  the download starts when it's ready",
        { duration: 5000 }
      );
    }
    return;
  }
  proxyDownloadOption(option, platform, title);
  if (notify) {
    toast.success("Download started  check your browser downloads");
  }
}

type OptionStatus = "idle" | "working" | "started";

export default function DownloadOptionRow({
  option,
  platform,
  title,
}: {
  option: DownloadOption;
  platform: PlatformId;
  /** Video title  becomes the saved filename */
  title?: string;
}) {
  const [status, setStatus] = useState<OptionStatus>("idle");
  const [percent, setPercent] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const pending = timers.current;
    return () => {
      mounted.current = false;
      pending.forEach(clearTimeout);
    };
  }, []);

  const kind = optionKind(option);
  const Icon = kind === "audio" ? Music2 : kind === "image" ? ImageIcon : Film;
  const isYouTube = platform === "youtube";

  function finish(message?: string) {
    if (!mounted.current) return;
    setPercent(null);
    setStatus("started");
    if (message) toast.success(message);
    timers.current.push(setTimeout(() => setStatus("idle"), 3500));
  }

  async function handleYouTubeClick() {
    setStatus("working");
    setPercent(0);
    try {
      await downloadYouTubeOption(option, (p) => {
        if (mounted.current) setPercent(p);
      });
      finish("Download started  check your browser downloads");
    } catch (err) {
      if (!mounted.current) return;
      if (err instanceof PollBlockedError) {
        // Browser can't reach the resolver (adblock)  server flow instead
        proxyDownloadOption(option, platform, title);
        setPercent(null);
        toast.success(
          "Preparing your file  the download starts when it's ready",
          { duration: 5000 }
        );
        timers.current.push(setTimeout(() => finish(), 8000));
      } else {
        setPercent(null);
        setStatus("idle");
        toast.error(
          err instanceof Error ? err.message : "Failed to start the download"
        );
      }
    }
  }

  function handleClick() {
    if (status !== "idle") return;
    if (isYouTube && option.isProxy) {
      void handleYouTubeClick();
      return;
    }
    try {
      setStatus("working");
      proxyDownloadOption(option, platform, title);
      toast.success("Download started  check your browser downloads");
      timers.current.push(
        setTimeout(() => {
          setStatus("started");
          timers.current.push(setTimeout(() => setStatus("idle"), 3500));
        }, 1200)
      );
    } catch {
      setStatus("idle");
      toast.error("Failed to start the download");
    }
  }

  const converting = status === "working" && percent !== null;

  return (
    <button
      onClick={handleClick}
      disabled={status === "working"}
      className={`focus-ring group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border border-veil/[0.07] bg-veil/[0.02] p-3 text-left transition-all hover:border-veil/[0.18] hover:bg-veil/[0.05] active:scale-[0.99] ${
        status === "working" ? "cursor-wait" : ""
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-veil/[0.06] bg-veil/[0.04]">
        <Icon size={15} className="text-ink-1" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-ink-1">
          {option.label}
        </span>
        <span className="block text-[11px] uppercase tracking-wider text-ink-3">
          {option.format}
          {option.quality ? ` · ${option.quality}` : ""}
        </span>
      </span>
      <span
        className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${
          status === "started"
            ? "text-ok"
            : status === "working"
            ? "text-ink-1"
            : "text-ink-3 transition-colors group-hover:text-ink-1"
        }`}
      >
        {status === "working" ? (
          <>
            <Loader2 size={13} className="animate-spin" />
            {converting ? `Converting · ${percent}%` : "Preparing…"}
          </>
        ) : status === "started" ? (
          <>
            <Check size={13} />
            {isYouTube ? "In your downloads" : "Started"}
          </>
        ) : (
          <>
            <Download size={13} />
            Save
          </>
        )}
      </span>

      {/* Live conversion progress track */}
      {converting && (
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-veil/[0.06]">
          <span
            className="block h-full bg-accent transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </span>
      )}
    </button>
  );
}
