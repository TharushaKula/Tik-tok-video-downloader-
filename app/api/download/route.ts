import { NextRequest, NextResponse } from "next/server";
import { detectPlatform } from "@/lib/validators";
import type { VideoInfo } from "@/lib/types";
import { fetchTikTokData } from "@/lib/tikwm";
import { fetchInstagramData } from "@/lib/instagram";
import { fetchFacebookData } from "@/lib/facebook";
import { fetchYouTubeData } from "@/lib/youtube";
import { fetchTwitterData } from "@/lib/twitter";
import { fetchRedditData } from "@/lib/reddit";
import { fetchPinterestData } from "@/lib/pinterest";
import { fetchTwitchData } from "@/lib/twitch";
import { fetchSoundCloudData } from "@/lib/soundcloud";

export const runtime = "nodejs";
export const maxDuration = 60;

// One resolver per platform, keyed by detectPlatform()'s result.
const RESOLVERS: Record<string, (url: string) => Promise<VideoInfo>> = {
  tiktok: fetchTikTokData,
  instagram: fetchInstagramData,
  facebook: fetchFacebookData,
  youtube: fetchYouTubeData,
  twitter: fetchTwitterData,
  reddit: fetchRedditData,
  pinterest: fetchPinterestData,
  twitch: fetchTwitchData,
  soundcloud: fetchSoundCloudData,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const trimmedUrl = url.trim();
    const platform = detectPlatform(trimmedUrl);
    const resolver = platform ? RESOLVERS[platform] : undefined;

    if (!resolver) {
      return NextResponse.json(
        {
          error:
            "Invalid URL. Please paste a link from a supported platform, such as TikTok, YouTube, Instagram, Twitch, or SoundCloud.",
        },
        { status: 400 }
      );
    }

    const data = await resolver(trimmedUrl);
    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    console.error("[/api/download] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
