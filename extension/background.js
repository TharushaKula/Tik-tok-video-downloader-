// Service worker: right-click context menus. The popup handles the toolbar
// flow; everything just opens SnapLoad's ?url= deep link in a new tab.
import { snapLoadUrl, DEFAULT_BASE_URL } from "./platforms.js";

async function baseUrl() {
  try {
    const { baseUrl } = await chrome.storage.sync.get("baseUrl");
    return baseUrl || DEFAULT_BASE_URL;
  } catch {
    return DEFAULT_BASE_URL;
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "snapload-link",
    title: "Download link with SnapLoad",
    contexts: ["link"],
  });
  chrome.contextMenus.create({
    id: "snapload-page",
    title: "Download this page's video with SnapLoad",
    contexts: ["page", "video"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const target =
    info.menuItemId === "snapload-link" ? info.linkUrl : info.pageUrl;
  if (!target) return;
  const url = snapLoadUrl(await baseUrl(), target);
  chrome.tabs.create({ url, index: tab ? tab.index + 1 : undefined });
});
