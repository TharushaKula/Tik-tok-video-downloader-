import { describe, it, expect } from "vitest";
import { mapTikTokResponse } from "../tikwm";
import { parseYouTubeFeed, extractYouTubeId } from "../youtube";
import { sanitizeTitle } from "../snapsave";

describe("mapTikTokResponse", () => {
  const base = {
    author: { nickname: "u", avatar: "a.jpg" },
    play_count: 100,
    digg_count: 5,
  };

  it("maps a regular video to HD/SD/audio options", () => {
    const info = mapTikTokResponse({
      ...base,
      title: "vid",
      play: "p.mp4",
      hdplay: "hd.mp4",
      music: "m.mp3",
      duration: 12,
    });
    expect(info.platform).toBe("tiktok");
    expect(info.downloads.map((d) => d.label)).toEqual([
      "Download HD",
      "Download SD",
      "Download Audio",
    ]);
    expect(info.stats?.views).toBe(100);
  });

  it("maps a photo/slideshow post to per-image options + soundtrack", () => {
    const info = mapTikTokResponse({
      ...base,
      title: "",
      music: "m.mp3",
      images: ["i1.jpg", "i2.jpg", "i3.jpg"],
    });
    const labels = info.downloads.map((d) => d.label);
    expect(labels).toEqual([
      "Download Image 1",
      "Download Image 2",
      "Download Image 3",
      "Download Audio",
    ]);
    // thumbnail falls back to the first image; default title used
    expect(info.thumbnail).toBe("i1.jpg");
    expect(info.title).toBe("TikTok Photo Post");
  });
});

describe("parseYouTubeFeed", () => {
  const xml = `<feed>
    <title>My Channel</title>
    <entry><yt:videoId>aaaaaaaaaaa</yt:videoId><title>One</title></entry>
    <entry><yt:videoId>bbbbbbbbbbb</yt:videoId><title>Two</title></entry>
  </feed>`;

  it("extracts feed title and watch URLs", () => {
    const feed = parseYouTubeFeed(xml);
    expect(feed.title).toBe("My Channel");
    expect(feed.total).toBe(2);
    expect(feed.urls).toEqual([
      "https://www.youtube.com/watch?v=aaaaaaaaaaa",
      "https://www.youtube.com/watch?v=bbbbbbbbbbb",
    ]);
  });

  it("returns empty for a feed with no entries", () => {
    expect(parseYouTubeFeed("<feed><title>x</title></feed>").total).toBe(0);
  });
});

describe("extractYouTubeId", () => {
  it("handles watch, youtu.be, and shorts forms", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=aqz-KE-bpKQ")).toBe(
      "aqz-KE-bpKQ"
    );
    expect(extractYouTubeId("https://youtu.be/aqz-KE-bpKQ?si=x")).toBe(
      "aqz-KE-bpKQ"
    );
    expect(extractYouTubeId("https://www.youtube.com/shorts/abc123XYZ_-")).toBe(
      "abc123XYZ_-"
    );
  });
});

describe("sanitizeTitle", () => {
  it("keeps real titles but rejects placeholder junk", () => {
    expect(sanitizeTitle("Real Title", "fallback")).toBe("Real Title");
    expect(sanitizeTitle("...", "fallback")).toBe("fallback");
    expect(sanitizeTitle("   ", "fallback")).toBe("fallback");
    expect(sanitizeTitle("· - ·", "fallback")).toBe("fallback");
  });
});
