# SnapLoad browser extension

One click to save the video you're watching. The extension is a thin,
privacy-first launcher: it detects the platform of the current tab and opens
SnapLoad's `/?url=` deep link, where the site fetches the video as if you had
pasted the link. No content scripts are injected into video sites, no browsing
data is collected, and there are no host permissions.

## What you get

- **Toolbar button**: on a supported video page the popup shows the platform
  and a one-click "Download with SnapLoad" button.
- **Right-click menus**: "Download link with SnapLoad" on any link, and
  "Download this page's video" on any page or video element.
- **Settings**: point the extension at your own SnapLoad instance
  (defaults to https://snapload.app).

Supported: TikTok, YouTube (videos, Shorts, playlists, channels), Instagram,
X (Twitter), Facebook, Reddit, Pinterest, Twitch clips, SoundCloud.

## Install (unpacked, for development)

1. Open `chrome://extensions` (or `edge://extensions`).
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this `extension/` folder.

Works in any Chromium browser (Chrome, Edge, Brave, Arc, Opera).

## Package for the Chrome Web Store

```bash
npm run ext:pack
```

This produces `snapload-extension.zip` in the repository root, ready to upload
at https://chrome.google.com/webstore/devconsole.

## Permissions, explained

| Permission     | Why                                                        |
| -------------- | ---------------------------------------------------------- |
| `activeTab`    | Read the current tab's URL only when you click the button   |
| `contextMenus` | The right-click "Download with SnapLoad" items              |
| `storage`      | Remember the SnapLoad address from the settings page        |

No `tabs`, no `host_permissions`, no background browsing access.

## Files

- `manifest.json`  Manifest V3 definition
- `platforms.js`  URL platform detection (mirrors the site's `lib/validators.ts`)
- `popup.html/js`  toolbar popup
- `background.js`  service worker (context menus)
- `options.html/js`  settings page
- `icons/generate.mjs`  regenerates the PNG icons (`node extension/icons/generate.mjs`)
