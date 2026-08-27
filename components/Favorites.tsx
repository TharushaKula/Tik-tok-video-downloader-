"use client";

import { Star, Trash2, X } from "lucide-react";
import { PLATFORMS } from "@/lib/platforms";
import type { FavoriteEntry } from "@/lib/favorites";

interface FavoritesProps {
  entries: FavoriteEntry[];
  onSelect: (url: string) => void;
  onRemove: (url: string) => void;
  onClear: () => void;
  disabled: boolean;
}

export default function Favorites({
  entries,
  onSelect,
  onRemove,
  onClear,
  disabled,
}: FavoritesProps) {
  if (entries.length === 0) return null;

  return (
    <section className="w-full" aria-label="Saved videos">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ink-3">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          Saved
          <span className="text-ink-4">({entries.length})</span>
        </p>
        <button
          onClick={onClear}
          className="focus-ring flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-ink-4 transition-colors hover:text-ink-1"
        >
          <Trash2 size={11} />
          Clear
        </button>
      </div>
      <ul className="card max-h-72 divide-y divide-veil/[0.05] overflow-y-auto">
        {entries.map((entry) => {
          const meta = PLATFORMS[entry.platform];
          return (
            <li key={entry.url} className="group flex items-center">
              <button
                onClick={() => onSelect(entry.url)}
                disabled={disabled}
                className="focus-ring flex min-w-0 flex-1 items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-veil/[0.04] disabled:opacity-50"
                title={entry.url}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate text-sm text-ink-1">
                  {entry.title}
                </span>
                <span className="shrink-0 text-[11px] uppercase tracking-wider text-ink-4">
                  {meta.name}
                </span>
              </button>
              <button
                onClick={() => onRemove(entry.url)}
                className="focus-ring mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink-4 transition-colors hover:bg-veil/[0.06] hover:text-ink-1"
                aria-label={`Remove ${entry.title} from saved`}
              >
                <X size={13} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
