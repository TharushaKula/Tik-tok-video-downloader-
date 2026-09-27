import { Link2, Wand2, Download } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";

const STEP_ICONS = [Link2, Wand2, Download];

export default function HowItWorks({ locale = "en" }: { locale?: Locale }) {
  const { how } = getMessages(locale).site;
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="how-title"
    >
      <div className="reveal mb-10 text-center">
        <p className="eyebrow mb-2">{how.eyebrow}</p>
        <h2 id="how-title" className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
          {how.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-2">
          {how.body}
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {how.steps.map(({ title, desc }, i) => {
          const Icon = STEP_ICONS[i];
          const number = String(i + 1);
          return (
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
          );
        })}
      </ol>
    </section>
  );
}
