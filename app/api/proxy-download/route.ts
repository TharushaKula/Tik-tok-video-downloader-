import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { isValidYouTubeUrl } from "@/lib/validators";
import { resolveYouTubeDownload, type YouTubeFormat } from "@/lib/youtube";
import {
  TIKTOK_HOSTS,
  MEDIA_HOSTS,
  HINTABLE_PLATFORMS,
  REFERERS,
  matchHost,
  sanitizeFilename,
} from "@/lib/proxy-hosts";

export const runtime = "nodejs";
// YouTube conversions run server-side at the resolver and can take a few
// minutes for long HD videos, so give this route the full budget.
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");
  const type = searchParams.get("type") || "video";
  const requestedPlatform = searchParams.get("platform");
  const format = searchParams.get("format") || "";
  const quality = searchParams.get("quality") || "";
  // inline=1 serves the file for in-page playback instead of download
  const inline = searchParams.get("inline") === "1";
  // Optional human-readable filename (video title), sanitized server-side
  const requestedName = searchParams.get("filename") || "";

  if (!videoUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // ── YouTube: resolve via loader.to, then hand the browser the CDN link ────
  // The stored option URL is the original watch URL; the conversion job is
  // started only when the user actually clicks download. Redirecting (rather
  // than proxying) keeps multi-GB files off this function entirely.
  // (Thumbnails are plain images and fall through to the media proxy below.)
  if (requestedPlatform === "youtube" && type !== "image") {
    if (!isValidYouTubeUrl(videoUrl)) {
      return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
    }
    const AUDIO_FORMATS = new Set(["mp3", "m4a", "wav", "flac"]);
    const ytFormat: YouTubeFormat =
      type === "audio"
        ? ((AUDIO_FORMATS.has(format) ? format : "mp3") as YouTubeFormat)
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
  const isMedia = matchHost(parsedUrl.hostname, MEDIA_HOSTS);

  if (!isTikTok && !isMedia) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  // Shared CDN hosts can't identify the platform on their own, so trust the
  // client's hint there (it only affects referer and filename).
  const platformLabel = isTikTok
    ? "tiktok"
    : requestedPlatform && HINTABLE_PLATFORMS.has(requestedPlatform)
    ? requestedPlatform
    : "instagram";

  const referer = REFERERS[platformLabel] ?? "https://www.tiktok.com/";
  const AUDIO_EXT_TYPES: Record<string, string> = {
    mp3: "audio/mpeg",
    m4a: "audio/mp4",
    wav: "audio/wav",
    flac: "audio/flac",
  };
  let ext: string;
  let defaultContentType: string;
  if (type === "audio") {
    ext = format in AUDIO_EXT_TYPES ? format : "mp3";
    defaultContentType = AUDIO_EXT_TYPES[ext];
  } else if (format === "jpg" || type === "image") {
    ext = "jpg";
    defaultContentType = "image/jpeg";
  } else {
    ext = "mp4";
    defaultContentType = "video/mp4";
  }
  const filename = `${sanitizeFilename(
    requestedName,
    `${platformLabel}-${type}`
  )}.${ext}`;

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

    // axios types headers as a broad union; coerce to a string for our use.
    const rawContentType = upstream.headers["content-type"];
    const contentType =
      typeof rawContentType === "string" ? rawContentType : defaultContentType;

    const nodeStream: NodeJS.ReadableStream = upstream.data;
    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on("data", (chunk: Buffer) => controller.enqueue(chunk));
        nodeStream.on("end", () => controller.close());
        nodeStream.on("error", (err) => controller.error(err));
      },
    });

    // Header values must be Latin-1: ASCII fallback + RFC 5987 UTF-8 name
    const asciiName =
      filename.replace(/[^\x20-\x7e]/g, "").replace(/"/g, "").trim() ||
      `${platformLabel}-${type}.${ext}`;
    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
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
