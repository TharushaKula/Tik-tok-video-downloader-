import { describe, it, expect } from "vitest";
import { detectPlatform, snapLoadUrl, DEFAULT_BASE_URL } from "./platforms.js";

// The extension's detector must agree with the site's lib/validators.ts on
// everything the site accepts (the site re-validates, so the extension only
// risks annoying false negatives/positives  keep them in sync here).
describe("extension detectPlatform", () => {
  const supported = [
    ["https://www.tiktok.com/@user/video/7123456789012345678", "tiktok"],
    ["https://vm.tiktok.com/ZMabcdef/", "tiktok"],
    ["https://www.instagram.com/reel/Cxyz123/", "instagram"],
    ["https://www.instagram.com/stories/user/12345/", "instagram"],
    ["https://fb.watch/abc123/", "facebook"],
    ["https://www.facebook.com/watch?v=1093831585408102", "facebook"],
    ["https://www.youtube.com/watch?v=aqz-KE-bpKQ", "youtube"],
    ["https://youtu.be/aqz-KE-bpKQ", "youtube"],
    ["https://www.youtube.com/shorts/abc123XYZ_-", "youtube"],
    // extension is broader here on purpose: the site expands these
    ["https://www.youtube.com/playlist?list=PLRBp0Fe2Gpg", "youtube"],
    ["https://www.youtube.com/@mkbhd", "youtube"],
    ["https://x.com/historyinmemes/status/1790637656616943991", "twitter"],
    ["https://www.reddit.com/r/x/comments/1cl9h0u/title/", "reddit"],
    ["https://redd.it/1cl9h0u", "reddit"],
    ["https://www.pinterest.com/pin/664281013778109217/", "pinterest"],
    ["https://pin.it/4hVjrgWzq", "pinterest"],
    ["https://clips.twitch.tv/SomeClipSlug", "twitch"],
    ["https://www.twitch.tv/ninja/clip/AwkwardClip", "twitch"],
    ["https://soundcloud.com/forss/flickermood", "soundcloud"],
  ];
  it.each(supported)("detects %s", (url, platform) => {
    expect(detectPlatform(url)).toBe(platform);
  });

  const unsupported = [
    "https://www.tiktok.com/@user", // bare profile
    "https://www.tiktok.com/",
    "https://www.instagram.com/some_user/",
    "https://www.facebook.com/zuck",
    "https://x.com/nasa", // profile, not a post
    "https://www.reddit.com/r/videos/",
    "https://www.pinterest.com/ideas/",
    "https://www.twitch.tv/ninja", // live channel, not a clip
    "https://vimeo.com/76979871",
    "https://example.com/video/1",
    "chrome://extensions",
    "",
  ];
  it.each(unsupported)("rejects %s", (url) => {
    expect(detectPlatform(url)).toBeNull();
  });
});

describe("snapLoadUrl", () => {
  it("builds the deep link with encoding", () => {
    expect(snapLoadUrl(DEFAULT_BASE_URL, "https://youtu.be/a?b=c")).toBe(
      "https://snapload.app/?url=https%3A%2F%2Fyoutu.be%2Fa%3Fb%3Dc"
    );
  });
  it("strips trailing slashes and falls back to the default base", () => {
    expect(snapLoadUrl("http://localhost:3000/", "https://youtu.be/a")).toBe(
      "http://localhost:3000/?url=https%3A%2F%2Fyoutu.be%2Fa"
    );
    expect(snapLoadUrl("", "https://youtu.be/a")).toContain(DEFAULT_BASE_URL);
  });
});
