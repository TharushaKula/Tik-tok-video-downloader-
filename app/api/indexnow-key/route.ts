import { notFound } from "next/navigation";

// The IndexNow key file. Reached at /<key>.txt through a rewrite that
// next.config.mjs only adds when INDEXNOW_KEY is set, so there is no key in
// the repository and nothing to upload by hand when it is rotated.
//
// IndexNow verifies ownership by asking for a root-level text file whose
// contents are the key itself.
export const dynamic = "force-static";

export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) notFound();

  return new Response(key, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
