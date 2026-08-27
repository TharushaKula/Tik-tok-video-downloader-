"use client";

import { useEffect } from "react";

// Registers the service worker that makes SnapLoad installable
// (add to home screen + Android share target).
export default function PwaSetup() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Not fatal — the site works fine without installability
      });
    }
  }, []);
  return null;
}
