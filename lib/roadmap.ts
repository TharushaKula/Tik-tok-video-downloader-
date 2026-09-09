// The public roadmap.
//
// The rule this file lives by: no dates, ever. A roadmap with dates on it is
// a promise, and a solo project shipping against nine platforms that change
// weekly cannot keep dated promises. Ordering by confidence is honest and
// still useful. Anything that ships moves out of here and into the changelog.

export type RoadmapStatus = "building" | "next" | "considering" | "declined";

export interface RoadmapItem {
  title: string;
  body: string;
  status: RoadmapStatus;
}

export const ROADMAP_STATUS: Record<
  RoadmapStatus,
  { label: string; blurb: string }
> = {
  building: {
    label: "Being worked on",
    blurb: "Actively in progress. These are the closest to shipping.",
  },
  next: {
    label: "Next up",
    blurb: "Decided and queued, but not started. No date attached.",
  },
  considering: {
    label: "Under consideration",
    blurb:
      "Worth doing if enough people want it, or if the technical risk turns out to be smaller than it looks.",
  },
  declined: {
    label: "Deliberately not doing",
    blurb:
      "Asked for often enough to be worth answering in public, and turned down on purpose.",
  },
};

export const ROADMAP: RoadmapItem[] = [
  {
    status: "building",
    title: "Measuring where people actually give up",
    body: "Page views cannot show whether a visitor pasted a link and got nothing. The full paste-to-download funnel is now recorded, without ever storing the link you pasted, so the worst step can be fixed rather than guessed at.",
  },
  {
    status: "building",
    title: "Pages for the problems, not just the platforms",
    body: "Reddit videos with no sound, TikTok's Save option greyed out, expired Stories. These are the things people actually search for, and each one deserves a straight answer rather than a marketing page.",
  },
  {
    status: "next",
    title: "TikTok slideshows merged into one video",
    body: "Slides and their soundtrack currently download separately. Combining them into a single MP4 is the obvious next step and is mostly a question of doing the muxing carefully.",
  },
  {
    status: "next",
    title: "Resuming an interrupted download",
    body: "A long YouTube conversion that dies at 80% currently starts over. Picking up where it left off is worth the plumbing.",
  },
  {
    status: "next",
    title: "SoundCloud playlists and profiles",
    body: "Only individual tracks resolve today. Playlist and profile links are the most-requested gap on that platform.",
  },
  {
    status: "considering",
    title: "Twitch VODs and past broadcasts",
    body: "Clips work; full VODs do not. They are long, large, and served differently, so this is real work rather than a small extension of what exists.",
  },
  {
    status: "considering",
    title: "A Firefox extension",
    body: "The Chrome and Edge extension exists. Firefox needs its own build with its own permission model, and it is only worth doing carefully.",
  },
  {
    status: "considering",
    title: "More platforms",
    body: "Requests arrive regularly for Snapchat Spotlight, Threads, LinkedIn, and Bilibili. Each is a separate resolver with its own failure modes, so they get added when they genuinely work, not when they are announced.",
  },
  {
    status: "considering",
    title: "Chapter splitting for long YouTube videos",
    body: "Turning a two-hour talk into one file per chapter would make lecture and podcast workflows considerably better.",
  },
  {
    status: "declined",
    title: "Downloading private or login-walled content",
    body: "This would require either your platform credentials or a vulnerability. Both are lines worth refusing to cross, and any tool that offers it should be treated with suspicion.",
  },
  {
    status: "declined",
    title: "4K video",
    body: "The quality ceiling stays at 1080p. Higher resolutions mean much longer conversions and much larger files for a use case this tool is not the right answer to. For mastering-quality footage, licence it properly.",
  },
  {
    status: "declined",
    title: "Accounts, plans, and a paid tier",
    body: "No sign-up is the point. Adding accounts would mean storing things about you, which is the one promise on this site worth keeping absolutely.",
  },
  {
    status: "declined",
    title: "Ads in the download path",
    body: "Interstitials, countdown timers, and fake download buttons are how this category earns its reputation. They will not appear between you and your file.",
  },
];
