import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMessages, localePath, type Locale } from "@/lib/i18n";

interface CtaBannerProps {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
  locale?: Locale;
}

export default function CtaBanner({
  title,
  body,
  href,
  label,
  locale = "en",
}: CtaBannerProps) {
  const { cta } = getMessages(locale).site;
  return (
    <section className="mx-auto w-full max-w-page px-4 pb-20 sm:px-6" aria-label={cta.aria}>
      <div className="reveal relative overflow-hidden rounded-3xl bg-brand p-8 text-center text-white sm:p-12">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <h2 className="text-balance text-2xl font-black sm:text-3xl">{title ?? cta.title}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/80">{body ?? cta.body}</p>
        <Link
          href={href ?? localePath(locale, "/")}
          className="focus-ring mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-[15px] font-bold text-[#18192a] shadow-lg transition-transform hover:-translate-y-0.5"
        >
          {label ?? cta.label}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
