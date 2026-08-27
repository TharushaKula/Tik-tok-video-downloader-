import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
import Footer from "@/components/Footer";
import { PLATFORMS } from "@/lib/platforms";
import { probeAllPlatforms } from "@/lib/status";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Status  SnapLoad",
  description:
    "Live status of every platform SnapLoad downloads from, checked every few minutes.",
  alternates: { canonical: `${SITE_URL}/status` },
};

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
    <div id="top" className="relative min-h-screen text-ink-1">
      <Backdrop />
      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-24 pt-16 sm:px-6">
        <Link
          href="/"
          className="focus-ring mb-8 inline-flex items-center gap-1.5 rounded-lg text-sm text-ink-3 transition-colors hover:text-ink-1"
        >
          <ArrowLeft size={14} />
          Back to the downloader
        </Link>

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
          Status
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink-hi sm:text-4xl">
          Is SnapLoad working?
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-2">
          Live checks against every platform we download from, so you can tell
          in one glance whether a problem is on our side.
        </p>

        {/* Overall banner */}
        <div
          className={`card mt-10 flex items-center gap-3 p-5 ${
            allUp ? "" : "border-warn/30"
          }`}
        >
          <span className="relative flex h-3 w-3 shrink-0">
            {allUp && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            )}
            <span
              className={`relative inline-flex h-3 w-3 rounded-full ${
                allUp ? "bg-ok" : "bg-warn"
              }`}
            />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-ink-hi">
              {allUp
                ? "All platforms operational"
                : `${downCount} platform${downCount === 1 ? "" : "s"} having trouble`}
            </p>
            <p className="mt-0.5 text-xs text-ink-4">
              Last checked {formatCheckedAt(report.checkedAt)} · refreshes
              every 10 minutes
            </p>
          </div>
        </div>

        {/* Per-platform rows */}
        <ul className="card mt-4 divide-y divide-veil/[0.06] p-0">
          {report.results.map(({ platform, ok, ms }) => {
            const meta = PLATFORMS[platform];
            return (
              <li
                key={platform}
                className="flex items-center justify-between gap-3 px-5 py-3.5"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 rounded-full ${meta.dot}`}
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-ink-1">
                    {meta.name}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  {ok && (
                    <span className="text-xs tabular-nums text-ink-4">
                      {(ms / 1000).toFixed(1)}s
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      ok ? "bg-ok/10 text-ok" : "bg-danger/10 text-danger"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        ok ? "bg-ok" : "bg-danger"
                      }`}
                      aria-hidden
                    />
                    {ok ? "Operational" : "Down"}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-ink-4">
          Each check fetches a real public post through the same resolver your
          downloads use. These are third-party services, so a platform can dip
          briefly and recover on its own  if one stays down, we&apos;re on it.
        </p>
      </main>

      <Footer />
    </div>
  );
}
