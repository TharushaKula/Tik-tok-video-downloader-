"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Archive,
  Clock,
  Eye,
  Film,
  Heart,
  ImageDown,
  Loader2,
  MessageCircle,
  Play,
  RotateCcw,
  Share2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import type { VideoInfo } from "@/lib/types";
import PlatformBadge from "./PlatformBadge";
import DownloadOptionRow, {
  proxyUrlFor,
  startOptionDownload,
} from "./DownloadOptionRow";

/** Bundle a multi-image post (carousel / slideshow) into one ZIP. */
function ZipAllButton({ info }: { info: VideoInfo }) {
  const [busy, setBusy] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const images = info.downloads.filter((d) => d.format === "jpg" && d.isProxy);
  if (images.length < 2) return null;

  async function handleZip() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: info.platform,
          title: info.title,
          items: images.map((d, i) => ({
            url: d.url,
            name: `image-${i + 1}.jpg`,
          })),
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || "Couldn't build the ZIP");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${info.title.slice(0, 80) || "bundle"}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      toast.success(`ZIP with ${images.length} images saved`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't build the ZIP"
      );
    } finally {
      if (mounted.current) setBusy(false);
    }
  }

  return (
    <button
      onClick={handleZip}
      disabled={busy}
      className="focus-ring flex h-8 items-center gap-1.5 rounded-lg bg-btn px-3 text-xs font-semibold text-btn-ink transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
    >
      {busy ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <Archive size={12} />
      )}
      {busy ? "Zipping…" : `Download all (${images.length}) as ZIP`}
    </button>
  );
}

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

interface VideoResultProps {
  info: VideoInfo;
  onReset: () => void;
}

export default function VideoResult({ info, onReset }: VideoResultProps) {
  const [previewing, setPreviewing] = useState(false);

  const statItems = [
    { icon: Eye, label: "views", value: info.stats?.views },
    { icon: Heart, label: "likes", value: info.stats?.likes },
    { icon: MessageCircle, label: "comments", value: info.stats?.comments },
    { icon: Share2, label: "shares", value: info.stats?.shares },
  ].filter((s) => (s.value ?? 0) > 0);

  // In-page preview streams through our proxy. YouTube is excluded  it
  // would kick off a full conversion just to peek.
  const previewOption =
    info.platform !== "youtube"
      ? info.downloads.find((d) => !d.isAudio && d.format === "mp4" && d.isProxy)
      : undefined;

  return (
    <div className="card w-full overflow-hidden">
      {/* Media + meta */}
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-veil/[0.06] bg-black/50 sm:w-56">
          {previewing && previewOption ? (
            <>
              <video
                src={proxyUrlFor(previewOption, info.platform, true)}
                className="absolute inset-0 h-full w-full bg-black object-contain"
                controls
                autoPlay
                playsInline
                onError={() => {
                  setPreviewing(false);
                  toast.error("Preview isn't available for this video");
                }}
              />
              <button
                onClick={() => setPreviewing(false)}
                className="focus-ring absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/90"
                aria-label="Close preview"
              >
                <X size={13} />
              </button>
            </>
          ) : (
            <>
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
                  <Film size={20} className="text-ink-4" />
                </div>
              )}
              {previewOption && (
                <button
                  onClick={() => setPreviewing(true)}
                  className="focus-ring group/play absolute inset-0 flex items-center justify-center"
                  aria-label="Preview video"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-sm transition-transform group-hover/play:scale-110">
                    <Play size={16} className="ml-0.5 text-white" fill="white" />
                  </span>
                </button>
              )}
              <div className="pointer-events-none absolute left-2 top-2">
                <PlatformBadge platform={info.platform} />
              </div>
              {info.duration && info.duration > 0 ? (
                <span className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  <Clock size={9} />
                  {formatDuration(info.duration)}
                </span>
              ) : null}
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-[15px] font-medium leading-snug text-ink-1">
              {info.title}
            </h3>
            <div className="flex shrink-0 items-center gap-1.5">
              {info.thumbnail && (
                <button
                  onClick={() =>
                    startOptionDownload(
                      {
                        label: "Thumbnail",
                        url: info.thumbnail,
                        format: "jpg",
                        isAudio: false,
                        isProxy: true,
                      },
                      info.platform,
                      true,
                      `${info.title.slice(0, 80)} thumbnail`
                    )
                  }
                  className="focus-ring flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-veil/[0.08] text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
                  aria-label="Save thumbnail image"
                  title="Save thumbnail"
                >
                  <ImageDown size={13} />
                </button>
              )}
              <button
                onClick={onReset}
                className="focus-ring flex items-center gap-1.5 rounded-lg border border-veil/[0.08] px-2.5 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
                aria-label="Start a new download"
              >
                <RotateCcw size={12} />
                <span className="hidden sm:inline">New</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {info.authorAvatar ? (
              <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-veil/10">
                <Image
                  src={info.authorAvatar}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </span>
            ) : null}
            <p className="truncate text-sm text-ink-2">{info.author}</p>
          </div>

          {statItems.length > 0 && (
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
              {statItems.map(({ icon: StatIcon, label, value }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-ink-3"
                >
                  <StatIcon size={12} aria-hidden />
                  <span className="font-medium text-ink-2">
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
      <div className="border-t border-veil/[0.06] p-4 sm:p-5">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-3">
            Save as
          </p>
          <ZipAllButton info={info} />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {info.downloads.map((option, i) => (
            <DownloadOptionRow
              key={i}
              option={option}
              platform={info.platform}
              title={info.title}
            />
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-4">
          {info.platform === "youtube"
            ? "YouTube files are converted on the fly  you'll see live progress, and the download starts automatically when it's ready."
            : "Files are fetched through our server, so nothing is installed and no app is needed."}
        </p>
      </div>
    </div>
  );
}
