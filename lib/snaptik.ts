import axios from "axios";
import { createHash, createDecipheriv } from "crypto";
import type { VideoInfo } from "./types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";

// SnapTik issues an encrypted math challenge with each token; solving it
// proves a JS-capable client. Key layout mirrors their web bundle.
const TOKEN_KEY = (() => {
  const prefix = [115, 110, 52, 112].map((x) => String.fromCharCode(x)).join("");
  const suffix = (() => {
    const t = "s0j^";
    let h = "";
    for (let i = 0; i < 4; i++) h += String.fromCharCode(t.charCodeAt(i) + 1);
    return h;
  })();
  const mid = Buffer.from("djNyMQ==", "base64").toString();
  return prefix + suffix + mid + "fy2026";
})();

interface SnaptikChallenge {
  t: "b" | "r" | "c" | "m" | "n";
  a?: number;
  b?: number;
  c?: number;
  s?: number;
  m?: number;
  i?: number;
  n?: number[];
  w?: string;
  _e: string;
  _h: string;
}

function decryptToken(id: string, payload: string): SnaptikChallenge {
  const data = Buffer.from(payload, "base64");
  const iv = data.subarray(0, 16);
  const encrypted = data.subarray(16);
  const decipher = createDecipheriv(
    "aes-256-cbc",
    createHash("sha256").update(`${TOKEN_KEY}:${id}`).digest(),
    iv
  );
  return JSON.parse(
    Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
      "utf8"
    )
  );
}

function solveChallenge(t: SnaptikChallenge): number {
  switch (t.t) {
    case "b":
      return ((t.a! ^ t.b!) >> t.s!) & 255;
    case "r":
      return t.n!.reduce((h, f) => h + f, 0) * 2 + 1;
    case "c":
      return t.w!.charCodeAt(t.i!) * t.m!;
    case "m":
      return ((t.a! + t.b!) % 100) * t.c!;
    case "n":
      return t.a! * t.b! + t.b! * t.c! + t.c! * t.a! - t.a!;
    default:
      throw new Error("Unknown SnapTik challenge type");
  }
}

/** Fallback TikTok resolver  used when TikWM is down or rejects a post. */
export async function fetchTikTokViaSnaptik(url: string): Promise<VideoInfo> {
  const tokenRes = await axios.post<{ id: string; p: string }>(
    "https://snaptik.app/api/token",
    {},
    {
      timeout: 15000,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        "user-agent": UA,
      },
    }
  );

  const challenge = decryptToken(tokenRes.data.id, tokenRes.data.p);
  const verify = `${tokenRes.data.id}:${solveChallenge(challenge)}:${challenge._e}:${challenge._h}`;

  const extractRes = await axios.get<{
    data?: { downloadUrl?: string; title?: string; thumbnail?: string };
  }>(`https://snaptik.app/api/extract?url=${encodeURIComponent(url)}`, {
    timeout: 20000,
    headers: {
      accept: "application/json",
      "x-requested-with": "XMLHttpRequest",
      "x-verify": verify,
      "user-agent": UA,
    },
  });

  const data = extractRes.data?.data;
  if (!data?.downloadUrl) {
    throw new Error("SnapTik returned no download for this video");
  }

  return {
    platform: "tiktok",
    title: data.title || "TikTok Video",
    author: "TikTok",
    authorAvatar: "",
    thumbnail: data.thumbnail || "",
    duration: 0,
    downloads: [
      {
        label: "Download HD",
        url: data.downloadUrl,
        format: "mp4",
        quality: "HD",
        isAudio: false,
        isProxy: true,
      },
    ],
    stats: {},
  };
}
