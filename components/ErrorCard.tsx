"use client";

import { AlertTriangle, RotateCcw, X } from "lucide-react";

interface ErrorCardProps {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
}

export default function ErrorCard({
  message,
  onRetry,
  onDismiss,
}: ErrorCardProps) {
  return (
    <div
      className="w-full rounded-2xl border border-red-400/20 bg-red-400/[0.05] p-5"
      role="alert"
    >
      <div className="flex items-start gap-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-400/10">
          <AlertTriangle size={16} className="text-red-400" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-slate-100">
            Couldn&apos;t fetch that video
          </h3>
          <p className="mt-1 break-words text-sm leading-relaxed text-red-200/75">
            {message}
          </p>
          <ul className="mt-3 space-y-1 text-xs leading-relaxed text-slate-500">
            <li>· Check that the link opens in your browser</li>
            <li>· Private, age-restricted, or region-locked posts can&apos;t be fetched</li>
            <li>· Try copying the link again from the app&apos;s share button</li>
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={onRetry}
              className="focus-ring inline-flex h-9 items-center gap-1.5 rounded-lg bg-white px-3.5 text-xs font-semibold text-[#0a0a0f] transition-all hover:bg-slate-200 active:scale-[0.98]"
            >
              <RotateCcw size={12} />
              Try again
            </button>
            <button
              onClick={onDismiss}
              className="focus-ring inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.08] px-3.5 text-xs font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-slate-200"
            >
              <X size={12} />
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
