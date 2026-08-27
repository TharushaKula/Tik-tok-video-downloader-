import axios from "axios";
import type { VideoInfo, DownloadOption } from "./types";
import { decodeHtmlEntities } from "./snapsave";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Reddit aggressively blocks server-side API access, so posts resolve through
// RapidSave, which also muxes Reddit's separate video and audio tracks into a
// single playable MP4 (served from sd.rapidsave.com).
export async function fetchRedditData(url: string): Promise<VideoInfo> {
  let html: string;
  try {
    const res = await axios.get<string>("https://rapidsave.com/info", {
      params: { url },
      timeout: 25000,
      responseType: "text",
      headers: { "User-Agent": UA, Accept: "text/html" },
    });
    html = res.data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to reach Reddit resolver: ${err.message}`
        : "Failed to reach Reddit resolver"
    );
  }

  const downloads: DownloadOption[] = [];
  const seen = new Set<string>();
  const anchorRe =
    /<a[^>]+href="(https:\/\/sd\.rapidsave\.com\/download\.php[^"]+)"[^>]*>([\s\S]{0,160}?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = anchorRe.exec(html)) !== null) {
    const href = decodeHtmlEntities(m[1]);
    if (seen.has(href)) continue;
    seen.add(href);
    const label = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const isAudio = /audio|mp3/i.test(label);
    const isHd = /hd|720|1080/i.test(label);
    downloads.push({
      label: isAudio ? "Download Audio" : isHd ? "Download HD" : "Download SD",
      url: href,
      format: isAudio ? "mp3" : "mp4",
      quality: isAudio ? undefined : isHd ? "HD" : "SD",
      isAudio,
      isProxy: true,
    });
  }

  if (downloads.length === 0) {
    if (/removed|deleted|private|no video/i.test(html)) {
      throw new Error("Post not found, removed, or it contains no video.");
    }
    throw new Error(
      "No downloadable video found in that post. Image and text posts aren't supported yet."
    );
  }

  const titleMatch = html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
  const title = titleMatch
    ? decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, "").trim())
    : "";

  // Subreddit name from the original post link on the page
  const subMatch = html.match(/reddit\.com\/(r\/[A-Za-z0-9_]+)\//i);

  return {
    platform: "reddit",
    title: title || "Reddit Video",
    author: subMatch ? subMatch[1] : "Reddit",
    authorAvatar: "",
    thumbnail: "",
    duration: 0,
    downloads,
    stats: {},
  };
}
