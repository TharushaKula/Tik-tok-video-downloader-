import type { VideoInfo, DownloadOption } from "./types";
import {
  fetchSnapsaveHtml,
  parseSnapHtml,
  sanitizeTitle,
  decodeHtmlEntities,
  DOWNLOAD_HOST_RE,
} from "./snapsave";

// Snapsave only accepts www.facebook.com and fb.watch hosts, so rewrite
// the FB-owned aliases (facebook.com, fb.com, mbasic.facebook.com) to www.
function normalizeFacebookUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    if (
      host === "facebook.com" ||
      host === "fb.com" ||
      host === "www.fb.com" ||
      host === "mbasic.facebook.com"
    ) {
      parsed.hostname = "www.facebook.com";
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}

// Facebook results from Snapsave usually come back as a quality table:
//   <tr><td>720p (HD)</td><td>...</td><td><a href="https://...">Download</a></td></tr>
// Some rows expose a render-on-demand button instead of a direct link  those
// have no http(s) href and are skipped.
function parseFacebookTable(html: string): DownloadOption[] {
  const downloads: DownloadOption[] = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let row: RegExpExecArray | null;
  while ((row = rowRe.exec(html)) !== null) {
    const rowHtml = row[1];
    const hrefMatch = rowHtml.match(/<a[^>]+href="(https?:\/\/[^"]+)"/i);
    if (!hrefMatch) continue;
    const url = decodeHtmlEntities(hrefMatch[1]);
    if (!DOWNLOAD_HOST_RE.test(url)) continue;

    const cellMatch = rowHtml.match(/<td[^>]*>([\s\S]*?)<\/td>/i);
    const qualityText = cellMatch
      ? cellMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : "";
    const isHd = /hd|720|1080/i.test(qualityText);

    downloads.push({
      label: isHd ? "Download HD" : "Download SD",
      url,
      format: "mp4",
      quality: qualityText || (isHd ? "HD" : "SD"),
      isAudio: false,
      isProxy: true,
    });
  }
  // HD first
  return downloads.sort(
    (a, b) => Number(/hd/i.test(b.label)) - Number(/hd/i.test(a.label))
  );
}

export async function fetchFacebookData(url: string): Promise<VideoInfo> {
  const html = await fetchSnapsaveHtml(normalizeFacebookUrl(url), "Facebook");

  const tableDownloads = parseFacebookTable(html);
  const { title: genericTitle, thumbnail, downloads: anchorDownloads } =
    parseSnapHtml(html, "Facebook Video");

  // The table layout carries the caption in a dedicated element.
  const desMatch = html.match(
    /<span[^>]*class="[^"]*video-des[^"]*"[^>]*>([\s\S]*?)<\/span>/i
  );
  const title = desMatch
    ? sanitizeTitle(
        decodeHtmlEntities(desMatch[1].replace(/<[^>]+>/g, "").trim()),
        genericTitle
      )
    : genericTitle;

  // Table rows carry quality labels, so they win; anchors fill in anything
  // the table missed. Dedupe by URL since table rows also contain anchors.
  const seen = new Set<string>();
  const downloads = [...tableDownloads, ...anchorDownloads].filter((d) => {
    if (seen.has(d.url)) return false;
    seen.add(d.url);
    return true;
  });

  if (downloads.length === 0) {
    throw new Error(
      "No downloadable media found. The video may be private or login-required."
    );
  }

  return {
    platform: "facebook",
    title,
    author: "Facebook",
    authorAvatar: "",
    thumbnail,
    duration: 0,
    downloads,
    stats: {},
  };
}
