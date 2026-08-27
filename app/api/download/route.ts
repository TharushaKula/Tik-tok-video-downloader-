import { NextRequest, NextResponse } from "next/server";
import { detectPlatform } from "@/lib/validators";
import { fetchTikTokData } from "@/lib/tikwm";
import { fetchInstagramData } from "@/lib/instagram";
import { fetchFacebookData } from "@/lib/facebook";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const trimmedUrl = url.trim();
    const platform = detectPlatform(trimmedUrl);

    if (!platform) {
      return NextResponse.json(
        {
          error:
            "Invalid URL. Please enter a valid TikTok, Instagram, or Facebook link.",
        },
        { status: 400 }
      );
    }

    const data =
      platform === "tiktok"
        ? await fetchTikTokData(trimmedUrl)
        : platform === "instagram"
        ? await fetchInstagramData(trimmedUrl)
        : await fetchFacebookData(trimmedUrl);

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    console.error("[/api/download] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
