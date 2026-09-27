"use client";

import { Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/client";
import { fmt } from "@/lib/i18n/format";
import { PLATFORMS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

// Mirrors the shape of the result card so the layout doesn't jump
// when the real data arrives.
export default function ResultSkeleton({
  platform,
}: {
  platform: PlatformId | null;
}) {
  const { t } = useI18n();
  return (
    <div className="card w-full overflow-hidden" aria-hidden>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
        <div className="aspect-video w-full shrink-0 animate-pulse rounded-xl bg-veil/[0.05] sm:w-56" />
        <div className="flex min-w-0 flex-1 flex-col gap-3 py-1">
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-veil/[0.06]" />
          <div className="h-4 w-1/2 animate-pulse rounded-md bg-veil/[0.05]" />
          <div className="h-3 w-1/3 animate-pulse rounded-md bg-veil/[0.04]" />
          <div className="mt-auto flex items-center gap-2 text-xs text-ink-3">
            <Loader2 size={12} className="animate-spin" />
            {platform
              ? fmt(t.batch.fetchingFrom, { platform: PLATFORMS[platform].name })
              : t.batch.fetchingVideo}
          </div>
        </div>
      </div>
      <div className="grid gap-2 border-t border-veil/[0.06] p-4 sm:grid-cols-2 sm:p-5">
        <div className="h-[60px] animate-pulse rounded-xl bg-veil/[0.04]" />
        <div className="h-[60px] animate-pulse rounded-xl bg-veil/[0.04]" />
      </div>
    </div>
  );
}
