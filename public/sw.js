// Minimal service worker: enough for installability and the share target.
// No fetch interception — every request goes straight to the network, so a
// deploy can never be masked by a stale cache.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
