import { NextRequest, NextResponse } from "next/server";
import { assertResolvedMedia, ResolverNotMediaError } from "@/lib/youtube";

export const runtime = "nodejs";
export const maxDuration = 30;

// The browser polls the resolver directly and ends up holding a download URL
// it cannot inspect: cross-origin JavaScript cannot read the response's
// content-type, so the page has no way to tell a file from the resolver's
// advertising interstitial before navigating to it.
//
// This endpoint does that check server-side. The client calls it with the URL
// it is about to hand to the browser, and only proceeds when the answer is
// yes. Only the resolver's own host is accepted, so this cannot be used as an
// open probe of arbitrary URLs.
const ALLOWED_HOST = /(^|\.)(loader\.to|affadaffa\.com|oceansaver\.in)$/i;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url.trim() : "";

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid URL" }, { status: 400 });
  }
  if (parsed.protocol !== "https:" || !ALLOWED_HOST.test(parsed.hostname)) {
    return NextResponse.json({ ok: false, error: "URL not allowed" }, { status: 403 });
  }

  try {
    await assertResolvedMedia(parsed.toString());
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ResolverNotMediaError) {
      console.error("[/api/youtube/verify] non-media:", err.detail);
      return NextResponse.json({ ok: false, error: err.message });
    }
    return NextResponse.json({
      ok: false,
      error: "Could not verify the download. Please try again.",
    });
  }
}
