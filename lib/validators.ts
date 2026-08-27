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

export function isValidFacebookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "facebook.com",
      "www.facebook.com",
      "m.facebook.com",
      "web.facebook.com",
      "mbasic.facebook.com",
      "fb.com",
    ];
    // fb.watch short links: any non-empty path is a video
    if (parsed.hostname === "fb.watch") {
      return parsed.pathname.length > 1;
    }
    const hostOk = validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
    if (!hostOk) return false;
    return (
      /\/(?:videos?|watch|reels?|share\/[vr]|video\.php|story\.php|live)(?:\/|$)/i.test(
        parsed.pathname
      ) || parsed.searchParams.has("v")
    );
  } catch {
    return false;
  }
}

export type Platform = "tiktok" | "instagram" | "facebook" | null;

export function detectPlatform(url: string): Platform {
  if (isValidTikTokUrl(url)) return "tiktok";
  if (isValidInstagramUrl(url)) return "instagram";
  if (isValidFacebookUrl(url)) return "facebook";
  return null;
}

export function isValidUrl(url: string): boolean {
  return detectPlatform(url) !== null;
}
