import type { PlatformId } from "./types";

// Saved (starred) videos, persisted in the browser. Mirrors the recent-list
// pattern but keyed for long-term keeping rather than a rolling history.
export interface FavoriteEntry {
  url: string;
  title: string;
  platform: PlatformId;
  thumbnail?: string;
  ts: number;
  /** User-assigned collection tags */
  tags?: string[];
}

const STORAGE_KEY = "snapload:favorites";
const MAX_ENTRIES = 50;

export function loadFavorites(): FavoriteEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_ENTRIES) : [];
  } catch {
    return [];
  }
}

function write(list: FavoriteEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES)));
  } catch {
    // storage full / private mode  favorites are best-effort
  }
}

export function isFavorite(url: string): boolean {
  return loadFavorites().some((e) => e.url === url);
}

/** Add or remove; returns the resulting list and whether it's now favorited. */
export function toggleFavorite(entry: FavoriteEntry): {
  list: FavoriteEntry[];
  favorited: boolean;
} {
  const current = loadFavorites();
  const exists = current.some((e) => e.url === entry.url);
  const list = exists
    ? current.filter((e) => e.url !== entry.url)
    : [entry, ...current];
  write(list);
  return { list, favorited: !exists };
}

export function removeFavorite(url: string): FavoriteEntry[] {
  const list = loadFavorites().filter((e) => e.url !== url);
  write(list);
  return list;
}

export function clearFavorites(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

const MAX_TAG_LEN = 24;

/** Normalize a raw tag: trimmed, collapsed, lowercased, length-capped. */
export function normalizeTag(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, MAX_TAG_LEN).toLowerCase();
}

/** Replace the tag set for one saved video. Returns the updated list. */
export function setFavoriteTags(url: string, tags: string[]): FavoriteEntry[] {
  const cleaned: string[] = [];
  for (const t of tags) {
    const n = normalizeTag(t);
    if (n && !cleaned.includes(n)) cleaned.push(n);
  }
  const list = loadFavorites().map((e) =>
    e.url === url ? { ...e, tags: cleaned } : e
  );
  write(list);
  return list;
}

/** Every distinct tag across saved videos, sorted by frequency then name. */
export function allTags(list: FavoriteEntry[]): string[] {
  const counts = new Map<string, number>();
  for (const e of list) {
    for (const t of e.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return Array.from(counts.keys()).sort((a, b) => {
    const d = (counts.get(b) ?? 0) - (counts.get(a) ?? 0);
    return d !== 0 ? d : a.localeCompare(b);
  });
}
