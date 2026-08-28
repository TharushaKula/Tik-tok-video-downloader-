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
import { applyTemplate, loadTemplate } from "@/lib/filename-template";
import { recordDownload } from "@/lib/stats";
import { vibrate } from "@/lib/sound";

// Fired once per started download so the page can refresh its usage tally.
export const DOWNLOAD_EVENT = "snapload:download";

/** Record one started download and notify listeners. Call once per action. */
export function markDownload(platform: PlatformId) {
  recordDownload(platform);
  vibrate(15); // light tactile ack on phones
  try {
    window.dispatchEvent(new CustomEvent(DOWNLOAD_EVENT, { detail: platform }));
  } catch {
    // SSR / no window  ignore
  }
}

/** Video identity used to build the download filename via the user's template. */
export interface NameInfo {
  title: string;
  author?: string;
}

export function optionKind(
  option: DownloadOption
): "audio" | "video" | "image" {
  return option.isAudio ? "audio" : option.format === "jpg" ? "image" : "video";
}

/** Resolve the filename base for an option from the user's current template. */
function filenameBaseFor(
  option: DownloadOption,
  platform: PlatformId,
  nameInfo?: NameInfo
): string | undefined {
  if (!nameInfo) return undefined;
  return applyTemplate(
    loadTemplate(),
    { title: nameInfo.title, author: nameInfo.author ?? "", platform },
    { quality: option.quality }
  );
}

/** Build the server-proxy URL for an option (inline = in-page playback). */
export function proxyUrlFor(
  option: DownloadOption,
  platform: PlatformId,
  inline = false,
  nameInfo?: NameInfo
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
  const base = filenameBaseFor(option, platform, nameInfo);
  if (base) params.set("filename", base.slice(0, 150));
  return `/api/proxy-download?${params.toString()}`;
}

function triggerProxyDownload(
  option: DownloadOption,
  platform: PlatformId,
  nameInfo?: NameInfo
) {
  const type = optionKind(option);
  // Audio and image options carry their real extension in option.format;
  // everything else is an mp4 video.
  const ext =
    type === "audio"
      ? option.format
      : option.format === "jpg"
      ? "jpg"
      : "mp4";
  const base = filenameBaseFor(option, platform, nameInfo);
  const filename = `${base || `${platform}-${type}`}.${ext}`;

  const a = document.createElement("a");
  a.href = proxyUrlFor(option, platform, false, nameInfo);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/** The plain server-proxied download path (non-YouTube, and YT fallback). */
function proxyDownloadOption(
  option: DownloadOption,
  platform: PlatformId,
  nameInfo?: NameInfo
) {
  if (option.isProxy) {
    triggerProxyDownload(option, platform, nameInfo);
  } else {
    window.open(option.url, "_blank", "noopener,noreferrer");
  }
}

/** Kick off a download for one option. Set `notify` for a per-file toast. */
export function startOptionDownload(
  option: DownloadOption,
  platform: PlatformId,
  notify = true,
  nameInfo?: NameInfo
) {
  markDownload(platform);
  if (platform === "youtube" && option.isProxy) {
    // Fire-and-forget client conversion; server redirect flow as fallback
    void downloadYouTubeOption(option).catch(() =>
      proxyDownloadOption(option, platform, nameInfo)
    );
    if (notify) {
      toast.success(
        "Preparing your file  the download starts when it's ready",
        { duration: 5000 }
      );
    }
    return;
  }
  proxyDownloadOption(option, platform, nameInfo);
  if (notify) {
    toast.success("Download started  check your browser downloads");
  }
}

type OptionStatus = "idle" | "working" | "started";

export default function DownloadOptionRow({
  option,
  platform,
  title,
  author,
}: {
  option: DownloadOption;
  platform: PlatformId;
  /** Video title  feeds the filename template */
  title?: string;
  /** Author/channel  feeds the filename template */
  author?: string;
}) {
  const [status, setStatus] = useState<OptionStatus>("idle");
  const [percent, setPercent] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mounted = useRef(true);
  const nameInfo = title ? { title, author } : undefined;

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
        proxyDownloadOption(option, platform, nameInfo);
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
    markDownload(platform);
    if (isYouTube && option.isProxy) {
      void handleYouTubeClick();
      return;
    }
    try {
      setStatus("working");
      proxyDownloadOption(option, platform, nameInfo);
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
