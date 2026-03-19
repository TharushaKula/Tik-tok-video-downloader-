import axios from "axios";

export interface TikWMResponse {
  play: string;
  hdplay: string;
  music: string;
  cover: string;
  title: string;
  author: {
    nickname: string;
    avatar: string;
  };
  digg_count: number;
  play_count: number;
  share_count: number;
  comment_count: number;
  duration: number;
}

export async function fetchTikTokData(url: string): Promise<TikWMResponse> {
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
    play: video.play,
    hdplay: video.hdplay || video.play,
    music: video.music,
    cover: video.cover,
    title: video.title || "TikTok Video",
    author: {
      nickname: video.author?.nickname || "Unknown",
      avatar: video.author?.avatar || "",
    },
    digg_count: video.digg_count || 0,
    play_count: video.play_count || 0,
    share_count: video.share_count || 0,
    comment_count: video.comment_count || 0,
    duration: video.duration || 0,
  };
}
