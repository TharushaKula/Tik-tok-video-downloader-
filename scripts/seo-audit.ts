/**
 * Pre-deploy SEO gate.
 *
 * Crawls every URL in the sitemap against a running build and fails the run
 * if anything that would quietly cost traffic has slipped in: a 404 or 500 on
 * a landing page, a canonical pointing at the wrong host, an accidental
 * noindex, a missing or badly sized title or description, a broken heading
 * structure, invalid JSON-LD, a page in the sitemap that nothing links to, or
 * an internal link that goes nowhere.
 *
 * Every one of these has shipped silently on some site at some point. The
 * point of a gate is that it cannot ship silently here.
 *
 *   npm run build && npm start          # in one terminal
 *   npm run seo:audit                   # in another
 *
 * Point it elsewhere with BASE_URL, e.g.
 *   BASE_URL=https://clipkoala.com npm run seo:audit
 *
 * Exits non-zero when there is at least one error, so it can gate a deploy.
 * Warnings are printed but do not fail the run.
 */
import { SITE_URL } from "../lib/site";
import nextConfig from "../next.config.mjs";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(
  /\/+$/,
  ""
);

/** The host every canonical, sitemap URL, and OG URL must agree on. */
const CANONICAL_HOST = new URL(SITE_URL).host;

// Google truncates around these widths. Outside the range is not an error,
// it is a snippet that will read badly in results, so it is a warning.
const TITLE_MIN = 15;
const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;

// Routes that are deliberately not in the sitemap and must not be reported
// as broken or orphaned when something links to them.
const NON_INDEXABLE = [
  /^\/api\//,
  /^\/feed\.xml$/,
  /^\/llms\.txt$/,
  /^\/sitemap\.xml$/,
  /^\/robots\.txt$/,
  /^\/manifest\.webmanifest$/,
  /^\/\.well-known\//,
  /^\/brand\//,
  /^\/icons\//,
  /^\/guides\/[^/]+\/[^/]+\.webp$/,
];

interface Issue {
  level: "error" | "warn";
  path: string;
  message: string;
}

const issues: Issue[] = [];

function error(path: string, message: string) {
  issues.push({ level: "error", path, message });
}
function warn(path: string, message: string) {
  issues.push({ level: "warn", path, message });
}

// ── Tiny HTML helpers ─────────────────────────────────────────────────
// Deliberately no parser dependency: these run against our own templates,
// where the markup shape is known, not against arbitrary HTML.

function attr(html: string, tag: RegExp): string | null {
  const match = html.match(tag);
  return match ? decode(match[1].trim()) : null;
}

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&apos;|&#x27;/g, "'");
}

/** Visible text of every heading, with its level. */
function headings(html: string): { level: number; text: string }[] {
  const out: { level: number; text: string }[] = [];
  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    out.push({
      level: Number(m[1]),
      text: decode(m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
    });
  }
  return out;
}

/** Every JSON-LD block on the page, already parsed. */
function jsonLd(html: string): { ok: boolean; data?: unknown }[] {
  const out: { ok: boolean; data?: unknown }[] = [];
  const re =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      out.push({ ok: true, data: JSON.parse(decode(m[1])) });
    } catch {
      out.push({ ok: false });
    }
  }
  return out;
}

/** Internal hrefs on the page, normalised to a path with no hash or query. */
function internalLinks(html: string): string[] {
  const out = new Set<string>();
  const re = /<a\b[^>]*href=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const raw = decode(m[1]);
    if (!raw || raw.startsWith("#") || raw.startsWith("mailto:")) continue;

    let path: string;
    if (raw.startsWith("/")) {
      path = raw;
    } else if (raw.startsWith("http")) {
      try {
        const url = new URL(raw);
        if (url.host !== CANONICAL_HOST && url.host !== new URL(BASE).host) {
          continue; // external, not this audit's job
        }
        path = url.pathname + url.search;
      } catch {
        continue;
      }
    } else {
      continue;
    }

    path = path.split("#")[0].split("?")[0];
    if (path.length > 1) path = path.replace(/\/+$/, "");
    out.add(path || "/");
  }
  return [...out];
}

function isNonIndexable(path: string): boolean {
  return NON_INDEXABLE.some((re) => re.test(path));
}

// ── Checks ────────────────────────────────────────────────────────────

interface PageResult {
  path: string;
  status: number;
  links: string[];
}

async function auditPage(path: string): Promise<PageResult> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  } catch (err) {
    error(path, `request failed: ${(err as Error).message}`);
    return { path, status: 0, links: [] };
  }

  if (res.status >= 300 && res.status < 400) {
    error(
      path,
      `redirects (${res.status} to ${res.headers.get("location")}) but is listed in the sitemap`
    );
    return { path, status: res.status, links: [] };
  }
  if (res.status !== 200) {
    error(path, `returned ${res.status}`);
    return { path, status: res.status, links: [] };
  }

  const html = await res.text();

  // Canonical: present, absolute, on the canonical host, and self-referencing.
  const canonical = attr(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
  );
  if (!canonical) {
    error(path, "no canonical link");
  } else {
    try {
      const url = new URL(canonical);
      if (url.host !== CANONICAL_HOST) {
        error(
          path,
          `canonical points at ${url.host}, expected ${CANONICAL_HOST}`
        );
      }
      const canonicalPath = url.pathname.replace(/(.)\/+$/, "$1");
      const expected = path.replace(/(.)\/+$/, "$1");
      if (canonicalPath !== expected) {
        error(
          path,
          `canonical path is ${canonicalPath}, expected ${expected}`
        );
      }
    } catch {
      error(path, `canonical is not an absolute URL: ${canonical}`);
    }
  }

  // An accidental noindex on a landing page is the most expensive typo there is.
  const robotsMeta = attr(
    html,
    /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i
  );
  if (robotsMeta && /noindex/i.test(robotsMeta)) {
    error(path, `has noindex ("${robotsMeta}") but is in the sitemap`);
  }

  // Title and description length.
  const title = attr(html, /<title>([\s\S]*?)<\/title>/i);
  if (!title) {
    error(path, "no <title>");
  } else if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    warn(path, `title is ${title.length} chars (aim ${TITLE_MIN}-${TITLE_MAX}): "${title}"`);
  }

  const description = attr(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
  );
  if (!description) {
    error(path, "no meta description");
  } else if (description.length < DESC_MIN || description.length > DESC_MAX) {
    warn(
      path,
      `description is ${description.length} chars (aim ${DESC_MIN}-${DESC_MAX})`
    );
  }

  // Open Graph: a page without og:title or an image shares badly everywhere.
  if (!attr(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)) {
    warn(path, "no og:title");
  }
  if (!attr(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i)) {
    warn(path, "no og:image");
  }

  // Headings: exactly one H1, and no skipped levels.
  const hs = headings(html);
  const h1s = hs.filter((h) => h.level === 1);
  if (h1s.length === 0) error(path, "no H1");
  if (h1s.length > 1) {
    error(path, `${h1s.length} H1 elements: ${h1s.map((h) => `"${h.text}"`).join(", ")}`);
  }
  for (let i = 1; i < hs.length; i++) {
    const jump = hs[i].level - hs[i - 1].level;
    if (jump > 1) {
      warn(
        path,
        `heading level jumps h${hs[i - 1].level} to h${hs[i].level} at "${hs[i].text}"`
      );
    }
  }

  // Structured data has to at least be valid JSON, or it is worse than absent.
  const blocks = jsonLd(html);
  if (blocks.length === 0) {
    warn(path, "no JSON-LD structured data");
  }
  const broken = blocks.filter((b) => !b.ok).length;
  if (broken > 0) {
    error(path, `${broken} JSON-LD block(s) are not valid JSON`);
  }

  return { path, status: 200, links: internalLinks(html) };
}

/** Read the sitemap and return its paths, checking the host while we are here. */
async function sitemapPaths(): Promise<string[]> {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) {
    console.error(`Could not read ${BASE}/sitemap.xml (${res.status})`);
    process.exit(1);
  }
  const xml = await res.text();
  const paths: string[] = [];
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const raw = m[1].trim();
    try {
      const url = new URL(raw);
      if (url.host !== CANONICAL_HOST) {
        error("/sitemap.xml", `entry on wrong host: ${raw}`);
      }
      const path = url.pathname.replace(/(.)\/+$/, "$1");
      paths.push(path || "/");
    } catch {
      error("/sitemap.xml", `entry is not an absolute URL: ${raw}`);
    }
  }
  return [...new Set(paths)];
}

async function main() {
  console.log(`SEO audit against ${BASE}\n`);

  const paths = await sitemapPaths();
  console.log(`Sitemap lists ${paths.length} URLs. Checking each one…\n`);

  // Sequential on purpose: this runs against one local server, and a burst of
  // parallel requests just produces misleading timeouts.
  const results: PageResult[] = [];
  for (const path of paths) {
    const result = await auditPage(path);
    results.push(result);
    process.stdout.write(result.status === 200 ? "." : "x");
  }
  process.stdout.write("\n\n");

  // Orphans: an indexable page nothing links to will not be found by a
  // crawler following links, however valid the sitemap is.
  const linkedTo = new Set<string>();
  for (const r of results) {
    for (const link of r.links) {
      if (link !== r.path) linkedTo.add(link);
    }
  }
  for (const path of paths) {
    if (path !== "/" && !linkedTo.has(path)) {
      error(path, "orphan: in the sitemap but no other page links to it");
    }
  }

  // Internal links that go nowhere, and pages linked but never listed.
  const inSitemap = new Set(paths);
  const checked = new Map<string, number>();
  for (const link of [...linkedTo].sort()) {
    if (inSitemap.has(link) || isNonIndexable(link)) continue;
    if (!checked.has(link)) {
      const res = await fetch(`${BASE}${link}`, { redirect: "manual" }).catch(
        () => null
      );
      checked.set(link, res?.status ?? 0);
    }
    const status = checked.get(link)!;
    if (status === 200) {
      warn(link, "linked internally and reachable, but missing from the sitemap");
    } else if (status >= 300 && status < 400) {
      warn(link, `internal link redirects (${status}); link the destination directly`);
    } else {
      error(link, `internal link is broken (${status || "unreachable"})`);
    }
  }

  // Redirect chains: every configured redirect must reach a 200 in one hop.
  // A redirect that lands on another redirect wastes crawl budget and dilutes
  // whatever signal the original URL had.
  const redirects = (await nextConfig.redirects?.()) ?? [];
  for (const rule of redirects) {
    // Only static sources can be probed directly; skip pattern sources.
    if (/[:*(]/.test(rule.source)) continue;

    const first = await fetch(`${BASE}${rule.source}`, {
      redirect: "manual",
    }).catch(() => null);

    if (!first) {
      error(rule.source, "configured redirect could not be requested");
      continue;
    }
    if (first.status < 300 || first.status >= 400) {
      error(
        rule.source,
        `configured as a redirect but returned ${first.status}`
      );
      continue;
    }

    const target = first.headers.get("location");
    if (!target) {
      error(rule.source, `${first.status} with no Location header`);
      continue;
    }

    const next = await fetch(new URL(target, BASE), {
      redirect: "manual",
    }).catch(() => null);

    if (!next) {
      error(rule.source, `redirect target ${target} could not be requested`);
    } else if (next.status >= 300 && next.status < 400) {
      error(
        rule.source,
        `redirect chain: ${rule.source} to ${target} to ${next.headers.get("location")}`
      );
    } else if (next.status !== 200) {
      error(rule.source, `redirects to ${target}, which returns ${next.status}`);
    }
  }

  // ── Report ──────────────────────────────────────────────────────────
  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "warn");

  if (warnings.length > 0) {
    console.log(`Warnings (${warnings.length}):`);
    for (const w of warnings) console.log(`  ~ ${w.path}\n    ${w.message}`);
    console.log("");
  }
  if (errors.length > 0) {
    console.log(`Errors (${errors.length}):`);
    for (const e of errors) console.log(`  ! ${e.path}\n    ${e.message}`);
    console.log("");
  }

  console.log(
    `${paths.length} pages and ${redirects.length} redirect(s) checked, ` +
      `${errors.length} error(s), ${warnings.length} warning(s).`
  );
  process.exit(errors.length > 0 ? 1 : 0);
}

void main();
