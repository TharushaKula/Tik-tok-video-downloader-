import { DEFAULT_BASE_URL } from "./platforms.js";

const input = document.getElementById("base");
const saved = document.getElementById("saved");

chrome.storage.sync.get("baseUrl").then(({ baseUrl }) => {
  input.value = baseUrl || DEFAULT_BASE_URL;
});

document.getElementById("save").addEventListener("click", async () => {
  let value = input.value.trim();
  if (!value) value = DEFAULT_BASE_URL;
  try {
    // Keep only the origin; the deep link path is added by the extension.
    value = new URL(value).origin;
  } catch {
    input.value = DEFAULT_BASE_URL;
    value = DEFAULT_BASE_URL;
  }
  await chrome.storage.sync.set({ baseUrl: value });
  input.value = value;
  saved.style.visibility = "visible";
  setTimeout(() => (saved.style.visibility = "hidden"), 1600);
});
