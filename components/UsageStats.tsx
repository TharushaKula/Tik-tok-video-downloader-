"use client";

import { PLATFORMS } from "@/lib/platforms";
import { topPlatform, type UsageStats as Stats } from "@/lib/stats";

// A quiet one-line personal tally shown once the user has saved a few things.
export default function UsageStats({ stats }: { stats: Stats }) {
  if (stats.total < 3) return null;

  const top = topPlatform(stats);
  const topMeta = top ? PLATFORMS[top] : null;

  return (
    <p className="flex flex-wrap items-center justify-center gap-x-1.5 text-xs text-ink-4">
      <span>
        You&apos;ve saved{" "}
        <span className="font-semibold text-ink-2">{stats.total}</span>{" "}
        {stats.total === 1 ? "video" : "videos"} with SnapLoad
      </span>
      {topMeta && (
        <>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            mostly from
            <span className={`h-1.5 w-1.5 rounded-full ${topMeta.dot}`} aria-hidden />
            <span className="font-medium text-ink-3">{topMeta.name}</span>
          </span>
        </>
      )}
    </p>
  );
}
