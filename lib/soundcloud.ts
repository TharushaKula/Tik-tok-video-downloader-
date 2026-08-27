import axios from "axios";
import type { VideoInfo, DownloadOption } from "./types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// SoundCloud's public API needs a client_id, which the web app ships inside
// one of its JS bundles. We scrape it on demand and cache it in-process; if
// it goes stale (401), we refresh once.
let cachedClientId: string | null = null;

async function scrapeClientId(): Promise<string> {
  const home = await axios.get<string>("https://soundcloud.com/", {
    timeout: 15000,
    responseType: "text",
    headers: { "User-Agent": UA },
  });
  const scripts = (
    home.data.match(
      /https:\/\/a-v2\.sndcdn\.com\/assets\/[a-zA-Z0-9-]+\.js/g
    ) ?? []
  );
  const uniq: string[] = [];
  for (const s of scripts) if (!uniq.includes(s)) uniq.push(s);

  for (const src of uniq.reverse()) {
    try {
      const js = (
        await axios.get<string>(src, {
          timeout: 15000,
          responseType: "text",
          headers: { "User-Agent": UA },
        })
      ).data;
      const m = js.match(/client_id[=:"]{1,3}([a-zA-Z0-9]{25,40})/);
      if (m) return m[1];
    } catch {
      // try the next bundle
    }
  }
  throw new Error("Could not obtain a SoundCloud client id");
}

async function getClientId(force = false): Promise<string> {
  if (!cachedClientId || force) {
    cachedClientId = await scrapeClientId();
  }
  return cachedClientId;
}

interface SCTranscoding {
  url: string;
  format: { protocol: string; mime_type: string };
}
interface SCTrack {
  kind: string;
  title?: string;
  duration?: number;
  user?: { username?: string; avatar_url?: string };
  artwork_url?: string;
  media?: { transcodings?: SCTranscoding[] };
}

export async function fetchSoundCloudData(url: string): Promise<VideoInfo> {
  let clientId = await getClientId();

  const resolve = async (): Promise<SCTrack> => {
    const res = await axios.get<SCTrack>(
      "https://api-v2.soundcloud.com/resolve",
      {
        params: { url, client_id: clientId },
        timeout: 15000,
        headers: { "User-Agent": UA },
      }
    );
    return res.data;
  };

  let track: SCTrack;
  try {
    track = await resolve();
  } catch (err) {
    // Stale client_id -> refresh once
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      clientId = await getClientId(true);
      track = await resolve();
    } else if (axios.isAxiosError(err) && err.response?.status === 404) {
      throw new Error("Track not found. It may be private or removed.");
    } else {
      throw new Error(
        err instanceof Error
          ? `Failed to reach SoundCloud: ${err.message}`
          : "Failed to reach SoundCloud"
      );
    }
  }

  if (track.kind !== "track") {
    throw new Error(
      "That SoundCloud link isn't a single track. Playlists and profiles aren't supported yet."
    );
  }

  const transcodings = track.media?.transcodings ?? [];
  const progressive = transcodings.find(
    (t) => t.format?.protocol === "progressive"
  );
  if (!progressive) {
    throw new Error(
      "This track can't be downloaded (the uploader disabled it or it's preview-only)."
    );
  }

  // The transcoding URL returns a short-lived direct media URL
  const streamRes = await axios.get<{ url: string }>(progressive.url, {
    params: { client_id: clientId },
    timeout: 15000,
    headers: { "User-Agent": UA },
  });
  const streamUrl = streamRes.data?.url;
  if (!streamUrl) {
    throw new Error("SoundCloud did not return a downloadable stream.");
  }

  const downloads: DownloadOption[] = [
    {
      label: "Download Audio",
      url: streamUrl,
      format: "mp3",
      isAudio: true,
      isProxy: true,
    },
  ];

  const artwork = (track.artwork_url || track.user?.avatar_url || "").replace(
    "-large.",
    "-t500x500."
  );

  return {
    platform: "soundcloud",
    title: track.title || "SoundCloud Track",
    author: track.user?.username || "SoundCloud",
    authorAvatar: "",
    thumbnail: artwork,
    duration: track.duration ? Math.round(track.duration / 1000) : 0,
    downloads,
    stats: {},
  };
}

// sndcdn media URLs are the download hosts the proxy must allow
export const SOUNDCLOUD_MEDIA_HOSTS = ["sndcdn.com"];
