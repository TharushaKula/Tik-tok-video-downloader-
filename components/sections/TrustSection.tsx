import Link from "next/link";
import Image from "next/image";
import { Activity, EyeOff, Lock, Wallet } from "lucide-react";

const POINTS = [
  {
    icon: Wallet,
    title: "Free, with no catch",
    body: "No account, no paywall, no download limits, no 'premium' quality tier. Every format is available to everyone.",
  },
  {
    icon: EyeOff,
    title: "We do not keep your links",
    body: "Links are resolved and discarded. Files stream through, never stored. History and favorites live only in your browser.",
    href: "/privacy",
  },
  {
    icon: Lock,
    title: "Never asks for your passwords",
    body: "ClipKoala only reads public posts. It cannot access private accounts and never requests platform credentials.",
  },
  {
    icon: Activity,
    title: "Honest about uptime",
    body: "A public status page runs live checks against every platform, so you can see for yourself when something is down.",
    href: "/status",
  },
];

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="trust-title"
    >
      <div className="card overflow-hidden">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="reveal">
            <p className="eyebrow mb-2">Built on trust</p>
            <h2 id="trust-title" className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
              A downloader you can recommend to your least technical friend
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-2">
              Most download sites are a maze of fake buttons and pop-ups. ClipKoala is one
              box, one result, and a clear list of what you are about to save.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {POINTS.map(({ icon: Icon, title, body, href }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={15} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink-hi">
                      {href ? (
                        <Link href={href} className="focus-ring rounded hover:text-accent">
                          {title}
                        </Link>
                      ) : (
                        title
                      )}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-3">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal relative mx-auto flex w-full max-w-sm items-center justify-center">
            <div
              className="absolute inset-8 rounded-full bg-brand opacity-25 blur-3xl"
              aria-hidden
            />
            <Image
              src="/brand/mascot.webp"
              alt="The ClipKoala koala hugging a clapperboard with a play button"
              width={420}
              height={420}
              sizes="(max-width: 640px) 80vw, 420px"
              className="relative h-auto w-full max-w-[420px] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
