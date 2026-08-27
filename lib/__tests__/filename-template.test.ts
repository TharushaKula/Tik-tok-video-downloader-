import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  applyTemplate,
  loadTemplate,
  saveTemplate,
  DEFAULT_TEMPLATE,
} from "../filename-template";

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
  // Pin the date so {date} is deterministic
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-27T12:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

const info = {
  title: "My summer trip",
  author: "traveler",
  platform: "tiktok" as const,
};

describe("applyTemplate", () => {
  it("fills variables", () => {
    expect(applyTemplate("{title}", info)).toBe("My summer trip");
    expect(applyTemplate("{author} - {title}", info)).toBe(
      "traveler - My summer trip"
    );
    expect(applyTemplate("{platform}", info)).toBe("TikTok");
    expect(applyTemplate("{title} [{quality}]", info, { quality: "1080p" })).toBe(
      "My summer trip [1080p]"
    );
    expect(applyTemplate("{date}", info)).toBe("2026-08-27");
  });

  it("drops unknown variables and cleans leftover separators", () => {
    expect(applyTemplate("{title} {nonsense}", info)).toBe("My summer trip");
    // empty quality shouldn't leave dangling brackets/separators
    expect(applyTemplate("{title} - {quality}", info, { quality: "" })).toBe(
      "My summer trip"
    );
  });

  it("falls back to the title when a template resolves to nothing", () => {
    expect(applyTemplate("{quality}", info, { quality: "" })).toBe(
      "My summer trip"
    );
  });
});

describe("template persistence", () => {
  it("defaults, saves, and treats the default as unset", () => {
    expect(loadTemplate()).toBe(DEFAULT_TEMPLATE);
    saveTemplate("{author} - {title}");
    expect(loadTemplate()).toBe("{author} - {title}");
    saveTemplate(DEFAULT_TEMPLATE);
    expect(localStorage.getItem("snapload:filename-template")).toBeNull();
    saveTemplate("   ");
    expect(loadTemplate()).toBe(DEFAULT_TEMPLATE);
  });
});
