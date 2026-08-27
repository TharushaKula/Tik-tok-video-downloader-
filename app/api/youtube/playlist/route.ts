import { NextRequest, NextResponse } from "next/server";
import { fetchYouTubeFeed } from "@/lib/youtube";

export const runtime = "nodejs";
export const maxDuration = 30;

// Resolves a playlist to its videos via YouTube's official RSS feed
// no API key, no scraping. The feed carries the playlist's most recent
// entries (up to 15); we cap at the batch limit.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("list") || "";

  if (!/^[A-Za-z0-9_-]{10,60}$/.test(id)) {
    return NextResponse.json({ error: "Invalid playlist id" }, { status: 400 });
  }

  try {
    const feed = await fetchYouTubeFeed("playlist_id", id);
    if (feed.total === 0) {
      return NextResponse.json(
        { error: "That playlist is empty, private, or doesn't exist." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, ...feed });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to load the playlist";
    console.error("[/api/youtube/playlist] Error:", message);
    return NextResponse.json(
      { error: "Couldn't load that playlist. It may be private." },
      { status: 502 }
    );
  }
}
