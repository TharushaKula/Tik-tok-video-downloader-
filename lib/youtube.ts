import axios from "axios";
import type { TikWMResponse } from "./tikwm";

// YouTube's official oEmbed endpoint — no API key, always available.
interface OEmbedResponse {
  title: string;
  author_name: string;
  thumbnail_url: string; // always "…/hqdefault.jpg"
}

/** Extract the video ID from any common YouTube URL format. */
function extractVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    // /watch?v=, /shorts/, /embed/, /live/
    return (
      parsed.searchParams.get("v") ||
      parsed.pathname.match(/\/(?:shorts|embed|live|v)\/([^/?#]+)/)?.[1] ||
      null
    );
  } catch {
    return null;
  }
}

export async function fetchYouTubeData(url: string): Promise<TikWMResponse> {
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;

  const res = await axios.get<OEmbedResponse>(oembedUrl, { timeout: 10000 });
  const oembed = res.data;

  // Try the higher-res thumbnail; fall back to what oEmbed gave us
  const videoId = extractVideoId(url);
  const cover = videoId
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : oembed.thumbnail_url;

  return {
    platform: "youtube",
    // We store the original watch URL here.
    // The proxy-download route resolves the actual stream via Cobalt at
    // download time, so there are no expiring signed CDN URLs to worry about.
    play: url,
    hdplay: url,
    music: url,
    cover,
    title: oembed.title || "YouTube Video",
    author: {
      nickname: oembed.author_name || "Unknown Channel",
      avatar: "", // oEmbed doesn't expose channel avatars
    },
    // oEmbed doesn't provide stats; VideoCard hides zero-value stats for YouTube
    digg_count: 0,
    play_count: 0,
    share_count: 0,
    comment_count: 0,
    duration: 0,
  };
}
