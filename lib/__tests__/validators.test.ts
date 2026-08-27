import { describe, it, expect } from "vitest";
import {
  detectPlatform,
  extractSupportedUrls,
  extractYouTubePlaylistId,
  isYouTubePlaylistUrl,
  isYouTubeChannelUrl,
  extractYouTubeChannelRef,
  normalizeLinkFileText,
  MAX_BATCH_SIZE,
} from "../validators";

describe("detectPlatform", () => {
  const cases: [string, string | null][] = [
    // TikTok
    ["https://www.tiktok.com/@user/video/7123456789012345678", "tiktok"],
    ["https://vm.tiktok.com/ZMabcdef/", "tiktok"],
    // Instagram
    ["https://www.instagram.com/reel/Cxyz123/", "instagram"],
    ["https://www.instagram.com/p/Cxyz123/", "instagram"],
    ["https://www.instagram.com/stories/user/12345/", "instagram"],
    // Facebook
    ["https://www.facebook.com/watch?v=1093831585408102", "facebook"],
    ["https://fb.watch/abc123/", "facebook"],
    ["https://www.facebook.com/share/v/AbCdEf123/", "facebook"],
    // YouTube (single videos only; playlists/channels handled separately)
    ["https://www.youtube.com/watch?v=aqz-KE-bpKQ", "youtube"],
    ["https://youtu.be/aqz-KE-bpKQ", "youtube"],
    ["https://www.youtube.com/shorts/abc123XYZ_-", "youtube"],
    // X / Twitter
    ["https://x.com/historyinmemes/status/1790637656616943991", "twitter"],
    ["https://twitter.com/user/status/123", "twitter"],
    // Reddit
    ["https://www.reddit.com/r/x/comments/1cl9h0u/title/", "reddit"],
    ["https://redd.it/1cl9h0u", "reddit"],
    // Pinterest
    ["https://www.pinterest.com/pin/664281013778109217/", "pinterest"],
    ["https://pin.it/4hVjrgWzq", "pinterest"],
    // Twitch
    ["https://clips.twitch.tv/SomeClipSlug", "twitch"],
    ["https://www.twitch.tv/ninja/clip/AwkwardClip", "twitch"],
    // SoundCloud
    ["https://soundcloud.com/forss/flickermood", "soundcloud"],
    // Negatives
    ["https://www.youtube.com/@somechannel", null], // channel, not a video
    ["https://www.tiktok.com/@user", null],
    ["https://vimeo.com/76979871", null], // Vimeo dropped
    ["https://example.com/video/123", null],
    ["not a url", null],
    ["", null],
  ];

  it.each(cases)("detects %s", (url, expected) => {
    expect(detectPlatform(url)).toBe(expected);
  });
});

describe("extractSupportedUrls", () => {
  it("pulls supported links out of messy prose and dedupes", () => {
    const blob = `check these out!
      https://www.tiktok.com/@user/video/7106594312292453674?is_from_webapp=1
      watch this too: https://youtu.be/aqz-KE-bpKQ, so good
      https://vimeo.com/999 (not supported)
      https://www.tiktok.com/@user/video/7106594312292453674?is_from_webapp=1
      https://www.instagram.com/reel/Chunk8-jurw/.`;
    const r = extractSupportedUrls(blob);
    expect(r.urls).toHaveLength(3);
    expect(r.unsupported).toBe(1);
    expect(r.truncated).toBe(false);
    // trailing punctuation stripped
    expect(r.urls).toContain("https://www.instagram.com/reel/Chunk8-jurw/");
  });

  it("caps at MAX_BATCH_SIZE and flags truncation", () => {
    const many = Array.from(
      { length: MAX_BATCH_SIZE + 4 },
      (_, i) => `https://youtu.be/aqz-KE-bpK${i}`
    ).join("\n");
    const r = extractSupportedUrls(many);
    expect(r.urls).toHaveLength(MAX_BATCH_SIZE);
    expect(r.truncated).toBe(true);
  });

  it("handles a single link and empty input", () => {
    expect(extractSupportedUrls("https://youtu.be/aqz-KE-bpKQ").urls).toHaveLength(1);
    expect(extractSupportedUrls("no links here").urls).toHaveLength(0);
  });
});

describe("normalizeLinkFileText + extraction (file import)", () => {
  it("extracts links from a quoted CSV row", () => {
    const csv = `name,link,notes
"first","https://youtu.be/aqz-KE-bpKQ","fun"
second;https://www.tiktok.com/@u/video/7106594312292453674;great`;
    const r = extractSupportedUrls(normalizeLinkFileText(csv));
    expect(r.urls).toEqual([
      "https://youtu.be/aqz-KE-bpKQ",
      "https://www.tiktok.com/@u/video/7106594312292453674",
    ]);
  });

  it("passes plain txt link lists through unchanged", () => {
    const txt = "https://youtu.be/aqz-KE-bpKQ\nhttps://pin.it/4hVjrgWzq\n";
    const r = extractSupportedUrls(normalizeLinkFileText(txt));
    expect(r.urls).toHaveLength(2);
  });
});

describe("YouTube playlist detection", () => {
  it("extracts a playlist id", () => {
    expect(
      extractYouTubePlaylistId("https://www.youtube.com/playlist?list=PLRBp0Fe2Gpg")
    ).toBe("PLRBp0Fe2Gpg");
    expect(isYouTubePlaylistUrl("https://www.youtube.com/playlist?list=PLRBp0Fe2Gpg")).toBe(true);
  });
  it("rejects watch links and bad ids", () => {
    expect(extractYouTubePlaylistId("https://www.youtube.com/watch?v=abc")).toBeNull();
    expect(extractYouTubePlaylistId("https://www.youtube.com/playlist?list=x")).toBeNull();
  });
});

describe("YouTube channel detection", () => {
  it("recognizes channel forms without colliding with videos", () => {
    expect(isYouTubeChannelUrl("https://www.youtube.com/@mkbhd")).toBe(true);
    expect(isYouTubeChannelUrl("https://www.youtube.com/@mkbhd/videos")).toBe(true);
    expect(isYouTubeChannelUrl("https://www.youtube.com/c/MrBeast6000")).toBe(true);
    expect(isYouTubeChannelUrl("https://www.youtube.com/user/PewDiePie")).toBe(true);
    expect(
      isYouTubeChannelUrl("https://www.youtube.com/channel/UCBJycsmduvYEL83R_U4JriQ")
    ).toBe(true);
    // not channels
    expect(isYouTubeChannelUrl("https://www.youtube.com/watch?v=aqz-KE-bpKQ")).toBe(false);
    expect(isYouTubeChannelUrl("https://www.youtube.com/playlist?list=PLx1234567")).toBe(false);
    expect(detectPlatform("https://www.youtube.com/@mkbhd")).toBeNull();
  });

  it("returns an id ref directly and a lookup ref for handles", () => {
    expect(
      extractYouTubeChannelRef("https://www.youtube.com/channel/UCBJycsmduvYEL83R_U4JriQ")
    ).toEqual({ kind: "id", value: "UCBJycsmduvYEL83R_U4JriQ" });
    expect(
      extractYouTubeChannelRef("https://www.youtube.com/@mkbhd?si=x")
    ).toEqual({ kind: "lookup", value: "https://www.youtube.com/@mkbhd" });
  });
});
