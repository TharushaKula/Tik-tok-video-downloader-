/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep youtubei.js out of webpack's bundle entirely.
  // Without this, webpack tries to bundle the ESM package, blows past
  // Vercel's 50 MB function-bundle limit, and strips Node built-ins like vm.
  serverExternalPackages: ["youtubei.js"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.tikwm.com" },
      { protocol: "https", hostname: "**.tiktok.com" },
      { protocol: "https", hostname: "p16-sign-va.tiktokcdn.com" },
      { protocol: "https", hostname: "p77-sign-va.tiktokcdn.com" },
      { protocol: "https", hostname: "p16-sign.tiktokcdn-us.com" },
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.tiktokcdn-us.com" },
    ],
  },
};

export default nextConfig;
