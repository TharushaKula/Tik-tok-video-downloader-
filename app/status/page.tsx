import type { Metadata } from "next";
import Link from "next/link";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import PlatformIcon from "@/components/PlatformIcon";
import JsonLd from "@/components/JsonLd";

import { PLATFORMS } from "@/lib/platforms";
import { LANDING_FOR_PLATFORM } from "@/lib/landing";
import { probeAllPlatforms } from "@/lib/status";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Status: Is ClipKoala Working?";
const DESCRIPTION =
  "Live status of every platform ClipKoala downloads from (TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch, SoundCloud), checked every ten minutes.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/status",
});

// Serve a cached report and refresh it in the background every 10 minutes,
// so visitors never wait on the probes themselves.
export const revalidate = 600;

function formatCheckedAt(ts: number): string {
  return new Date(ts).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

export default async function StatusPage() {
  const report = await probeAllPlatforms();
  const downCount = report.results.filter((r) => !r.ok).length;
  const allUp = downCount === 0;

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Status", path: "/status" }]}
          eyebrow="Status"
          title="Is ClipKoala working?"
          lede="Live checks against every platform we download from, so you can tell in one glance whether a problem is on our side."
        />

        <div className={`card mt-10 flex items-center gap-3 p-5 ${allUp ? "" : "border-warn/30"}`} role="status">
          <span className="relative flex h-3 w-3 shrink-0">
            {allUp && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            )}
            <span className={`relative inline-flex h-3 w-3 rounded-full ${allUp ? "bg-ok" : "bg-warn"}`} />
          </span>
          <div>
            <p className="text-base font-extrabold text-ink-hi">
              {allUp
                ? "All platforms operational"
                : `${downCount} platform${downCount === 1 ? "" : "s"} having trouble`}
            </p>
            <p className="mt-0.5 text-xs text-ink-4">
              Last checked {formatCheckedAt(report.checkedAt)} · refreshes every 10 minutes
            </p>
          </div>
        </div>

        <ul className="card mt-4 divide-y divide-veil/[0.06] p-0">
          {report.results.map(({ platform, ok, ms }) => {
            const meta = PLATFORMS[platform];
            return (
              <li key={platform} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <Link
                  href={`/${LANDING_FOR_PLATFORM[platform]}`}
                  className="focus-ring flex items-center gap-2.5 rounded hover:text-ink-hi"
                >
                  <PlatformIcon platform={platform} size={15} className={meta.text} />
                  <span className="text-sm font-semibold text-ink-1">{meta.name}</span>
                </Link>
                <span className="flex items-center gap-3">
                  {ok && (
                    <span className="text-xs tabular-nums text-ink-4">{(ms / 1000).toFixed(1)}s</span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      ok ? "bg-ok/10 text-ok" : "bg-danger/10 text-danger"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-ok" : "bg-danger"}`} aria-hidden />
                    {ok ? "Operational" : "Down"}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-sm leading-relaxed text-ink-3">
          Each check fetches a real public post through the same resolver your downloads use.
          These are third-party services, so a platform can dip briefly and recover on its
          own. If one stays down, we are on it; recent fixes are listed in the{" "}
          <Link href="/changelog" className="font-medium text-ink-1 underline decoration-accent/50 underline-offset-4 hover:text-accent">
            changelog
          </Link>
          .
        </p>
      </div>
      <JsonLd data={graph(webPageSchema({ path: "/status", name: TITLE, description: DESCRIPTION }))} />
    </PageShell>
  );
}
