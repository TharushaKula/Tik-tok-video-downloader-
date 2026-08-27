import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { MAX_BATCH_SIZE } from "@/lib/validators";

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
    const res = await axios.get<string>(
      `https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`,
      {
        timeout: 15000,
        responseType: "text",
        headers: { "User-Agent": "Mozilla/5.0" },
      }
    );
    const xml = res.data;

    const videoIds = Array.from(
      xml.matchAll(/<yt:videoId>([A-Za-z0-9_-]{6,20})<\/yt:videoId>/g),
      (m) => m[1]
    );
    const title = xml.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";

    if (videoIds.length === 0) {
      return NextResponse.json(
        { error: "That playlist is empty, private, or doesn't exist." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      title,
      urls: videoIds
        .slice(0, MAX_BATCH_SIZE)
        .map((v) => `https://www.youtube.com/watch?v=${v}`),
      total: videoIds.length,
    });
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
