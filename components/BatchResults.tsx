"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ChevronDown,
  Clock,
  Download,
  Film,
  Loader2,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import type { PlatformId, VideoInfo } from "@/lib/types";
import { PLATFORMS } from "@/lib/platforms";
import DownloadOptionRow, { startOptionDownload } from "./DownloadOptionRow";

export interface BatchItem {
  id: string;
  url: string;
  platform: PlatformId;
  status: "queued" | "loading" | "success" | "error";
  info?: VideoInfo;
  error?: string;
}

interface BatchResultsProps {
  items: BatchItem[];
  running: boolean;
  onRetry: (id: string) => void;
  onReset: () => void;
}

function ItemThumb({ item }: { item: BatchItem }) {
  if (item.status === "success" && item.info?.thumbnail) {
    return (
      <span className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md border border-veil/[0.06] bg-black/50">
        <Image
          src={item.info.thumbnail}
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
      </span>
    );
  }
  return (
    <span
      className={`flex h-10 w-16 shrink-0 items-center justify-center rounded-md border border-veil/[0.06] ${
        item.status === "error"
          ? "bg-danger/[0.06]"
          : "bg-veil/[0.03]"
      } ${item.status === "loading" ? "animate-pulse" : ""}`}
    >
      {item.status === "error" ? (
        <AlertTriangle size={13} className="text-danger" />
      ) : (
        <Film size={13} className="text-ink-4" />
      )}
    </span>
  );
}

export default function BatchResults({
  items,
  running,
  onRetry,
  onReset,
}: BatchResultsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const reduce = useReducedMotion();

  const ready = items.filter((i) => i.status === "success" && i.info);
  const failed = items.filter((i) => i.status === "error");
  const done = ready.length + failed.length;

  async function handleSaveAll() {
    if (savingAll || ready.length === 0) return;
    setSavingAll(true);
    toast.success(
      `Starting ${ready.length} downloads  your browser may ask to allow multiple files`,
      { duration: 5000 }
    );
    // Stagger the triggers so the browser registers each one
    for (const item of ready) {
      startOptionDownload(
        item.info!.downloads[0],
        item.info!.platform,
        false,
        item.info!.title
      );
      await new Promise((r) => setTimeout(r, 900));
    }
    setSavingAll(false);
  }

  return (
    <div className="card w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-veil/[0.06] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5 text-sm">
          {running ? (
            <Loader2 size={14} className="animate-spin text-ink-2" />
          ) : null}
          <span className="font-medium text-ink-1">Batch download</span>
          <span className="text-xs text-ink-3" aria-live="polite">
            {done} of {items.length} fetched
            {failed.length > 0 ? ` · ${failed.length} failed` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAll}
            disabled={ready.length === 0 || savingAll}
            className="focus-ring flex h-8 items-center gap-1.5 rounded-lg bg-btn px-3 text-xs font-semibold text-btn-ink transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {savingAll ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Download size={12} />
            )}
            {savingAll ? "Saving…" : `Save all (${ready.length})`}
          </button>
          <button
            onClick={onReset}
            className="focus-ring flex h-8 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-3 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
            aria-label="Start a new download"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>
      </div>

      {/* Items */}
      <ul className="divide-y divide-veil/[0.05]">
        {items.map((item) => {
          const meta = PLATFORMS[item.platform];
          const expandable = item.status === "success" && !!item.info;
          const expanded = expandedId === item.id && expandable;

          return (
            <li key={item.id}>
              <div
                role={expandable ? "button" : undefined}
                tabIndex={expandable ? 0 : undefined}
                onClick={
                  expandable
                    ? () => setExpandedId(expanded ? null : item.id)
                    : undefined
                }
                onKeyDown={
                  expandable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setExpandedId(expanded ? null : item.id);
                        }
                      }
                    : undefined
                }
                aria-expanded={expandable ? expanded : undefined}
                className={`focus-ring flex w-full items-center gap-3 px-4 py-3 text-left sm:px-5 ${
                  expandable
                    ? "cursor-pointer transition-colors hover:bg-veil/[0.03]"
                    : ""
                }`}
              >
                <ItemThumb item={item} />

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`}
                      aria-hidden
                    />
                    <span
                      className={`truncate text-sm ${
                        item.status === "success"
                          ? "font-medium text-ink-1"
                          : "text-ink-2"
                      }`}
                    >
                      {item.info?.title ?? item.url}
                    </span>
                  </span>
                  <span
                    className={`mt-0.5 block truncate text-xs ${
                      item.status === "error"
                        ? "text-danger-ink"
                        : "text-ink-4"
                    }`}
                  >
                    {item.status === "queued" && "Waiting…"}
                    {item.status === "loading" &&
                      `Fetching from ${meta.name}…`}
                    {item.status === "error" && item.error}
                    {item.status === "success" &&
                      `${meta.name} · ${item.info!.downloads.length} formats`}
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-2">
                  {item.status === "queued" && (
                    <Clock size={13} className="text-ink-4" aria-hidden />
                  )}
                  {item.status === "loading" && (
                    <Loader2
                      size={13}
                      className="animate-spin text-ink-3"
                      aria-hidden
                    />
                  )}
                  {item.status === "error" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRetry(item.id);
                      }}
                      className="focus-ring flex h-7 items-center gap-1 rounded-lg border border-veil/[0.08] px-2.5 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
                    >
                      <RotateCcw size={11} />
                      Retry
                    </button>
                  )}
                  {item.status === "success" && item.info && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startOptionDownload(
                            item.info!.downloads[0],
                            item.info!.platform,
                            true,
                            item.info!.title
                          );
                        }}
                        className="focus-ring flex h-7 items-center gap-1 rounded-lg bg-btn px-2.5 text-xs font-semibold text-btn-ink transition-all hover:opacity-90 active:scale-[0.98]"
                        aria-label={`Save ${item.info.title}`}
                      >
                        <Download size={11} />
                        Save
                      </button>
                      <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.2 }}
                        aria-hidden
                      >
                        <ChevronDown size={14} className="text-ink-3" />
                      </motion.span>
                    </>
                  )}
                </span>
              </div>

              <AnimatePresence initial={false}>
                {expanded && item.info && (
                  <motion.div
                    key="options"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2 sm:px-5">
                      {item.info.downloads.map((option, i) => (
                        <DownloadOptionRow
                          key={i}
                          option={option}
                          platform={item.info!.platform}
                          title={item.info!.title}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <p className="border-t border-veil/[0.06] px-4 py-3 text-xs leading-relaxed text-ink-4 sm:px-5">
        Save all grabs the best quality for each video. Expand a row to pick a
        different format.
      </p>
    </div>
  );
}
