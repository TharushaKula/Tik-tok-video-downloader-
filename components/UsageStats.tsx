"use client";

import { PLATFORMS } from "@/lib/platforms";
import { topPlatform, type UsageStats as Stats } from "@/lib/stats";
import { useI18n } from "@/lib/i18n/client";
import { rich } from "@/lib/i18n/format";

// A quiet one-line personal tally shown once the user has saved a few things.
export default function UsageStats({ stats }: { stats: Stats }) {
  const { t, locale } = useI18n();
  if (stats.total < 3) return null;

  const top = topPlatform(stats);
  const topMeta = top ? PLATFORMS[top] : null;

  return (
    <p className="flex flex-wrap items-center justify-center gap-x-1.5 text-xs text-ink-4">
      <span>
        {rich(
          new Intl.PluralRules(locale).select(stats.total) === "one"
            ? t.usage.saved.one
            : t.usage.saved.other,
          {
            count: (
              <span key="count" className="font-semibold text-ink-2">
                {stats.total}
              </span>
            ),
          }
        )}
      </span>
      {topMeta && (
        <>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            {t.usage.mostlyFrom}
            <span className={`h-1.5 w-1.5 rounded-full ${topMeta.dot}`} aria-hidden />
            <span className="font-medium text-ink-3">{topMeta.name}</span>
          </span>
        </>
      )}
    </p>
  );
}
