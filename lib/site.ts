// Public origin of the deployed site. Set NEXT_PUBLIC_SITE_URL in the Vercel
// project (e.g. https://snapload.app) so sitemaps, canonicals, and OG tags
// point at the real domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://snapload.app";
