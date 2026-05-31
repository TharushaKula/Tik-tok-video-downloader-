import axios from "axios";
import type { VideoInfo, DownloadOption } from "./types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Snapsave returns an obfuscated JS payload of the form:
//   eval(function(h,u,n,t,e,r){...}( "<DATA>", <NUM>, "<KEY>", <NUM>, <NUM>, <NUM> ))
// The function decodes <DATA> into an HTML string containing the download links.
// We re-implement that decoder here in pure JS to avoid running untrusted eval.

const BASE_ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";

function fromBaseToInt(value: string, fromBase: number): number {
  const alphabet = BASE_ALPHABET.slice(0, fromBase);
  return value
    .split("")
    .reverse()
    .reduce((acc, ch, idx) => {
      const v = alphabet.indexOf(ch);
      return v === -1 ? acc : acc + v * Math.pow(fromBase, idx);
    }, 0);
}

function snapDecode(
  data: string,
  fromBase: number,
  key: string,
  shift: number,
  delimIdx: number
): string {
  let out = "";
  for (let i = 0; i < data.length; i++) {
    let token = "";
    while (i < data.length && data[i] !== key[delimIdx]) {
      token += data[i];
      i++;
    }
    if (!token) continue;
    let normalized = token;
    for (let j = 0; j < key.length; j++) {
      normalized = normalized.split(key[j]).join(String(j));
    }
    const code = fromBaseToInt(normalized, fromBase) - shift;
    if (Number.isFinite(code) && code > 0) {
      out += String.fromCharCode(code);
    }
  }
  try {
    return decodeURIComponent(escape(out));
  } catch {
    return out;
  }
}

function parseSnapEval(body: string): string | null {
  // The payload ends with: }( "<DATA>", <u>, "<KEY>", <SHIFT>, <BASE>, <unused> ))
  // Per the original decoder, the 5th arg is BOTH the source base for tokens AND
  // the index into KEY used as the token delimiter. The 2nd and 6th args are unused.
  const match = body.match(
    /}\(\s*"([^"]+)"\s*,\s*(\d+)\s*,\s*"([^"]+)"\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*\)/
  );
  if (!match) return null;
  const [, data, , key, shiftStr, baseStr] = match;
  const base = parseInt(baseStr, 10);
  return snapDecode(data, base, key, parseInt(shiftStr, 10), base);
}

interface SnapResult {
  title: string;
  thumbnail: string;
  downloads: DownloadOption[];
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const DOWNLOAD_HOST_RE =
  /rapidcdn\.app|cdninstagram\.com|fbcdn\.net|instagram\.com\/[a-z]+\/[A-Za-z0-9_-]+/i;

function parseSnapHtml(html: string): SnapResult {
  // Snapsave wraps each item in a `.download-items` block. Each contains:
  //   <img src="https://d.rapidcdn.app/thumb?..."> (thumbnail)
  //   <a href="https://d.rapidcdn.app/v2?..."> ... Download video/photo </a>
  // We extract any "Download …" anchor that points at the snapsave/IG CDN.
  const anchorRe =
    /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  const downloads: DownloadOption[] = [];
  let m: RegExpExecArray | null;
  let videoCount = 0;
  let imageCount = 0;
  while ((m = anchorRe.exec(html)) !== null) {
    const rawHref = decodeHtmlEntities(m[1]);
    const labelText = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!DOWNLOAD_HOST_RE.test(rawHref)) continue;
    if (!/download/i.test(labelText)) continue;

    const isImage =
      /photo|image/i.test(labelText) ||
      /\.jpg|\.jpeg|\.webp(?:[?&]|$)/i.test(rawHref);

    if (isImage) {
      imageCount += 1;
      const suffix = imageCount > 1 ? ` ${imageCount}` : "";
      downloads.push({
        label: `Download Image${suffix}`,
        url: rawHref,
        format: "jpg",
        quality: "HD",
        isAudio: false,
        isProxy: true,
      });
    } else {
      videoCount += 1;
      const suffix = videoCount > 1 ? ` ${videoCount}` : "";
      downloads.push({
        label: `Download HD${suffix}`,
        url: rawHref,
        format: "mp4",
        quality: "HD",
        isAudio: false,
        isProxy: true,
      });
    }
  }

  const thumbMatch = html.match(/<img[^>]+src="(https?:\/\/[^"]+)"/i);
  const titleMatch =
    html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i) ||
    html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const thumbnail = thumbMatch ? decodeHtmlEntities(thumbMatch[1]) : "";
  const title = titleMatch
    ? decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, "").trim())
    : "Instagram Video";

  return { title, thumbnail, downloads };
}

export async function fetchInstagramData(url: string): Promise<VideoInfo> {
  let body: string;
  try {
    const response = await axios.post<string>(
      "https://snapsave.app/action.php?lang=en",
      new URLSearchParams({ url }).toString(),
      {
        timeout: 20000,
        responseType: "text",
        headers: {
          "User-Agent": UA,
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: "https://snapsave.app",
          Referer: "https://snapsave.app/",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "*/*",
        },
      }
    );
    body = response.data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to reach Instagram resolver: ${err.message}`
        : "Failed to reach Instagram resolver"
    );
  }

  if (!body || typeof body !== "string") {
    throw new Error("Empty response from Instagram resolver");
  }

  if (/no se ha encontrado|not found|error|invalid/i.test(body) && body.length < 600) {
    throw new Error("Instagram post not found or unsupported");
  }

  const decoded = parseSnapEval(body);
  if (!decoded) {
    throw new Error("Could not decode Instagram response");
  }

  // Snapsave wraps the HTML inside a JS string literal, so it's escaped
  // (\" instead of ", \/ instead of /). Unescape before parsing as HTML.
  const unescaped = decoded
    .replace(/\\"/g, '"')
    .replace(/\\\//g, "/")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t");

  const { title, thumbnail, downloads } = parseSnapHtml(unescaped);

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
