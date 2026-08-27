import { describe, it, expect } from "vitest";
import {
  isAllowedMediaUrl,
  sanitizeFilename,
  matchHost,
  TIKTOK_HOSTS,
} from "../proxy-hosts";

describe("isAllowedMediaUrl", () => {
  it("allows known media/CDN hosts and their subdomains", () => {
    expect(isAllowedMediaUrl("https://v16-webapp.tiktokcdn.com/x.mp4")).toBe(true);
    expect(isAllowedMediaUrl("https://scontent.cdninstagram.com/x.mp4")).toBe(true);
    expect(isAllowedMediaUrl("https://video.twimg.com/x.mp4")).toBe(true);
    expect(isAllowedMediaUrl("https://sd.rapidsave.com/x.mp4")).toBe(true);
    expect(isAllowedMediaUrl("https://cf-media.sndcdn.com/x.mp3")).toBe(true);
    expect(isAllowedMediaUrl("https://d1234.cloudfront.net/x.mp4")).toBe(true);
    expect(isAllowedMediaUrl("https://i.pinimg.com/x.jpg")).toBe(true);
  });

  it("blocks arbitrary and lookalike hosts (SSRF guard)", () => {
    expect(isAllowedMediaUrl("https://evil.com/x.mp4")).toBe(false);
    expect(isAllowedMediaUrl("https://tiktokcdn.com.evil.com/x")).toBe(false);
    expect(isAllowedMediaUrl("https://not-tiktokcdn.com/x")).toBe(false);
    expect(isAllowedMediaUrl("http://169.254.169.254/latest/meta-data")).toBe(false);
    expect(isAllowedMediaUrl("ftp://tiktokcdn.com/x")).toBe(false);
    expect(isAllowedMediaUrl("not a url")).toBe(false);
  });

  it("matchHost requires an exact host or a dotted-suffix match", () => {
    expect(matchHost("tiktok.com", TIKTOK_HOSTS)).toBe(true);
    expect(matchHost("www.tiktok.com", TIKTOK_HOSTS)).toBe(true);
    expect(matchHost("faketiktok.com", TIKTOK_HOSTS)).toBe(false);
  });
});

describe("sanitizeFilename", () => {
  it("strips filesystem- and header-unsafe characters", () => {
    expect(sanitizeFilename('a/b:c*d?"e<f>g|h', "fallback")).not.toMatch(
      /[\\/:*?"<>|]/
    );
  });

  it("keeps unicode/emoji, collapses whitespace, trims trailing dots", () => {
    expect(sanitizeFilename("Balas 🔥  title  ", "fb")).toBe("Balas 🔥 title");
    expect(sanitizeFilename("name...", "fb")).toBe("name");
  });

  it("caps length and falls back when empty", () => {
    expect(sanitizeFilename("x".repeat(200), "fb").length).toBeLessThanOrEqual(120);
    expect(sanitizeFilename("///", "fb")).toBe("fb");
    expect(sanitizeFilename("", "fb")).toBe("fb");
  });
});
