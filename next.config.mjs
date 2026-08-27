/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // archiver's package exports map trips webpack  load it at runtime
    serverComponentsExternalPackages: ["archiver"],
  },
  images: {
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
};

export default nextConfig;
