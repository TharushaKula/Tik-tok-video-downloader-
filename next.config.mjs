/** @type {import('next').NextConfig} */

// Long-lived caching for immutable brand assets and icons; sensible security
// headers everywhere. Next already fingerprints /_next/static and sets
// immutable caching there.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig = {
  // archiver's package exports map trips the bundler; load it at runtime
  serverExternalPackages: ["archiver"],
  // Pin the workspace root: a stray lockfile in the home directory would
  // otherwise confuse Turbopack's project-root detection.
  turbopack: { root: import.meta.dirname },
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.tikwm.com" },
      { protocol: "https", hostname: "**.tiktok.com" },
      { protocol: "https", hostname: "p16-sign-va.tiktokcdn.com" },
      { protocol: "https", hostname: "p77-sign-va.tiktokcdn.com" },
      { protocol: "https", hostname: "p16-sign.tiktokcdn-us.com" },
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.tiktokcdn-us.com" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "**.instagram.com" },
      { protocol: "https", hostname: "**.facebook.com" },
      { protocol: "https", hostname: "**.rapidcdn.app" },
      { protocol: "https", hostname: "**.snapcdn.app" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "**.twimg.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "**.redd.it" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        source: "/(brand|icons|guides)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(sitemap.xml|robots.txt|manifest.webmanifest)",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
    ];
  },
  async redirects() {
    return [
      // Old anchor-style paths and common typos land on the right page
      { source: "/downloaders", destination: "/#platforms", permanent: true },
      { source: "/tiktok", destination: "/tiktok-downloader", permanent: true },
      { source: "/youtube", destination: "/youtube-downloader", permanent: true },
      { source: "/instagram", destination: "/instagram-downloader", permanent: true },
      { source: "/facebook", destination: "/facebook-downloader", permanent: true },
      { source: "/twitter", destination: "/twitter-downloader", permanent: true },
      { source: "/x", destination: "/twitter-downloader", permanent: true },
      { source: "/reddit", destination: "/reddit-downloader", permanent: true },
      { source: "/pinterest", destination: "/pinterest-downloader", permanent: true },
      { source: "/twitch", destination: "/twitch-clip-downloader", permanent: true },
      { source: "/soundcloud", destination: "/soundcloud-downloader", permanent: true },
      { source: "/youtube-mp3", destination: "/youtube-to-mp3", permanent: true },
      { source: "/batch", destination: "/batch-video-downloader", permanent: true },
      { source: "/help", destination: "/faq", permanent: true },
      { source: "/whats-new", destination: "/changelog", permanent: true },
    ];
  },
};

export default nextConfig;
