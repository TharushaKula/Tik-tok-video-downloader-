import Link from "next/link";
import Image from "next/image";
import { Activity, EyeOff, Lock, Wallet } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";

// Icons and links per point, in the same order as site.trust.points.
const POINTS = [
  { icon: Wallet },
  { icon: EyeOff, href: "/privacy" },
  { icon: Lock },
  { icon: Activity, href: "/status" },
];

export default function TrustSection({ locale = "en" }: { locale?: Locale }) {
  const { trust } = getMessages(locale).site;
  const points = POINTS.map((p, i) => ({ ...p, ...trust.points[i] }));
  return (
    <section
      id="trust"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="trust-title"
    >
      <div className="card overflow-hidden">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="reveal">
            <p className="eyebrow mb-2">{trust.eyebrow}</p>
            <h2 id="trust-title" className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
              {trust.title}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-2">
              {trust.body}
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {points.map(({ icon: Icon, title, body, href }) => (
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
              alt={trust.mascotAlt}
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
