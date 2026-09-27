"use client";

import Link from "next/link";
import { AlertTriangle, RotateCcw, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/client";
import { fmt } from "@/lib/i18n/format";

interface ErrorCardProps {
  message: string;
  /** The server's original (English) message, under a translated one */
  detail?: string;
  onRetry: () => void;
  onDismiss: () => void;
}

export default function ErrorCard({
  message,
  detail,
  onRetry,
  onDismiss,
}: ErrorCardProps) {
  const { t } = useI18n();
  return (
    <div
      className="w-full rounded-2xl border border-danger/20 bg-danger/[0.05] p-5"
      role="alert"
    >
      <div className="flex items-start gap-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-danger/10">
          <AlertTriangle size={16} className="text-danger" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-ink-1">
            {t.errors.title}
          </h3>
          <p className="mt-1 break-words text-sm leading-relaxed text-danger-ink">
            {message}
          </p>
          {detail && detail !== message && (
            <p className="mt-1 break-words text-xs leading-relaxed text-ink-4" lang="en">
              {fmt(t.errors.details, { message: detail })}
            </p>
          )}
          <ul className="mt-3 space-y-1 text-xs leading-relaxed text-ink-3">
            <li>· {t.errors.tipOpens}</li>
            <li>· {t.errors.tipPrivate}</li>
            <li>· {t.errors.tipRecopy}</li>
            <li>
              · {t.errors.tipStatusBefore}{" "}
              <Link
                href="/status"
                className="focus-ring rounded font-medium text-ink-2 underline decoration-veil/30 underline-offset-2 transition-colors hover:text-ink-1"
              >
                {t.errors.tipStatusLink}
              </Link>{" "}
              {t.errors.tipStatusAfter}
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={onRetry}
              className="focus-ring inline-flex h-9 items-center gap-1.5 rounded-lg bg-btn px-3.5 text-xs font-semibold text-btn-ink transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <RotateCcw size={12} />
              {t.errors.tryAgain}
            </button>
            <button
              onClick={onDismiss}
              className="focus-ring inline-flex h-9 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-3.5 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
            >
              <X size={12} />
              {t.common.dismiss}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
