import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SnapLoad — Video Downloader",
    short_name: "SnapLoad",
    description:
      "Download videos from TikTok, Instagram, Facebook, YouTube, and X in HD — free, no sign-up.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    categories: ["utilities", "multimedia"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // Android "Share to SnapLoad": shared links land on / as query params,
    // where the page picks them up and starts fetching automatically.
    // (share_target isn't in Next's manifest type yet, hence the cast.)
    ...({
      share_target: {
        action: "/",
        method: "GET",
        params: { title: "title", text: "text", url: "url" },
      },
    } as Record<string, unknown>),
  };
}
