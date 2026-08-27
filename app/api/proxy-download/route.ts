import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { isValidYouTubeUrl } from "@/lib/validators";
import { resolveYouTubeDownload, type YouTubeFormat } from "@/lib/youtube";

export const runtime = "nodejs";
// YouTube conversions run server-side at the resolver and can take a few
// minutes for long HD videos, so give this route the full budget.
export const maxDuration = 300;

const TIKTOK_HOSTS = [
  "tikwm.com",
  "tiktok.com",
  "tiktokcdn.com",
  "tiktokcdn-us.com",
  "tiktokv.com",
];

// Instagram, Facebook, and X downloads all resolve through the Snapsave
// family of services, so they share one set of CDN hosts (fbcdn.net serves
// both Meta platforms; rapidcdn tokens front the rest).
const SNAP_MEDIA_HOSTS = [
  "cdninstagram.com",
  "fbcdn.net",
  "instagram.com",
  "facebook.com",
  "rapidcdn.app",
  "snapcdn.app",
  "snapsave.app",
  "twimg.com",
];

function matchHost(hostname: string, suffixes: string[]): boolean {
  return suffixes.some(
    (suffix) => hostname === suffix || hostname.endsWith("." + suffix)
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");
  const type = searchParams.get("type") || "video";
  const requestedPlatform = searchParams.get("platform");
  const format = searchParams.get("format") || "";
  const quality = searchParams.get("quality") || "";
  // inline=1 serves the file for in-page playback instead of download
  const inline = searchParams.get("inline") === "1";

  if (!videoUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // ── YouTube: resolve via loader.to, then hand the browser the CDN link ────
  // The stored option URL is the original watch URL; the conversion job is
  // started only when the user actually clicks download. Redirecting (rather
  // than proxying) keeps multi-GB files off this function entirely.
  if (requestedPlatform === "youtube") {
    if (!isValidYouTubeUrl(videoUrl)) {
      return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
    }
    const ytFormat: YouTubeFormat =
      type === "audio"
        ? "mp3"
        : quality === "1080p"
        ? "1080"
        : quality === "720p"
        ? "720"
        : "360";
    try {
      const downloadUrl = await resolveYouTubeDownload(videoUrl, ytFormat);
      return NextResponse.redirect(downloadUrl, 302);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to resolve YouTube video";
      console.error("[/api/proxy-download][youtube] Error:", message);
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(videoUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const isTikTok = matchHost(parsedUrl.hostname, TIKTOK_HOSTS);
  const isSnapMedia = matchHost(parsedUrl.hostname, SNAP_MEDIA_HOSTS);

  if (!isTikTok && !isSnapMedia) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  // The shared CDN hosts can't distinguish the Snapsave-family platforms,
  // so trust the client's platform hint there (it only affects referer and
  // filename).
  const platformLabel = isTikTok
    ? "tiktok"
    : requestedPlatform === "facebook" || requestedPlatform === "twitter"
    ? requestedPlatform
    : "instagram";

  const referer =
    platformLabel === "facebook"
      ? "https://www.facebook.com/"
      : platformLabel === "twitter"
      ? "https://x.com/"
      : platformLabel === "instagram"
      ? "https://www.instagram.com/"
      : "https://www.tiktok.com/";
  let ext: string;
  let defaultContentType: string;
  if (type === "audio") {
    ext = "mp3";
    defaultContentType = "audio/mpeg";
  } else if (format === "jpg" || type === "image") {
    ext = "jpg";
    defaultContentType = "image/jpeg";
  } else {
    ext = "mp4";
    defaultContentType = "video/mp4";
  }
  const filename = `${platformLabel}-${type}.${ext}`;

  try {
    // Forward Range requests so in-page video previews can seek
    const range = req.headers.get("range");
    const upstream = await axios.get(videoUrl, {
      responseType: "stream",
      timeout: 30000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: referer,
        ...(range ? { Range: range } : {}),
      },
    });

    const contentType = upstream.headers["content-type"] || defaultContentType;

    const nodeStream: NodeJS.ReadableStream = upstream.data;
    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on("data", (chunk: Buffer) => controller.enqueue(chunk));
        nodeStream.on("end", () => controller.close());
        nodeStream.on("error", (err) => controller.error(err));
      },
    });

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename}"`,
      "Cache-Control": "no-store",
    };
    for (const h of ["content-range", "accept-ranges", "content-length"]) {
      const v = upstream.headers[h];
      if (typeof v === "string" && v) headers[h] = v;
    }

    return new NextResponse(webStream, {
      status: upstream.status === 206 ? 206 : 200,
      headers,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to proxy download";
    console.error("[/api/proxy-download] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
