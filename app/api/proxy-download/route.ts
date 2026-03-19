import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");
  const type = searchParams.get("type") || "video"; // "video" | "audio"

  if (!videoUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Basic allowlist — only stream from tikwm CDN domains
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(videoUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const allowedSuffixes = [
    "tikwm.com",
    "tiktok.com",
    "tiktokcdn.com",
    "tiktokcdn-us.com",
    "tiktokv.com",
  ];
  const isAllowed = allowedSuffixes.some(
    (suffix) =>
      parsedUrl.hostname === suffix ||
      parsedUrl.hostname.endsWith("." + suffix)
  );
  if (!isAllowed) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  try {
    const upstream = await axios.get(videoUrl, {
      responseType: "stream",
      timeout: 30000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://www.tiktok.com/",
      },
    });

    const contentType =
      upstream.headers["content-type"] ||
      (type === "audio" ? "audio/mpeg" : "video/mp4");
    const filename =
      type === "audio" ? "tiktok-audio.mp3" : "tiktok-video.mp4";

    // Convert Node.js stream to Web ReadableStream
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
