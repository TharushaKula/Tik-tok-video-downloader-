import axios from "axios";
import type { VideoInfo, DownloadOption } from "./types";
import { decodeHtmlEntities } from "./snapsave";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Pinterest pin pages are public server-rendered HTML with the video/image
// variants embedded as JSON — no third-party resolver needed. pin.it short
// links redirect to the full pin URL and axios follows them.
export async function fetchPinterestData(url: string): Promise<VideoInfo> {
  let html: string;
  try {
    const res = await axios.get<string>(url, {
      timeout: 20000,
      responseType: "text",
      maxRedirects: 5,
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    html = res.data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to reach Pinterest: ${err.message}`
        : "Failed to reach Pinterest"
    );
  }

  if (!html || typeof html !== "string") {
    throw new Error("Empty response from Pinterest");
  }

  const downloads: DownloadOption[] = [];

  // Video pins: pick the 720p rendition when present, else any MP4 variant
  const videoUrls = Array.from(
    new Set(html.match(/https:\/\/v1?\.pinimg\.com\/videos\/[^"\\\s]+?\.mp4/g) ?? [])
  );
  const bestVideo =
    videoUrls.find((u) => /\/720p\//i.test(u)) || videoUrls[0] || null;
  if (bestVideo) {
    downloads.push({
      label: "Download Video",
      url: decodeHtmlEntities(bestVideo),
      format: "mp4",
      quality: /\/720p\//i.test(bestVideo) ? "720p" : "SD",
      isAudio: false,
      isProxy: true,
    });
  }

  // Image pins (or the poster for video pins): prefer the original file
  const original = html.match(
    /https:\/\/i\.pinimg\.com\/originals\/[^"\\\s]+?\.(?:jpg|jpeg|png|webp|gif)/i
  )?.[0];
  const sized = html.match(
    /https:\/\/i\.pinimg\.com\/\d+x\/[^"\\\s]+?\.(?:jpg|jpeg|png|webp)/i
  )?.[0];
  const bestImage =
    original || (sized ? sized.replace(/\/\d+x\//, "/736x/") : null);

  if (!bestVideo && bestImage) {
    downloads.push({
      label: "Download Image",
      url: decodeHtmlEntities(bestImage),
      format: "jpg",
      quality: "HD",
      isAudio: false,
      isProxy: true,
    });
  }

  if (downloads.length === 0) {
    throw new Error(
      "No downloadable media found on that pin. It may be private or removed."
    );
  }

  // "<pin title> [Video] | suggestions…" → keep just the pin title
  const rawTitle = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  const title = decodeHtmlEntities(rawTitle)
    .split("|")[0]
    .replace(/\[video\]/i, "")
    .trim();

  return {
    platform: "pinterest",
    title: title || "Pinterest Pin",
    author: "Pinterest",
    authorAvatar: "",
    thumbnail: bestImage ? decodeHtmlEntities(bestImage) : "",
    duration: 0,
    downloads,
    stats: {},
  };
}
