/**
 * Resolver health check. Exercises each platform's live resolver with a
 * known-public URL and reports which are up. These are third-party services
 * that break often, so run this when downloads start failing:
 *
 *   npm run health
 *
 * Exit code is non-zero if any resolver is down, so it can gate a deploy or
 * feed a cron alert.
 */
import { detectPlatform } from "../lib/validators";
import { fetchTikTokData } from "../lib/tikwm";
import { fetchInstagramData } from "../lib/instagram";
import { fetchFacebookData } from "../lib/facebook";
import { fetchYouTubeData } from "../lib/youtube";
import { fetchTwitterData } from "../lib/twitter";
import { fetchRedditData } from "../lib/reddit";
import { fetchPinterestData } from "../lib/pinterest";
import { fetchTwitchData } from "../lib/twitch";
import { fetchSoundCloudData } from "../lib/soundcloud";
import type { VideoInfo } from "../lib/types";

interface Probe {
  platform: string;
  url: string;
  fetcher: (url: string) => Promise<VideoInfo>;
}

// Stable, public samples. Update if any of these get taken down.
const PROBES: Probe[] = [
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@barudakhb_/video/6984138651336838402",
    fetcher: fetchTikTokData,
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/reel/Chunk8-jurw/",
    fetcher: fetchInstagramData,
  },
  {
    platform: "facebook",
    url: "https://www.facebook.com/cnn/videos/10155529876156509/",
    fetcher: fetchFacebookData,
  },
  {
    platform: "youtube",
    url: "https://youtu.be/jNQXAC9IVRw",
    fetcher: fetchYouTubeData,
  },
  {
    platform: "twitter",
    url: "https://x.com/historyinmemes/status/1790637656616943991",
    fetcher: fetchTwitterData,
  },
  {
    platform: "reddit",
    url: "https://www.reddit.com/r/Unexpected/comments/1cl9h0u/the_insurance_claim_will_be_interesting/",
    fetcher: fetchRedditData,
  },
  {
    platform: "pinterest",
    url: "https://www.pinterest.com/pin/664281013778109217/",
    fetcher: fetchPinterestData,
  },
  {
    platform: "soundcloud",
    url: "https://soundcloud.com/forss/flickermood",
    fetcher: fetchSoundCloudData,
  },
  // Twitch clips expire; resolve a current top clip at runtime.
  {
    platform: "twitch",
    url: "",
    fetcher: fetchTwitchData,
  },
];

async function currentTwitchClip(): Promise<string | null> {
  try {
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
    });
    const json = await res.json();
    const slug = json?.data?.game?.clips?.edges?.[0]?.node?.slug;
    return slug ? `https://clips.twitch.tv/${slug}` : null;
  } catch {
    return null;
  }
}

async function main() {
  console.log("SnapLoad resolver health check\n");
  const rows: { platform: string; ok: boolean; detail: string }[] = [];

  for (const probe of PROBES) {
    let url = probe.url;
    if (probe.platform === "twitch") {
      const live = await currentTwitchClip();
      if (!live) {
        rows.push({
          platform: "twitch",
          ok: false,
          detail: "could not fetch a sample clip slug",
        });
        continue;
      }
      url = live;
    }

    // Sanity: the sample must still be recognized by our own validator.
    if (detectPlatform(url) !== probe.platform) {
      rows.push({
        platform: probe.platform,
        ok: false,
        detail: `validator no longer recognizes the sample URL`,
      });
      continue;
    }

    const started = Date.now();
    try {
      const info = await probe.fetcher(url);
      const ms = Date.now() - started;
      const ok = info.downloads.length > 0;
      rows.push({
        platform: probe.platform,
        ok,
        detail: ok
          ? `${info.downloads.length} option(s), ${ms}ms`
          : "resolved but no downloads",
      });
    } catch (err) {
      rows.push({
        platform: probe.platform,
        ok: false,
        detail: err instanceof Error ? err.message : "unknown error",
      });
    }
  }

  const pad = Math.max(...rows.map((r) => r.platform.length));
  for (const r of rows) {
    const icon = r.ok ? "UP  " : "DOWN";
    console.log(`  ${icon}  ${r.platform.padEnd(pad)}  ${r.detail}`);
  }

  const down = rows.filter((r) => !r.ok);
  console.log(
    `\n${rows.length - down.length}/${rows.length} resolvers up${
      down.length ? ` — down: ${down.map((r) => r.platform).join(", ")}` : ""
    }`
  );
  process.exit(down.length > 0 ? 1 : 0);
}

main();
