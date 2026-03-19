import { NextRequest, NextResponse } from "next/server";
import { isValidTikTokUrl } from "@/lib/validators";
import { fetchTikTokData } from "@/lib/tikwm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const trimmedUrl = url.trim();

    if (!isValidTikTokUrl(trimmedUrl)) {
      return NextResponse.json(
        { error: "Invalid TikTok URL. Please enter a valid tiktok.com link." },
        { status: 400 }
      );
    }

    const data = await fetchTikTokData(trimmedUrl);

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    console.error("[/api/download] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
