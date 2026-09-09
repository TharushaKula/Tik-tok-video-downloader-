import { describe, it, expect, beforeEach, vi } from "vitest";

import { classifyError, latencyBucket } from "../analytics";

// The privacy policy now makes specific promises about what these events
// carry. These tests are here so a future change cannot quietly break one:
// an error message can quote a platform verbatim and sometimes contains a
// URL, so it must never reach analytics as-is.

describe("classifyError", () => {
  it("buckets an unsupported link", () => {
    expect(
      classifyError(
        "That link isn't from a supported platform. Paste a link from TikTok, Instagram…"
      )
    ).toBe("unsupported_url");
  });

  it("buckets private, age-gated, and members-only content together", () => {
    expect(classifyError("This video is private")).toBe("private_or_restricted");
    expect(classifyError("Age-restricted video, sign in to confirm")).toBe(
      "private_or_restricted"
    );
    expect(classifyError("This is a members-only video")).toBe(
      "private_or_restricted"
    );
  });

  it("buckets missing and expired posts", () => {
    expect(classifyError("Post not found")).toBe("not_found");
    expect(classifyError("That Story has expired")).toBe("not_found");
  });

  it("buckets a post that resolved but has nothing to download", () => {
    expect(classifyError("No video found in that post")).toBe("no_media");
  });

  it("buckets rate limiting and network failures separately", () => {
    expect(classifyError("Rate limit exceeded, slow down")).toBe("rate_limited");
    expect(classifyError("Failed to fetch")).toBe("network");
    expect(classifyError("The request timed out")).toBe("network");
  });

  it("buckets upstream resolver trouble", () => {
    expect(
      classifyError("The server hit an unexpected problem. Give it a second.")
    ).toBe("resolver_down");
  });

  it("falls back to unknown rather than leaking the message", () => {
    expect(classifyError("something we have never seen before")).toBe("unknown");
  });

  it("only ever returns one of the fixed classes", () => {
    const allowed = new Set([
      "unsupported_url",
      "private_or_restricted",
      "not_found",
      "no_media",
      "resolver_down",
      "rate_limited",
      "network",
      "unknown",
    ]);
    const messages = [
      "https://www.tiktok.com/@someone/video/123 could not be fetched",
      "Couldn't resolve https://instagram.com/p/abc/",
      "",
      "💥",
    ];
    for (const m of messages) {
      expect(allowed.has(classifyError(m))).toBe(true);
    }
  });
});

describe("latencyBucket", () => {
  it("returns coarse buckets rather than raw timings", () => {
    expect(latencyBucket(120)).toBe("<1s");
    expect(latencyBucket(2400)).toBe("1-3s");
    expect(latencyBucket(5000)).toBe("3-6s");
    expect(latencyBucket(9000)).toBe("6-15s");
    expect(latencyBucket(45000)).toBe(">15s");
  });
});

describe("trackFunnel payloads", () => {
  const sent: { event: string; props: Record<string, unknown> }[] = [];

  beforeEach(() => {
    sent.length = 0;
    vi.resetModules();

    const store: Record<string, string> = {};
    (globalThis as unknown as { localStorage: Storage }).localStorage = {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
      removeItem: (k: string) => {
        delete store[k];
      },
      clear: () => {
        for (const k of Object.keys(store)) delete store[k];
      },
      key: () => null,
      length: 0,
    } as unknown as Storage;

    (globalThis as unknown as { window: unknown }).window = {
      location: { search: "?utm_source=Product%20Hunt", pathname: "/tiktok-downloader", hostname: "clipkoala.com" },
    };
    (globalThis as unknown as { document: unknown }).document = { referrer: "" };
  });

  async function load() {
    vi.doMock("@vercel/analytics", () => ({
      track: (event: string, props: Record<string, unknown>) =>
        sent.push({ event, props }),
    }));
    return import("../analytics");
  }

  it("never forwards properties that were not explicitly allowed", async () => {
    const { trackFunnel } = await load();
    trackFunnel("resolve_error", {
      platform: "tiktok",
      error: "not_found",
      // A caller passing something unexpected must not be able to smuggle it
      // through: only the known keys are copied onto the payload.
      ...({ url: "https://tiktok.com/@me/video/1", title: "my clip" } as object),
    });

    expect(sent).toHaveLength(1);
    expect(sent[0].props).not.toHaveProperty("url");
    expect(sent[0].props).not.toHaveProperty("title");
    expect(sent[0].props.platform).toBe("tiktok");
    expect(sent[0].props.error).toBe("not_found");
  });

  it("carries the first-touch source, normalised", async () => {
    const { trackFunnel } = await load();
    trackFunnel("submit", { platform: "youtube" });

    expect(sent[0].props.source).toBe("product-hunt");
    expect(sent[0].props.page).toBe("/tiktok-downloader");
  });

  it("records the landing path without its query string", async () => {
    const { trackFunnel } = await load();
    trackFunnel("submit", { platform: "youtube" });

    // The query can carry ?url=<the video the visitor pasted>.
    expect(String(sent[0].props.landing)).not.toContain("?");
    expect(sent[0].props.landing).toBe("/tiktok-downloader");
  });
});
