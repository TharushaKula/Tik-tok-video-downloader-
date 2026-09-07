import Image from "next/image";
import { PLATFORMS, PLATFORM_IDS } from "@/lib/platforms";
import PlatformIcon from "../PlatformIcon";

// Home hero: the value proposition, the mascot, and (below, injected by the
// page) the downloader tool. Text renders on the server so the H1 and copy
// are in the first HTML byte for crawlers and for LCP.
export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative mx-auto w-full max-w-page px-4 pb-8 pt-10 sm:px-6 sm:pt-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rise text-center lg:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-veil/[0.08] bg-raised/60 px-3 py-1 text-xs font-medium text-ink-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
            Free forever · No sign-up · 9 platforms
          </p>
          <h1 className="text-balance text-4xl font-black leading-[1.05] text-ink-hi sm:text-5xl lg:text-[3.6rem]">
            Download any video.
            <br />
            <span className="text-brand">Clean, fast, yours.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-2 lg:mx-0 sm:text-lg">
            ClipKoala saves videos from TikTok, YouTube, Instagram, Facebook, X,
            Reddit, Pinterest, Twitch, and SoundCloud in HD, without watermarks.
            Paste a link, pick a quality, done. Or grab just the audio as MP3.
          </p>
          <ul
            className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            aria-label="Supported platforms"
          >
            {PLATFORM_IDS.map((id) => (
              <li
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full border border-veil/[0.08] bg-raised/50 px-2.5 py-1 text-xs text-ink-2"
              >
                <PlatformIcon platform={id} size={12} className={PLATFORMS[id].text} />
                {PLATFORMS[id].name}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise rise-2 relative mx-auto hidden w-full max-w-xs lg:block">
          <div
            className="absolute inset-6 rounded-full bg-brand opacity-30 blur-3xl"
            aria-hidden
          />
          <Image
            src="/brand/mascot.webp"
            alt="ClipKoala mascot: a koala hugging a clapperboard with a play button"
            width={380}
            height={380}
            priority
            sizes="380px"
            className="relative h-auto w-full drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="rise rise-3 mx-auto mt-10 w-full max-w-3xl">{children}</div>
    </section>
  );
}
