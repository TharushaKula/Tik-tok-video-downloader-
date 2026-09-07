"use client";

import { useEffect } from "react";
import { migrateLegacyStorage } from "@/lib/storage";

// Registers the service worker that makes ClipKoala installable
// (add to home screen + Android share target).
export default function PwaSetup() {
  useEffect(() => {
    // Belt and braces: the inline script in layout.tsx already did this
    migrateLegacyStorage();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Not fatal  the site works fine without installability
      });
    }
  }, []);
  return null;
}
