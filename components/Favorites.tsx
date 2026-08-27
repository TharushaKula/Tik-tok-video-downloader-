"use client";

import { useMemo, useState } from "react";
import { Plus, Star, Tag, Trash2, X } from "lucide-react";
import { PLATFORMS } from "@/lib/platforms";
import { allTags, type FavoriteEntry } from "@/lib/favorites";

interface FavoritesProps {
  entries: FavoriteEntry[];
  onSelect: (url: string) => void;
  onRemove: (url: string) => void;
  onClear: () => void;
  onSetTags: (url: string, tags: string[]) => void;
  disabled: boolean;
}

function TagEditor({
  entry,
  onSetTags,
}: {
  entry: FavoriteEntry;
  onSetTags: (url: string, tags: string[]) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState("");
  const tags = entry.tags ?? [];

  function commit() {
    const parts = value.split(",");
    if (parts.some((p) => p.trim())) {
      onSetTags(entry.url, [...tags, ...parts]);
    }
    setValue("");
    setAdding(false);
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-full border border-veil/[0.08] bg-veil/[0.03] py-0.5 pl-2 pr-1 text-[11px] text-ink-2"
        >
          {t}
          <button
            onClick={() =>
              onSetTags(
                entry.url,
                tags.filter((x) => x !== t)
              )
            }
            className="focus-ring flex h-3.5 w-3.5 items-center justify-center rounded-full text-ink-4 transition-colors hover:text-ink-1"
            aria-label={`Remove tag ${t}`}
          >
            <X size={10} />
          </button>
        </span>
      ))}
      {adding ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            } else if (e.key === "Escape") {
              setValue("");
              setAdding(false);
            }
          }}
          placeholder="tag name"
          className="h-6 w-24 rounded-full border border-veil/[0.12] bg-transparent px-2 text-[11px] text-ink-1 placeholder-ink-4 outline-none focus-visible:border-accent/60"
          aria-label="New tag"
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="focus-ring inline-flex items-center gap-0.5 rounded-full border border-dashed border-veil/[0.12] py-0.5 pl-1.5 pr-2 text-[11px] text-ink-4 transition-colors hover:border-veil/25 hover:text-ink-2"
        >
          <Plus size={10} />
          tag
        </button>
      )}
    </div>
  );
}

export default function Favorites({
  entries,
  onSelect,
  onRemove,
  onClear,
  onSetTags,
  disabled,
}: FavoritesProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [editingUrl, setEditingUrl] = useState<string | null>(null);

  const tags = useMemo(() => allTags(entries), [entries]);

  // Drop a filter that no longer exists (e.g. its last video was untagged)
  const effectiveTag = activeTag && tags.includes(activeTag) ? activeTag : null;
  const visible = effectiveTag
    ? entries.filter((e) => (e.tags ?? []).includes(effectiveTag))
    : entries;

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

      {/* Tag filter bar */}
      {tags.length > 0 && (
        <div className="mb-2 flex flex-wrap items-center gap-1.5 px-1">
          <Tag size={11} className="text-ink-4" aria-hidden />
          <button
            onClick={() => setActiveTag(null)}
            className={`focus-ring rounded-full border px-2.5 py-0.5 text-[11px] transition-colors ${
              !effectiveTag
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-veil/[0.08] text-ink-3 hover:text-ink-1"
            }`}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`focus-ring rounded-full border px-2.5 py-0.5 text-[11px] transition-colors ${
                effectiveTag === t
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-veil/[0.08] text-ink-3 hover:text-ink-1"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <ul className="card max-h-96 divide-y divide-veil/[0.05] overflow-y-auto">
        {visible.map((entry) => {
          const meta = PLATFORMS[entry.platform];
          const editing = editingUrl === entry.url;
          return (
            <li key={entry.url} className="group">
              <div className="flex items-center">
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
                  onClick={() => setEditingUrl(editing ? null : entry.url)}
                  aria-pressed={editing}
                  aria-label={`Edit tags for ${entry.title}`}
                  className={`focus-ring ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-veil/[0.06] ${
                    editing || (entry.tags?.length ?? 0) > 0
                      ? "text-ink-2"
                      : "text-ink-4"
                  } hover:text-ink-1`}
                >
                  <Tag size={13} />
                </button>
                <button
                  onClick={() => onRemove(entry.url)}
                  className="focus-ring mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink-4 transition-colors hover:bg-veil/[0.06] hover:text-ink-1"
                  aria-label={`Remove ${entry.title} from saved`}
                >
                  <X size={13} />
                </button>
              </div>
              {/* Tags: shown when present or while editing */}
              {(editing || (entry.tags?.length ?? 0) > 0) && (
                <div className="px-4 pb-2.5 pl-[30px]">
                  {editing ? (
                    <TagEditor entry={entry} onSetTags={onSetTags} />
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {(entry.tags ?? []).map((t) => (
                        <button
                          key={t}
                          onClick={() => setActiveTag(t)}
                          className="focus-ring rounded-full border border-veil/[0.08] bg-veil/[0.03] px-2 py-0.5 text-[11px] text-ink-3 transition-colors hover:text-ink-1"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
