import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Force Node.js runtime — Edge Runtime has no vm / crypto / fs.
export const runtime = "nodejs";

// Extend timeout: Hobby = 60 s max, Pro/Enterprise = 300 s.
export const maxDuration = 60;

/** Pull the 11-character video ID out of any standard YouTube URL. */
function extractYouTubeId(url: string): string | null {
  try {
    const p = new URL(url);
    if (p.hostname === "youtu.be") return p.pathname.slice(1).split("?")[0];
    return (
      p.searchParams.get("v") ||
      p.pathname.match(/\/(?:shorts|embed|live|v)\/([^/?#]+)/)?.[1] ||
      null
    );
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");
  const type = searchParams.get("type") || "video"; // "video" | "audio"
  const platform = searchParams.get("platform"); // "youtube" | null

  if (!videoUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // ── YouTube via youtubei.js (InnerTube API) ───────────────────────────────
  if (platform === "youtube") {
    try {
      const videoId = extractYouTubeId(videoUrl);
      if (!videoId) {
        return NextResponse.json(
          { error: "Could not extract video ID from URL" },
          { status: 400 }
        );
      }

      // Dynamic import keeps youtubei.js out of the main bundle.
      const { Innertube, Platform, ClientType } = await import("youtubei.js");

      // Patch the default stub evaluator with new Function() — a pure-JS
      // construct that requires no Node module and works in every environment.
      // YouTube's generated script ends with a bare `return`, so we wrap it
      // in an IIFE to make that legal.
      // eslint-disable-next-line no-new-func
      (Platform.shim as unknown as Record<string, unknown>).eval = async (
        data: { output: string }
      ) => new Function(`return (function(){\n${data.output}\n})()`)();

      // TV_EMBEDDED = YouTube's own embedded-player client.
      //   • Much less bot-detection scrutiny than the default WEB client.
      //   • Returns many formats as plain URLs → eval above is often skipped.
      // generate_session_locally  → no network call for the visitor/session token.
      // retrieve_innertube_config → skip POST /youtubei/v1/config which is
      //   frequently rate-limited or blocked from Vercel / AWS Lambda IPs.
      const yt = await Innertube.create({
        client_type: ClientType.TV_EMBEDDED,
        generate_session_locally: true,
        retrieve_innertube_config: false,
      });
      const info = await yt.getInfo(videoId);

      const isAudio = type === "audio";

      const stream = await info.download({
        type: isAudio ? "audio" : "video+audio",
        quality: "best",
        format: "mp4",
      });

      const filename = isAudio ? "youtube-audio.m4a" : "youtube-video.mp4";
      const contentType = isAudio ? "audio/mp4" : "video/mp4";

      // stream is already a Web ReadableStream<Uint8Array> — pass it directly
      return new NextResponse(stream as ReadableStream, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store",
        },
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to download YouTube video";
      console.error("[/api/proxy-download][youtube] Error:", message);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  // ── TikTok / CDN proxy ────────────────────────────────────────────────────
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
