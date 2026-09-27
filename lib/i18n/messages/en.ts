// English source strings. This file is the contract: every other language
// file is typed against it, so a key added here fails the build until each
// translation has it too.
//
// Rules for every language, English included:
//   - {name} placeholders are filled at runtime; keep them, translate around.
//   - Plural objects need both forms even where the language has only one.
//   - Brand and platform names (ClipKoala, TikTok, YouTube, MP3, HD, ZIP)
//     stay as written.
//   - No em-dashes; repo tooling strips them.

import { client } from "./en-client";
import { site } from "./en-site";

export { client, site };

export type ClientMessages = typeof client;
export type SiteMessages = typeof site;
