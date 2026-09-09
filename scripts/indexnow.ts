/**
 * IndexNow submitter.
 *
 * Tells participating search engines (Bing, Yandex, Seznam, Naver) that URLs
 * have changed, instead of waiting for them to come back on their own
 * schedule. Google does not use IndexNow and never has, so this is a Bing
 * play, not a Google one. Treat anything it does for Google as coincidence.
 *
 * One-time setup:
 *   1. Invent a key: 8-128 hex characters. `openssl rand -hex 16` will do.
 *   2. Put it in the environment as INDEXNOW_KEY, locally and in Vercel.
 *   3. Deploy. The key file is served at /<key>.txt automatically by the
 *      route handler in app/[key].txt, so there is nothing to upload.
 *
 * Then, after a deploy that added or meaningfully changed pages:
 *
 *   npm run indexnow                 # everything in the sitemap
 *   npm run indexnow -- /answers/reddit-video-no-sound /guides/x
 *
 * Submitting the whole sitemap on every deploy is not useful and looks like
 * noise to the receiving engine. Pass the paths that actually changed.
 */
import { SITE_URL } from "../lib/site";

const ENDPOINT = "https://api.indexnow.org/IndexNow";
const HOST = new URL(SITE_URL).host;

async function sitemapUrls(): Promise<string[]> {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`Could not read the sitemap (${res.status})`);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.error(
      "INDEXNOW_KEY is not set. Generate one with `openssl rand -hex 16`,\n" +
        "then set it locally and in the Vercel project before running this."
    );
    process.exit(1);
  }
  if (!/^[a-fA-F0-9]{8,128}$/.test(key)) {
    console.error("INDEXNOW_KEY must be 8-128 hexadecimal characters.");
    process.exit(1);
  }

  // Confirm the key file is actually live before announcing anything: an
  // engine that cannot verify the key rejects the whole submission.
  const keyUrl = `${SITE_URL}/${key}.txt`;
  const keyRes = await fetch(keyUrl).catch(() => null);
  if (!keyRes?.ok || (await keyRes.text()).trim() !== key) {
    console.error(
      `${keyUrl} does not serve the key. Deploy with INDEXNOW_KEY set, then retry.`
    );
    process.exit(1);
  }

  const args = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const urlList = args.length
    ? args.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`))
    : await sitemapUrls();

  // The API accepts up to 10,000 per request; this site is nowhere near that.
  console.log(`Submitting ${urlList.length} URL(s) for ${HOST}…`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: keyUrl,
      urlList,
    }),
  });

  // 200 accepted, 202 accepted but the key is still being verified.
  if (res.status === 200 || res.status === 202) {
    console.log(`Accepted (${res.status}).`);
    for (const url of urlList) console.log(`  ${url}`);
    return;
  }

  console.error(`Rejected (${res.status}): ${await res.text()}`);
  console.error(
    "422 usually means a URL is not on the declared host; 403 means the key file did not verify."
  );
  process.exit(1);
}

void main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
