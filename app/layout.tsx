import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ToastProvider from "@/components/ToastProvider";
import PwaSetup from "@/components/PwaSetup";
import JsonLd from "@/components/JsonLd";
import { SITE, SITE_URL } from "@/lib/site";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import {
  graph,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/seo";

// Body face: Inter for dense UI text. Display face: Nunito, a rounded
// geometric sans that matches the ClipKoala wordmark, for headings. Both self-hosted by next/font (no third-party
// requests, automatic preload, size-adjusted fallbacks to avoid CLS).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// Runs before first paint: migrates any legacy "snapload:*" localStorage keys
// to "clipkoala:*" (so saved videos and preferences survive the rename), then
// applies the saved theme so the page never flashes the wrong colors.
const THEME_INIT = `(function(){try{var L=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf("snapload:")===0)L.push(k)}for(var j=0;j<L.length;j++){var n="clipkoala:"+L[j].slice(9);if(localStorage.getItem(n)===null)localStorage.setItem(n,localStorage.getItem(L[j]));localStorage.removeItem(L[j])}var p=localStorage.getItem("clipkoala:theme");var t=p==="light"||p==="dark"?p:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name}: Free Video Downloader, No Sign-Up`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE.name,
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: `${SITE.name}: guides, answers, and updates` },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Paste the Search Console HTML-tag token into this env var to verify.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b14" },
    { media: "(prefers-color-scheme: light)", color: "#f8f7fc" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${nunito.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="font-sans antialiased bg-base text-ink-1">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-btn focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-btn-ink"
        >
          Skip to content
        </a>
        <ToastProvider />
        <PwaSetup />
        {children}
        <Analytics />

        {/* Google Analytics 4. Loaded after hydration so it never competes
            with the downloader for the main thread on first paint.
            Unlike Vercel Analytics this does set first-party cookies (_ga,
            _ga_*) and sends data to Google, which is why the privacy policy
            and the About page describe both trackers separately. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        {/* Site-wide entities: who publishes this, what the site is, what the app does */}
        <JsonLd
          data={graph(
            organizationSchema(),
            websiteSchema(),
            softwareApplicationSchema()
          )}
        />
      </body>
    </html>
  );
}
