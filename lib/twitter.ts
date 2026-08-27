import axios from "axios";
import type { VideoInfo, DownloadOption } from "./types";
import { decodeHtmlEntities } from "./snapsave";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const BASE = "https://twitterdownloader.snapsave.app";

const TWITTER_HOST_RE = /rapidcdn\.app|snapcdn\.app|twimg\.com/i;

interface TwitterActionResponse {
  error: boolean;
  data?: string;
  message?: string | null;
}

function parseTwitterHtml(html: string): {
  title: string;
  author: string;
  thumbnail: string;
  downloads: DownloadOption[];
} {
  const anchorRe = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  const downloads: DownloadOption[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  let imageCount = 0;

  while ((m = anchorRe.exec(html)) !== null) {
    const href = decodeHtmlEntities(m[1]);
    const label = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!TWITTER_HOST_RE.test(href)) continue;
    if (!/download/i.test(label)) continue;
    if (seen.has(href)) continue;
    seen.add(href);

    if (/gif/i.test(label)) {
      downloads.push({
        label: "Download GIF",
        url: href,
        format: "gif",
        quality: "HD",
        isAudio: false,
        isProxy: true,
      });
    } else if (/photo|image/i.test(label) || /\.(jpe?g|png|webp)(\?|$)/i.test(href)) {
      imageCount += 1;
      const suffix = imageCount > 1 ? ` ${imageCount}` : "";
      downloads.push({
        label: `Download Image${suffix}`,
        url: href,
        format: "jpg",
        quality: "HD",
        isAudio: false,
        isProxy: true,
      });
    } else {
      downloads.push({
        label: "Download Video",
        url: href,
        format: "mp4",
        quality: "HD",
        isAudio: false,
        isProxy: true,
      });
    }
  }

  const thumbMatch = html.match(/<img[^>]+src="(https?:\/\/[^"]+)"/i);
  const titleMatch = html.match(/<p>\s*<span>([\s\S]*?)<\/span>\s*<\/p>/i);
  const authorMatch =
    html.match(/itemprop="name"[\s\S]*?title="([^"]+)"/i) ||
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

  const title = titleMatch
    ? decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, "").trim())
    : "";
  const author = authorMatch
    ? decodeHtmlEntities(authorMatch[1].replace(/<[^>]+>/g, "").trim())
    : "";

  return {
    // Strip the trailing t.co share link X appends to tweet text
    title: title.replace(/\s*https:\/\/t\.co\/\S+\s*$/, "").trim() || "X post",
    author: author || "X (Twitter)",
    thumbnail: thumbMatch ? decodeHtmlEntities(thumbMatch[1]) : "",
    downloads,
  };
}

export async function fetchTwitterData(url: string): Promise<VideoInfo> {
  // The resolver issues a short-lived form token tied to the session cookie,
  // so grab both from the homepage right before resolving.
  let token: string | undefined;
  let cookies = "";
  try {
    // Request /en2 directly  the root 301s there, and axios would drop
    // any Set-Cookie from the intermediate hop.
    const home = await axios.get<string>(`${BASE}/en2`, {
      timeout: 15000,
      responseType: "text",
      headers: { "User-Agent": UA, Accept: "text/html" },
    });
    token = home.data.match(/name="token" value="([^"]+)"/)?.[1];
    cookies = (home.headers["set-cookie"] ?? [])
      .map((c: string) => c.split(";")[0])
      .join("; ");
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to reach X resolver: ${err.message}`
        : "Failed to reach X resolver"
    );
  }
  if (!token) {
    throw new Error("X resolver is temporarily unavailable");
  }

  let body: TwitterActionResponse;
  try {
    const res = await axios.post<TwitterActionResponse>(
      `${BASE}/action.php`,
      new URLSearchParams({ url, token }).toString(),
      {
        timeout: 20000,
        headers: {
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: BASE,
          Referer: `${BASE}/en2`,
          "X-Requested-With": "XMLHttpRequest",
          Accept: "*/*",
          ...(cookies ? { Cookie: cookies } : {}),
        },
      }
    );
    body = res.data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to reach X resolver: ${err.message}`
        : "Failed to reach X resolver"
    );
  }

  if (!body || body.error || typeof body.data !== "string") {
    throw new Error(
      body?.message ||
        "Post not found. It may be deleted, private, or contain no video."
    );
  }

  const { title, author, thumbnail, downloads } = parseTwitterHtml(body.data);

  if (downloads.length === 0) {
    throw new Error(
      "No downloadable media found in that post. It may be private or text-only."
    );
  }

  return {
    platform: "twitter",
    title,
    author,
    authorAvatar: "",
    thumbnail,
    duration: 0,
    downloads,
    stats: {},
  };
}
