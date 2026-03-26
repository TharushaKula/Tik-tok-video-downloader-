import axios from "axios";
import type { VideoInfo } from "./types";

export async function fetchTikTokData(url: string): Promise<VideoInfo> {
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

  const video = data.data;

  return {
    platform: "tiktok",
    title: video.title || "TikTok Video",
    author: video.author?.nickname || "Unknown",
    authorAvatar: video.author?.avatar || "",
    thumbnail: video.cover || "",
    duration: video.duration || 0,
    downloads: [
      {
        label: "Download HD",
        url: video.hdplay || video.play,
        format: "mp4",
        quality: "HD",
        isAudio: false,
        isProxy: true,
      },
      {
        label: "Download SD",
        url: video.play,
        format: "mp4",
        quality: "SD",
        isAudio: false,
        isProxy: true,
      },
      {
        label: "Download Audio",
        url: video.music,
        format: "mp3",
        isAudio: true,
        isProxy: true,
      },
    ],
    stats: {
      views: video.play_count || 0,
      likes: video.digg_count || 0,
      comments: video.comment_count || 0,
      shares: video.share_count || 0,
    },
  };
}
