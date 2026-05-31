import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs";
export const maxDuration = 60;

const TIKTOK_HOSTS = [
  "tikwm.com",
  "tiktok.com",
  "tiktokcdn.com",
  "tiktokcdn-us.com",
  "tiktokv.com",
];

const INSTAGRAM_HOSTS = [
  "cdninstagram.com",
  "fbcdn.net",
  "instagram.com",
  "rapidcdn.app",
  "snapsave.app",
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
  // const platform = searchParams.get("platform") || "tiktok";
  const format = searchParams.get("format") || "";

  if (!videoUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(videoUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const isTikTok = matchHost(parsedUrl.hostname, TIKTOK_HOSTS);
  const isInstagram = matchHost(parsedUrl.hostname, INSTAGRAM_HOSTS);

  if (!isTikTok && !isInstagram) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  const referer = isInstagram
    ? "https://www.instagram.com/"
    : "https://www.tiktok.com/";

  const platformLabel = isInstagram ? "instagram" : "tiktok";
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
    const upstream = await axios.get(videoUrl, {
      responseType: "stream",
      timeout: 30000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: referer,
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

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to proxy download";
    console.error("[/api/proxy-download] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
