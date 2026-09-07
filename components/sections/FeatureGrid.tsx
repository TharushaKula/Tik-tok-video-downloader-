import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ClipboardPaste,
  Eraser,
  FileText,
  Gauge,
  Layers,
  Music2,
  Puzzle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  type LucideProps,
} from "lucide-react";
import type { Feature, FeatureIcon } from "@/lib/features";

const ICONS: Record<FeatureIcon, React.ComponentType<LucideProps>> = {
  eraser: Eraser,
  sparkles: Sparkles,
  music: Music2,
  layers: Layers,
  shield: ShieldCheck,
  gauge: Gauge,
  clipboard: ClipboardPaste,
  star: Star,
  smartphone: Smartphone,
  puzzle: Puzzle,
  file: FileText,
  activity: Activity,
};

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3;
}

export default function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  return (
    <ul
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : ""
      }`}
    >
      {features.map((f) => {
        const Icon = ICONS[f.icon];
        const inner = (
          <>
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
              <Icon size={18} aria-hidden />
            </span>
            <h3 className="mb-1.5 flex items-center gap-1.5 text-base font-extrabold text-ink-hi">
              {f.title}
              {f.href && (
                <ArrowRight
                  size={14}
                  className="text-ink-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              )}
            </h3>
            <p className="text-sm leading-relaxed text-ink-2">{f.body}</p>
          </>
        );
        return (
          <li key={f.title} className="reveal">
            {f.href ? (
              <Link href={f.href} className="focus-ring card card-hover group flex h-full flex-col p-6">
                {inner}
              </Link>
            ) : (
              <div className="card flex h-full flex-col p-6">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
