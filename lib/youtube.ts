import axios from "axios";
import type { VideoInfo } from "./types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// YouTube's official oEmbed endpoint — no API key, always available.
interface OEmbedResponse {
  title: string;
  author_name: string;
  thumbnail_url: string; // always "…/hqdefault.jpg"
}

/** Extract the video ID from any common YouTube URL format. */
export function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }
    // /watch?v=, /shorts/, /embed/, /live/, /v/
    return (
      parsed.searchParams.get("v") ||
      parsed.pathname.match(/\/(?:shorts|embed|live|v)\/([^/?#]+)/)?.[1] ||
      null
    );
  } catch {
    return null;
  }
}

export async function fetchYouTubeData(url: string): Promise<VideoInfo> {
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    url
  )}&format=json`;

  // The maxres-thumbnail probe only needs the video id, so it runs in
  // parallel with the oEmbed request instead of after it. Older/low-res
  // videos only have hqdefault, where maxresdefault 404s.
  const videoId = extractYouTubeId(url);
  const maxres = videoId
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const [oembedResult, maxresResult] = await Promise.allSettled([
    axios.get<OEmbedResponse>(oembedUrl, {
      timeout: 10000,
      headers: { "User-Agent": UA },
    }),
    maxres
      ? axios.head(maxres, { timeout: 4000 })
      : Promise.reject(new Error("no video id")),
  ]);

  if (oembedResult.status === "rejected") {
    const err = oembedResult.reason;
    if (axios.isAxiosError(err) && err.response?.status === 400) {
      throw new Error("YouTube video not found or unavailable");
    }
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      throw new Error("This YouTube video is private or embedding-restricted");
    }
    throw new Error(
      err instanceof Error
        ? `Failed to fetch YouTube video info: ${err.message}`
        : "Failed to fetch YouTube video info"
    );
  }

  const oembed = oembedResult.value.data;
  const thumbnail =
    maxresResult.status === "fulfilled" && maxres
      ? maxres
      : oembed.thumbnail_url || "";

  // The urls here are the original watch URL: the proxy-download route
  // resolves the actual stream at download time, so there are no expiring
  // CDN links to go stale while the user looks at the options.
  return {
    platform: "youtube",
    title: oembed.title || "YouTube Video",
    author: oembed.author_name || "YouTube",
    authorAvatar: "",
    thumbnail,
    duration: 0,
    downloads: [
      {
        label: "Download Full HD",
        url,
        format: "mp4",
        quality: "1080p",
        isAudio: false,
        isProxy: true,
      },
      {
        label: "Download HD",
        url,
        format: "mp4",
        quality: "720p",
        isAudio: false,
        isProxy: true,
      },
      {
        label: "Download SD",
        url,
        format: "mp4",
        quality: "360p",
        isAudio: false,
        isProxy: true,
      },
      {
        label: "Download Audio",
        url,
        format: "mp3",
        isAudio: true,
        isProxy: true,
      },
    ],
    stats: {},
  };
}

// ── Download resolution via loader.to (ddownr) ──────────────────────────────
// loader.to runs a public conversion API (see video-download-api.com): start a
// job with the watch URL + format, then poll the returned progress endpoint
// until it hands back a direct CDN download link. The link streams while the
// conversion finishes, so it usually appears within a few seconds.

interface LoaderJobResponse {
  success: boolean;
  id?: string;
  progress_url?: string;
  content?: string;
}

interface LoaderProgressResponse {
  success?: number | boolean;
  progress?: number;
  download_url?: string | null;
  text?: string;
}

export type YouTubeFormat = "1080" | "720" | "360" | "mp3";

function assertSafeProgressUrl(raw: string): URL {
  const parsed = new URL(raw);
  if (parsed.protocol !== "https:") {
    throw new Error("Unexpected progress URL from YouTube resolver");
  }
  // Reject IP literals / local hosts — the URL must be a public domain.
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(parsed.hostname) ||
      /^\d+\.\d+\.\d+\.\d+$/.test(parsed.hostname)) {
    throw new Error("Unexpected progress URL from YouTube resolver");
  }
  return parsed;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Kick off a conversion job and return the resolver's progress URL.
 * The caller polls it (server- or client-side) until download_url appears.
 */
export async function startLoaderJob(
  url: string,
  format: YouTubeFormat
): Promise<string> {
  let job: LoaderJobResponse;
  try {
    const res = await axios.get<LoaderJobResponse>(
      "https://loader.to/ajax/download.php",
      {
        params: { format, url },
        timeout: 30000,
        headers: { "User-Agent": UA },
      }
    );
    job = res.data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to reach YouTube resolver: ${err.message}`
        : "Failed to reach YouTube resolver"
    );
  }

  if (!job?.success || (!job.progress_url && !job.id)) {
    throw new Error(
      "YouTube resolver rejected the video. It may be private, age-restricted, or region-locked."
    );
  }

  return assertSafeProgressUrl(
    job.progress_url || `https://p.oceansaver.in/ajax/progress.php?id=${job.id}`
  ).toString();
}

export async function resolveYouTubeDownload(
  url: string,
  format: YouTubeFormat,
  budgetMs = 270000
): Promise<string> {
  const started = Date.now();
  const progressUrl = new URL(await startLoaderJob(url, format));

  while (Date.now() - started < budgetMs) {
    await sleep(3000);
    let progress: LoaderProgressResponse;
    try {
      const res = await axios.get<LoaderProgressResponse>(progressUrl.toString(), {
        timeout: 15000,
        headers: { "User-Agent": UA },
      });
      progress = res.data;
    } catch {
      continue; // transient poll failure — try again within the budget
    }

    if (typeof progress?.download_url === "string" &&
        progress.download_url.startsWith("https://")) {
      return progress.download_url;
    }

    if (/error|fail/i.test(progress?.text || "")) {
      throw new Error(
        `YouTube conversion failed: ${progress.text || "unknown error"}`
      );
    }
  }

  throw new Error(
    "YouTube conversion timed out. Try a lower quality or a shorter video."
  );
}
