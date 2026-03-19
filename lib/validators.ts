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

export function isValidYouTubeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "youtube.com",
      "www.youtube.com",
      "youtu.be",
      "m.youtube.com",
      "music.youtube.com",
    ];
    return validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
  } catch {
    return false;
  }
}

export type Platform = "tiktok" | "youtube" | null;

export function detectPlatform(url: string): Platform {
  if (isValidTikTokUrl(url)) return "tiktok";
  if (isValidYouTubeUrl(url)) return "youtube";
  return null;
}
