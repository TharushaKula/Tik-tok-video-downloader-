import { NextRequest, NextResponse } from "next/server";
import { extractYouTubeChannelRef } from "@/lib/validators";
import { fetchYouTubeFeed, resolveYouTubeChannelId } from "@/lib/youtube";

export const runtime = "nodejs";
export const maxDuration = 30;

// Resolves a channel URL (handle / custom / user / channel id) to its latest
// uploads via YouTube's official RSS feed. Handles are resolved to a UC id by
// scraping the channel page first.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = (searchParams.get("url") || "").trim();

  const ref = extractYouTubeChannelRef(url);
  if (!ref) {
    return NextResponse.json(
      { error: "That isn't a YouTube channel link." },
      { status: 400 }
    );
  }

  try {
    const channelId: string | null =
      ref.kind === "id" ? ref.value : await resolveYouTubeChannelId(ref.value);

    if (!channelId) {
      return NextResponse.json(
        { error: "Couldn't find that channel. Check the link and try again." },
        { status: 404 }
      );
    }

    const feed = await fetchYouTubeFeed("channel_id", channelId);
    if (feed.total === 0) {
      return NextResponse.json(
        { error: "That channel has no public uploads." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, ...feed });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to load the channel";
    console.error("[/api/youtube/channel] Error:", message);
    return NextResponse.json(
      { error: "Couldn't load that channel. It may be private or unavailable." },
      { status: 502 }
    );
  }
}
