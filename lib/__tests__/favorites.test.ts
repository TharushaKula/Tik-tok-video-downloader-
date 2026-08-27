import { describe, it, expect, beforeEach } from "vitest";
import {
  loadFavorites,
  toggleFavorite,
  removeFavorite,
  isFavorite,
  setFavoriteTags,
  normalizeTag,
  allTags,
  type FavoriteEntry,
} from "../favorites";

// jsdom-free localStorage stub
beforeEach(() => {
  const store: Record<string, string> = {};
  (globalThis as unknown as { localStorage: Storage }).localStorage = {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    },
    clear: () => {},
    key: () => null,
    length: 0,
  };
});

const entry = (over: Partial<FavoriteEntry> = {}): FavoriteEntry => ({
  url: "https://youtu.be/a",
  title: "A",
  platform: "youtube",
  ts: 1,
  ...over,
});

describe("toggleFavorite", () => {
  it("adds then removes, tracking favorited state", () => {
    const e = entry();
    const r1 = toggleFavorite(e);
    expect(r1.favorited).toBe(true);
    expect(isFavorite(e.url)).toBe(true);
    const r2 = toggleFavorite(e);
    expect(r2.favorited).toBe(false);
    expect(isFavorite(e.url)).toBe(false);
  });

  it("prepends newest and removeFavorite drops by url", () => {
    toggleFavorite(entry({ url: "u1" }));
    toggleFavorite(entry({ url: "u2" }));
    expect(loadFavorites().map((e) => e.url)).toEqual(["u2", "u1"]);
    const after = removeFavorite("u1");
    expect(after.map((e) => e.url)).toEqual(["u2"]);
  });
});

describe("normalizeTag", () => {
  it("trims, collapses, lowercases, and caps length", () => {
    expect(normalizeTag("  Chill   Vibes ")).toBe("chill vibes");
    expect(normalizeTag("MUSIC")).toBe("music");
    expect(normalizeTag("x".repeat(40))).toHaveLength(24);
    expect(normalizeTag("   ")).toBe("");
  });
});

describe("setFavoriteTags + allTags", () => {
  it("normalizes and dedupes assigned tags", () => {
    toggleFavorite(entry({ url: "u1" }));
    setFavoriteTags("u1", ["Music", "music", "  Chill  ", ""]);
    expect(loadFavorites()[0].tags).toEqual(["music", "chill"]);
  });

  it("orders allTags by frequency then name", () => {
    toggleFavorite(entry({ url: "u1" }));
    toggleFavorite(entry({ url: "u2" }));
    toggleFavorite(entry({ url: "u3" }));
    setFavoriteTags("u1", ["music", "chill"]);
    setFavoriteTags("u2", ["music"]);
    setFavoriteTags("u3", ["ambient", "music"]);
    // music appears 3x, chill & ambient 1x each -> alphabetical tiebreak
    expect(allTags(loadFavorites())).toEqual(["music", "ambient", "chill"]);
  });

  it("clearing tags leaves an empty array", () => {
    toggleFavorite(entry({ url: "u1" }));
    setFavoriteTags("u1", ["a"]);
    setFavoriteTags("u1", []);
    expect(loadFavorites()[0].tags).toEqual([]);
  });
});
