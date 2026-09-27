import { describe, it, expect, afterEach, vi } from "vitest";

import { assertResolvedMedia, ResolverNotMediaError } from "../youtube";

// The resolver has been observed accepting a conversion job, reporting
// "Finished", and then serving a 200 text/html redirect page that beacons an
// ad network and navigates the visitor away from the site. Handing that URL
// to the browser turns a "Download MP3" button into an ad redirect, so the
// guard below is the thing standing between users and that behaviour.
//
// Note the asymmetry these tests encode: a HEAD on the same URL answers
// application/octet-stream with content-length 0 even when GET returns HTML,
// so the guard must read the body and must not trust headers alone.

const AD_PAGE = `<!doctype html>
<html><head><title>Redirect</title></head><body>
<script>navigator.sendBeacon("https://my.rtmark.net/img.gif");
window.location.href = "https://yt.example-ad.com/";</script>
</body></html>`;

function mockFetch(
  body: Uint8Array | string,
  contentType: string,
  status = 200
) {
  const buf = typeof body === "string" ? Buffer.from(body) : Buffer.from(body);
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      status,
      headers: { get: (h: string) => (h.toLowerCase() === "content-type" ? contentType : null) },
      arrayBuffer: async () => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
    }))
  );
}

/** First bytes of a real file of each kind. */
const MP4 = Buffer.concat([Buffer.from([0, 0, 0, 0x20]), Buffer.from("ftypisom"), Buffer.alloc(16)]);
const MP3_ID3 = Buffer.concat([Buffer.from("ID3"), Buffer.alloc(32)]);
const MP3_SYNC = Buffer.concat([Buffer.from([0xff, 0xfb, 0x90, 0x00]), Buffer.alloc(32)]);
const FLAC = Buffer.concat([Buffer.from("fLaC"), Buffer.alloc(32)]);
const WAV = Buffer.concat([Buffer.from("RIFF"), Buffer.alloc(32)]);

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("assertResolvedMedia", () => {
  it("rejects the resolver's HTML advertising page", async () => {
    mockFetch(AD_PAGE, "text/html; charset=utf8");
    await expect(assertResolvedMedia("https://lto2.example.com/d/x")).rejects.toBeInstanceOf(
      ResolverNotMediaError
    );
  });

  it("explains the failure without blaming the user's link", async () => {
    mockFetch(AD_PAGE, "text/html; charset=utf8");
    let err: ResolverNotMediaError | undefined;
    try {
      await assertResolvedMedia("https://lto2.example.com/d/x");
    } catch (e) {
      err = e as ResolverNotMediaError;
    }
    expect(err).toBeInstanceOf(ResolverNotMediaError);
    expect(err!.message).toMatch(/not with your link/i);
    expect(err!.detail).toContain("text/html");
  });

  it("rejects octet-stream that carries no media signature", async () => {
    // This is the shape a HEAD request reports, so the body check matters.
    mockFetch(Buffer.from("<!doctype html><html></html>"), "application/octet-stream");
    await expect(assertResolvedMedia("https://lto2.example.com/d/x")).rejects.toBeInstanceOf(
      ResolverNotMediaError
    );
  });

  it("rejects an empty body", async () => {
    mockFetch(Buffer.alloc(0), "application/octet-stream");
    await expect(assertResolvedMedia("https://lto2.example.com/d/x")).rejects.toBeInstanceOf(
      ResolverNotMediaError
    );
  });

  it("fails closed when the probe itself errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      })
    );
    await expect(assertResolvedMedia("https://lto2.example.com/d/x")).rejects.toBeInstanceOf(
      ResolverNotMediaError
    );
  });

  it("accepts a real MP4 served as octet-stream", async () => {
    mockFetch(MP4, "application/octet-stream");
    await expect(assertResolvedMedia("https://lto2.example.com/d/x")).resolves.toBeUndefined();
  });

  it.each([
    ["MP3 with an ID3 tag", MP3_ID3],
    ["MP3 with a bare frame sync", MP3_SYNC],
    ["FLAC", FLAC],
    ["WAV", WAV],
  ])("accepts %s", async (_label, body) => {
    mockFetch(body, "application/octet-stream");
    await expect(assertResolvedMedia("https://lto2.example.com/d/x")).resolves.toBeUndefined();
  });

  it("accepts a correctly typed response even without a signature", async () => {
    mockFetch(Buffer.alloc(64), "video/mp4");
    await expect(assertResolvedMedia("https://lto2.example.com/d/x")).resolves.toBeUndefined();
    mockFetch(Buffer.alloc(64), "audio/mpeg");
    await expect(assertResolvedMedia("https://lto2.example.com/d/x")).resolves.toBeUndefined();
  });
});
