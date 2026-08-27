import type { PlatformId } from "./types";

// A tiny, private, on-device tally of downloads the user has started. Never
// leaves the browser  purely a personal "you've saved N videos" counter.
export interface UsageStats {
  total: number;
  byPlatform: Partial<Record<PlatformId, number>>;
  since: number; // first-count timestamp
}

const STORAGE_KEY = "snapload:stats";

export function loadStats(): UsageStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<UsageStats>;
      if (typeof parsed.total === "number") {
        return {
          total: parsed.total,
          byPlatform: parsed.byPlatform ?? {},
          since: parsed.since ?? Date.now(),
        };
      }
    }
  } catch {
    // ignore
  }
  return { total: 0, byPlatform: {}, since: Date.now() };
}

/** Record one started download and return the updated tally. */
export function recordDownload(platform: PlatformId): UsageStats {
  const stats = loadStats();
  const next: UsageStats = {
    total: stats.total + 1,
    byPlatform: {
      ...stats.byPlatform,
      [platform]: (stats.byPlatform[platform] ?? 0) + 1,
    },
    since: stats.since || Date.now(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // best-effort
  }
  return next;
}

export function clearStats(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** The single most-used platform, or null if nothing recorded. */
export function topPlatform(stats: UsageStats): PlatformId | null {
  let best: PlatformId | null = null;
  let bestN = 0;
  for (const [p, n] of Object.entries(stats.byPlatform)) {
    if ((n ?? 0) > bestN) {
      bestN = n ?? 0;
      best = p as PlatformId;
    }
  }
  return best;
}
