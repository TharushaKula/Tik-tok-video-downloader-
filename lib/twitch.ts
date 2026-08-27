import axios from "axios";
import type { VideoInfo, DownloadOption } from "./types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Public web-player client id (shipped in Twitch's own frontend, not a secret)
const GQL_CLIENT = "kimne78kx3ncx6brgo4mv6wki5h1ko";

/** Extract a clip slug from any Twitch clip URL form. */
export function extractClipSlug(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "clips.twitch.tv") {
      // clips.twitch.tv/<Slug>
      return parsed.pathname.split("/").filter(Boolean)[0] || null;
    }
    if (host === "twitch.tv" || host === "m.twitch.tv") {
      // twitch.tv/<channel>/clip/<Slug>
      const m = parsed.pathname.match(/\/clip\/([^/?#]+)/);
      return m ? m[1] : null;
    }
    return null;
  } catch {
    return null;
  }
}

interface TwitchClip {
  title?: string;
  durationSeconds?: number;
  thumbnailURL?: string;
  broadcaster?: { displayName?: string };
  videoQualities?: { quality: string; sourceURL: string }[];
  playbackAccessToken?: { signature: string; value: string };
}

export async function fetchTwitchData(url: string): Promise<VideoInfo> {
  const slug = extractClipSlug(url);
  if (!slug) {
    throw new Error("That doesn't look like a Twitch clip link.");
  }

  const query = `query{clip(slug:"${slug.replace(/"/g, "")}"){title durationSeconds thumbnailURL broadcaster{displayName} videoQualities{quality sourceURL} playbackAccessToken(params:{platform:"web",playerType:"clips-api"}){signature value}}}`;

  let clip: TwitchClip | null;
  try {
    const res = await axios.post<{ data?: { clip: TwitchClip | null } }>(
      "https://gql.twitch.tv/gql",
      { query },
      {
        timeout: 15000,
        headers: {
          "Client-ID": GQL_CLIENT,
          "User-Agent": UA,
          "Content-Type": "application/json",
        },
      }
    );
    clip = res.data?.data?.clip ?? null;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to reach Twitch: ${err.message}`
        : "Failed to reach Twitch"
    );
  }

  if (!clip || !clip.videoQualities?.length || !clip.playbackAccessToken) {
    throw new Error(
      "Clip not found. It may be deleted, or only full VODs are supported (not channels or live streams)."
    );
  }

  const { signature, value } = clip.playbackAccessToken;
  const auth = `sig=${signature}&token=${encodeURIComponent(value)}`;

  // Highest quality first (Twitch returns them descending already)
  const sorted = [...clip.videoQualities].sort(
    (a, b) => Number(b.quality) - Number(a.quality)
  );
  const downloads: DownloadOption[] = sorted.map((q, i) => ({
    label: i === 0 ? "Download HD" : `Download ${q.quality}p`,
    url: `${q.sourceURL}?${auth}`,
    format: "mp4",
    quality: `${q.quality}p`,
    isAudio: false,
    isProxy: true,
  }));

  return {
    platform: "twitch",
    title: clip.title || "Twitch Clip",
    author: clip.broadcaster?.displayName || "Twitch",
    authorAvatar: "",
    thumbnail: clip.thumbnailURL || "",
    duration: clip.durationSeconds || 0,
    downloads,
    stats: {},
  };
}

// Clip MP4s are served from CloudFront; thumbnails from twitch.tv asset hosts.
export const TWITCH_MEDIA_HOSTS = [
  "cloudfront.net",
  "twitch.tv",
  "ttvnw.net",
  "jtvnw.net",
];
