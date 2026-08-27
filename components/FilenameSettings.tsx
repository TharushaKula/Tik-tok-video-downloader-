"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Settings2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  applyTemplate,
  DEFAULT_TEMPLATE,
  loadTemplate,
  saveTemplate,
  TEMPLATE_VARS,
} from "@/lib/filename-template";

// Popover for the download filename template. Variables are inserted by
// clicking their chips; a live preview shows the result for a sample video.
export default function FilenameSettings() {
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTemplate(loadTemplate());
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function commit(next: string) {
    setTemplate(next);
    saveTemplate(next);
  }

  function insertVar(key: string) {
    const token = `{${key}}`;
    const el = inputRef.current;
    if (!el) {
      commit(template + token);
      return;
    }
    const start = el.selectionStart ?? template.length;
    const end = el.selectionEnd ?? template.length;
    const next = template.slice(0, start) + token + template.slice(end);
    commit(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + token.length, start + token.length);
    });
  }

  const preview = applyTemplate(
    template || DEFAULT_TEMPLATE,
    { title: "Sunset timelapse", author: "skywatcher", platform: "youtube" },
    { quality: "1080p" }
  );

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-veil/[0.08] text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
        aria-label="Filename settings"
        title="Filename settings"
      >
        <Settings2 size={14} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-80 rounded-2xl border border-veil/10 bg-raised p-4 shadow-[0_16px_50px_rgb(var(--c-veil)/0.15)]">
          <p className="text-sm font-semibold text-ink-hi">Download filenames</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-3">
            Build your own pattern with the variables below.
          </p>

          <input
            ref={inputRef}
            value={template}
            onChange={(e) => commit(e.target.value)}
            spellCheck={false}
            className="mt-3 h-9 w-full rounded-lg border border-veil/10 bg-veil/[0.03] px-3 font-mono text-xs text-ink-1 outline-none transition-shadow focus:ring-2 focus:ring-accent/50"
            aria-label="Filename template"
          />

          <div className="mt-2 flex flex-wrap gap-1">
            {TEMPLATE_VARS.map((v) => (
              <button
                key={v.key}
                onClick={() => insertVar(v.key)}
                className="focus-ring rounded-md border border-veil/[0.08] px-1.5 py-0.5 font-mono text-[10px] text-ink-2 transition-colors hover:border-accent/40 hover:text-accent"
                title={v.label}
              >
                {`{${v.key}}`}
              </button>
            ))}
          </div>

          <div className="mt-3 rounded-lg bg-veil/[0.04] px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-ink-4">
              Preview
            </p>
            <p className="mt-0.5 truncate font-mono text-xs text-ink-1">
              {preview}.mp4
            </p>
          </div>

          <button
            onClick={() => {
              commit(DEFAULT_TEMPLATE);
              toast.success("Filename pattern reset");
            }}
            className="focus-ring mt-3 flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-ink-3 transition-colors hover:text-ink-1"
          >
            <RotateCcw size={11} />
            Reset to default
          </button>
        </div>
      )}
    </div>
  );
}
