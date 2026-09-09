import { SITE, absoluteUrl } from "@/lib/site";

// Served at /.well-known/security.txt via a rewrite in next.config.mjs
// (the App Router will not route a directory whose name starts with a dot).
//
// RFC 9116 requires an Expires date and says it should be less than a year
// out. It is derived here rather than hard-coded, so the file cannot quietly
// go stale and start looking abandoned.
export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const expires = new Date();
  expires.setUTCMonth(expires.getUTCMonth() + 6);
  expires.setUTCHours(0, 0, 0, 0);

  const body = [
    `Contact: mailto:${SITE.contactEmail}`,
    `Expires: ${expires.toISOString().replace(/\.\d{3}Z$/, "Z")}`,
    "Preferred-Languages: en",
    `Canonical: ${absoluteUrl("/.well-known/security.txt")}`,
    `Policy: ${absoluteUrl("/security")}`,
    "",
    "# ClipKoala has no user accounts, no stored credentials, and no stored",
    "# media. Scope, exclusions, and what to expect back are on the policy page.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
