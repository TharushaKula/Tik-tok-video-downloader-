import { fetchTikTokData } from "./tikwm";
import { fetchInstagramData } from "./instagram";
import { fetchFacebookData } from "./facebook";
import { startLoaderJob } from "./youtube";
import { fetchTwitterData } from "./twitter";
import { fetchRedditData } from "./reddit";
import { fetchPinterestData } from "./pinterest";
import { fetchTwitchData } from "./twitch";
import { fetchSoundCloudData } from "./soundcloud";
import type { PlatformId, VideoInfo } from "./types";

// Live status probes for the /status page. Each probe exercises the real
// third-party resolver behind a platform with a known-public sample, bounded
// by a hard timeout so the page always renders quickly.

export interface PlatformStatus {
  platform: PlatformId;
  ok: boolean;
  /** Round-trip time in ms (present when the probe finished, up or down). */
  ms: number;
}

export interface StatusReport {
  checkedAt: number;
  results: PlatformStatus[];
}

// Generous timeout + one retry: probes run in the background (ISR), so
// nobody waits on them, and a transient flake shouldn't show as an outage.
const PROBE_TIMEOUT_MS = 15000;
const RETRY_DELAY_MS = 1500;

const SAMPLES: Partial<Record<PlatformId, string>> = {
  tiktok: "https://www.tiktok.com/@barudakhb_/video/6984138651336838402",
  instagram: "https://www.instagram.com/reel/Chunk8-jurw/",
  facebook: "https://www.facebook.com/cnn/videos/10155529876156509/",
  youtube: "https://youtu.be/jNQXAC9IVRw",
  twitter: "https://x.com/historyinmemes/status/1790637656616943991",
  reddit:
    "https://www.reddit.com/r/Unexpected/comments/1cl9h0u/the_insurance_claim_will_be_interesting/",
  pinterest: "https://www.pinterest.com/pin/664281013778109217/",
  soundcloud: "https://soundcloud.com/forss/flickermood",
};

function withTimeout<T>(work: Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("probe timeout")),
      PROBE_TIMEOUT_MS
    );
    work.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

/** A clip slug that currently exists (clips expire, so look one up live). */
async function currentTwitchClipUrl(): Promise<string> {
  const res = await fetch("https://gql.twitch.tv/gql", {
    method: "POST",
    headers: {
      "Client-ID": "kimne78kx3ncx6brgo4mv6wki5h1ko",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query:
        'query{game(name:"Just Chatting"){clips(first:1,criteria:{period:LAST_WEEK}){edges{node{slug}}}}}',
    }),
    // No cache override: inherits the page's revalidate window, so this
    // fetch never forces the /status route to render dynamically.
  });
  const json = await res.json();
  const slug = json?.data?.game?.clips?.edges?.[0]?.node?.slug;
  if (!slug) throw new Error("no sample clip");
  return `https://clips.twitch.tv/${slug}`;
}

async function attempt(
  platform: PlatformId,
  run: () => Promise<VideoInfo | string>
): Promise<PlatformStatus> {
  const started = Date.now();
  try {
    const out = await withTimeout(run());
    const ok =
      typeof out === "string" ? out.length > 0 : out.downloads.length > 0;
    return { platform, ok, ms: Date.now() - started };
  } catch {
    return { platform, ok: false, ms: Date.now() - started };
  }
}

async function probeOne(
  platform: PlatformId,
  run: () => Promise<VideoInfo | string>
): Promise<PlatformStatus> {
  const first = await attempt(platform, run);
  if (first.ok) return first;
  // One retry so a single transient flake doesn't display as an outage.
  await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
  return attempt(platform, run);
}

/** Probe every platform's resolver in parallel. Never throws. */
export async function probeAllPlatforms(): Promise<StatusReport> {
  const results = await Promise.all([
    probeOne("tiktok", () => fetchTikTokData(SAMPLES.tiktok!)),
    probeOne("instagram", () => fetchInstagramData(SAMPLES.instagram!)),
    probeOne("facebook", () => fetchFacebookData(SAMPLES.facebook!)),
    // The converter is what actually breaks, so start (but don't poll) a job.
    probeOne("youtube", () => startLoaderJob(SAMPLES.youtube!, "mp3")),
    probeOne("twitter", () => fetchTwitterData(SAMPLES.twitter!)),
    probeOne("reddit", () => fetchRedditData(SAMPLES.reddit!)),
    probeOne("pinterest", () => fetchPinterestData(SAMPLES.pinterest!)),
    probeOne("twitch", async () =>
      fetchTwitchData(await currentTwitchClipUrl())
    ),
    probeOne("soundcloud", () => fetchSoundCloudData(SAMPLES.soundcloud!)),
  ]);
  return { checkedAt: Date.now(), results };
}
