import axios from "axios";
import type { VideoInfo, DownloadOption } from "./types";

interface TikWMVideo {
  title?: string;
  author?: { nickname?: string; avatar?: string };
  cover?: string;
  duration?: number;
  play?: string;
  hdplay?: string;
  music?: string;
  /** Present (non-empty) for photo/slideshow posts */
  images?: string[];
  play_count?: number;
  digg_count?: number;
  comment_count?: number;
  share_count?: number;
}

/**
 * Turn a raw TikWM payload into our VideoInfo. Exported so the photo-post
 * branch can be unit-tested without hitting the live API.
 */
export function mapTikTokResponse(video: TikWMVideo): VideoInfo {
  const images = Array.isArray(video.images) ? video.images : [];
  const isPhotoPost = images.length > 0;

  let downloads: DownloadOption[];
  if (isPhotoPost) {
    // Photo/slideshow post: every slide as an image, plus the soundtrack.
    downloads = images.map((img, i) => ({
      label: images.length > 1 ? `Download Image ${i + 1}` : "Download Image",
      url: img,
      format: "jpg",
      quality: "HD",
      isAudio: false,
      isProxy: true,
    }));
    if (video.music) {
      downloads.push({
        label: "Download Audio",
        url: video.music,
        format: "mp3",
        isAudio: true,
        isProxy: true,
      });
    }
  } else {
    downloads = [
      {
        label: "Download HD",
        url: video.hdplay || video.play || "",
        format: "mp4",
        quality: "HD",
        isAudio: false,
        isProxy: true,
      },
      {
        label: "Download SD",
        url: video.play || "",
        format: "mp4",
        quality: "SD",
        isAudio: false,
        isProxy: true,
      },
      {
        label: "Download Audio",
        url: video.music || "",
        format: "mp3",
        isAudio: true,
        isProxy: true,
      },
    ].filter((d) => d.url);
  }

  return {
    platform: "tiktok",
    title:
      video.title || (isPhotoPost ? "TikTok Photo Post" : "TikTok Video"),
    author: video.author?.nickname || "Unknown",
    authorAvatar: video.author?.avatar || "",
    thumbnail: video.cover || (isPhotoPost ? images[0] : "") || "",
    duration: video.duration || 0,
    downloads,
    stats: {
      views: video.play_count || 0,
      likes: video.digg_count || 0,
      comments: video.comment_count || 0,
      shares: video.share_count || 0,
    },
  };
}

async function fetchViaTikwm(url: string): Promise<VideoInfo> {
  const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;

  const response = await axios.get(apiUrl, {
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  const { data } = response;

  if (!data || data.code !== 0 || !data.data) {
    throw new Error(data?.msg || "Failed to fetch video data from TikWM API");
  }

  return mapTikTokResponse(data.data as TikWMVideo);
}

export async function fetchTikTokData(url: string): Promise<VideoInfo> {
  try {
    return await fetchViaTikwm(url);
  } catch (primaryErr) {
    // Resolver fallback chain: TikWM → SnapTik. The secondary offers fewer
    // options (single HD file) but keeps TikTok working when TikWM is down.
    try {
      const { fetchTikTokViaSnaptik } = await import("./snaptik");
      return await fetchTikTokViaSnaptik(url);
    } catch {
      // Surface the primary resolver's error — it's usually more specific
      // ("video not found") than the fallback's.
      throw primaryErr;
    }
  }
}
