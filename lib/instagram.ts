import type { VideoInfo } from "./types";
import { fetchSnapsaveHtml, parseSnapHtml } from "./snapsave";

export async function fetchInstagramData(url: string): Promise<VideoInfo> {
  const html = await fetchSnapsaveHtml(url, "Instagram");
  const { title, thumbnail, downloads } = parseSnapHtml(html, "Instagram Video");

  if (downloads.length === 0) {
    throw new Error(
      "No downloadable media found. The post may be private or login-required."
    );
  }

  return {
    platform: "instagram",
    title,
    author: "Instagram",
    authorAvatar: "",
    thumbnail,
    duration: 0,
    downloads,
    stats: {},
  };
}
