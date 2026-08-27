import { NextRequest, NextResponse } from "next/server";
import { isValidYouTubeUrl } from "@/lib/validators";
import { startLoaderJob, type YouTubeFormat } from "@/lib/youtube";

export const runtime = "nodejs";
export const maxDuration = 60;

const VALID_FORMATS = new Set([
  "1080",
  "720",
  "360",
  "mp3",
  "m4a",
  "wav",
  "flac",
]);

// Starts a YouTube conversion job and hands the resolver's progress URL to
// the client, which polls it directly (the resolver is CORS-open). Keeps
// long conversions off our serverless functions entirely.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const url = typeof body?.url === "string" ? body.url.trim() : "";
    const format = typeof body?.format === "string" ? body.format : "";

    if (!url || !isValidYouTubeUrl(url)) {
      return NextResponse.json(
        { error: "A valid YouTube link is required" },
        { status: 400 }
      );
    }
    if (!VALID_FORMATS.has(format)) {
      return NextResponse.json({ error: "Invalid format" }, { status: 400 });
    }

    const progressUrl = await startLoaderJob(url, format as YouTubeFormat);
    return NextResponse.json({ success: true, progressUrl });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to start the conversion";
    console.error("[/api/youtube/start] Error:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
