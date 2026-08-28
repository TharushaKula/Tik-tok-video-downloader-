import {
  detectPlatform,
  PLATFORMS,
  snapLoadUrl,
  DEFAULT_BASE_URL,
} from "./platforms.js";

const dot = document.getElementById("dot");
const statusText = document.getElementById("status-text");
const pageUrl = document.getElementById("page-url");
const go = document.getElementById("go");
const hint = document.getElementById("hint");

document.getElementById("settings").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

async function baseUrl() {
  try {
    const { baseUrl } = await chrome.storage.sync.get("baseUrl");
    return baseUrl || DEFAULT_BASE_URL;
  } catch {
    return DEFAULT_BASE_URL;
  }
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab && tab.url ? tab.url : "";
  const platform = url ? detectPlatform(url) : null;

  if (platform) {
    const meta = PLATFORMS[platform];
    dot.style.background = meta.color;
    statusText.textContent = `${meta.name} page detected`;
    pageUrl.textContent = url;
    go.disabled = false;
    go.addEventListener("click", async () => {
      chrome.tabs.create({ url: snapLoadUrl(await baseUrl(), url) });
      window.close();
    });
  } else {
    statusText.textContent = "Not a supported video page";
    pageUrl.textContent = url && url.startsWith("http") ? url : "";
    go.textContent = "Open SnapLoad";
    go.disabled = false;
    go.addEventListener("click", async () => {
      chrome.tabs.create({ url: await baseUrl() });
      window.close();
    });
    hint.textContent =
      "Open a video on TikTok, YouTube, Instagram, X, Facebook, Reddit, Pinterest, Twitch, or SoundCloud, then click again";
  }
}

init();
