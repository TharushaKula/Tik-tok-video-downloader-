import Breadcrumbs from "./Breadcrumbs";
import type { Crumb } from "@/lib/seo";

interface PageHeaderProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}

// Consistent top-of-page block for every secondary page.
export default function PageHeader({
  crumbs,
  eyebrow,
  title,
  lede,
  children,
}: PageHeaderProps) {
  return (
    <header className="rise">
      <Breadcrumbs crumbs={crumbs} />
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h1 className="text-balance text-3xl font-bold leading-[1.1] text-ink-hi sm:text-[2.6rem]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2 sm:text-base">
          {lede}
        </p>
      ) : null}
      {children}
    </header>
  );
}
