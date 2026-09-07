import { Link2, Wand2, Download } from "lucide-react";

const STEPS = [
  {
    number: "1",
    icon: Link2,
    title: "Copy a link",
    desc: "Tap Share in TikTok, YouTube, Instagram, or any supported app and copy the video link.",
  },
  {
    number: "2",
    icon: Wand2,
    title: "Paste it into ClipKoala",
    desc: "The platform is detected automatically and the video appears with every available format in about two seconds.",
  },
  {
    number: "3",
    icon: Download,
    title: "Save your file",
    desc: "Pick a quality, MP4 in HD or audio as MP3, and it lands in your downloads, named after the video.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="how-title"
    >
      <div className="reveal mb-10 text-center">
        <p className="eyebrow mb-2">How it works</p>
        <h2 id="how-title" className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
          Three steps, about ten seconds
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-2">
          No account, no app, nothing to install. Works on any phone or computer.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map(({ number, icon: Icon, title, desc }) => (
          <li key={number} className="reveal card relative p-6">
            <span
              className="absolute right-5 top-5 font-display text-4xl font-black text-veil/[0.06]"
              aria-hidden
            >
              {number}
            </span>
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-[0_8px_20px_-10px_rgb(var(--c-btn)/0.8)]">
              <Icon size={18} aria-hidden />
            </span>
            <h3 className="mb-1.5 text-base font-extrabold text-ink-hi">{title}</h3>
            <p className="text-sm leading-relaxed text-ink-2">{desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
