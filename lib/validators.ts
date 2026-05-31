export function isValidTikTokUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "tiktok.com",
      "www.tiktok.com",
      "vm.tiktok.com",
      "vt.tiktok.com",
      "m.tiktok.com",
    ];
    return validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
  } catch {
    return false;
  }
}

export function isValidInstagramUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "instagram.com",
      "www.instagram.com",
      "m.instagram.com",
    ];
    const hostOk = validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
    if (!hostOk) return false;
    return /\/(reel|reels|p|tv)\/[A-Za-z0-9_-]+/.test(parsed.pathname);
  } catch {
    return false;
  }
}

export type Platform = "tiktok" | "instagram" | null;

export function detectPlatform(url: string): Platform {
  if (isValidTikTokUrl(url)) return "tiktok";
  if (isValidInstagramUrl(url)) return "instagram";
  return null;
}

export function isValidUrl(url: string): boolean {
  return detectPlatform(url) !== null;
}
