import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name}: Video Downloader`,
    short_name: SITE.name,
    description: SITE.shortDescription,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b0b14",
    theme_color: "#7c3aed",
    categories: ["utilities", "multimedia"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    // Android "Share to ClipKoala": shared links land on / as query params,
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
