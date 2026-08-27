"use client";

import { History, RotateCcw, Trash2 } from "lucide-react";
import { PLATFORMS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

export interface RecentEntry {
  url: string;
  title: string;
  platform: PlatformId;
  ts: number;
}

const STORAGE_KEY = "snapload:recent";
const MAX_ENTRIES = 6;

export function loadRecent(): RecentEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_ENTRIES) : [];
  } catch {
    return [];
  }
}

export function saveRecent(entry: RecentEntry): RecentEntry[] {
  const next = [
    entry,
    ...loadRecent().filter((e) => e.url !== entry.url),
  ].slice(0, MAX_ENTRIES);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage full / private mode — history is best-effort
  }
  return next;
}

export function clearRecent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function timeAgo(ts: number): string {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

interface RecentDownloadsProps {
  entries: RecentEntry[];
  onSelect: (url: string) => void;
  onClear: () => void;
  disabled: boolean;
}

export default function RecentDownloads({
  entries,
  onSelect,
  onClear,
  disabled,
}: RecentDownloadsProps) {
  if (entries.length === 0) return null;

  return (
    <section className="w-full" aria-label="Recent downloads">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
          <History size={12} />
          Recent
        </p>
        <button
          onClick={onClear}
          className="focus-ring flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-slate-600 transition-colors hover:text-slate-300"
        >
          <Trash2 size={11} />
          Clear
        </button>
      </div>
      <ul className="card divide-y divide-white/[0.05] overflow-hidden">
        {entries.map((entry) => {
          const meta = PLATFORMS[entry.platform];
          return (
            <li key={entry.url}>
              <button
                onClick={() => onSelect(entry.url)}
                disabled={disabled}
                className="focus-ring group flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/[0.04] disabled:opacity-50"
                title={entry.url}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate text-sm text-slate-300">
                  {entry.title}
                </span>
                <span className="shrink-0 text-[11px] text-slate-600">
                  {timeAgo(entry.ts)}
                </span>
                <RotateCcw
                  size={12}
                  className="shrink-0 text-slate-600 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
