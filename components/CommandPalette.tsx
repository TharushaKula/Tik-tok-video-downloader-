"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  type LucideIcon,
  ClipboardPaste,
  CornerDownLeft,
  FileText,
  History,
  Home,
  Layers,
  ListChecks,
  Monitor,
  Moon,
  Search,
  Activity,
  BookOpen,
  Sparkles,
  Star,
  Sun,
  Volume2,
} from "lucide-react";
import toast from "react-hot-toast";
import { PLATFORMS } from "@/lib/platforms";
import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";
import {
  isSoundEnabled,
  playCompletionChime,
  setSoundEnabled,
} from "@/lib/sound";
import { setThemePref } from "./ThemeToggle";
import type { RecentEntry } from "./RecentDownloads";
import type { FavoriteEntry } from "@/lib/favorites";

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  group: string;
  keywords?: string;
  icon: LucideIcon;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  recent: RecentEntry[];
  favorites: FavoriteEntry[];
  onSelectUrl: (url: string) => void;
  onPasteFetch: () => void;
}

export default function CommandPalette({
  open,
  onClose,
  recent,
  favorites,
  onSelectUrl,
  onPasteFetch,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  // Build the full command list from current state
  const items = useMemo<CommandItem[]>(() => {
    const go = (href: string) => () => {
      onClose();
      router.push(href);
    };
    const fetchUrl = (url: string) => () => {
      onClose();
      onSelectUrl(url);
    };

    const list: CommandItem[] = [
      {
        id: "paste",
        label: "Paste a link and fetch",
        hint: "from clipboard",
        group: "Actions",
        keywords: "paste clipboard download fetch",
        icon: ClipboardPaste,
        run: () => {
          onClose();
          onPasteFetch();
        },
      },
      {
        id: "theme-system",
        label: "Use system theme",
        group: "Theme",
        keywords: "theme auto system appearance",
        icon: Monitor,
        run: () => {
          setThemePref("system");
          onClose();
        },
      },
      {
        id: "theme-light",
        label: "Switch to light theme",
        group: "Theme",
        keywords: "theme light appearance bright",
        icon: Sun,
        run: () => {
          setThemePref("light");
          onClose();
        },
      },
      {
        id: "theme-dark",
        label: "Switch to dark theme",
        group: "Theme",
        keywords: "theme dark appearance night",
        icon: Moon,
        run: () => {
          setThemePref("dark");
          onClose();
        },
      },
      {
        id: "toggle-sound",
        label: "Toggle completion sound",
        group: "Preferences",
        keywords: "sound chime mute audio volume ding notification quiet",
        icon: Volume2,
        run: () => {
          const next = !isSoundEnabled();
          setSoundEnabled(next);
          if (next) playCompletionChime(); // instant preview of the chime
          toast.success(
            next
              ? "Completion sound on  you'll hear a soft chime when conversions finish"
              : "Completion sound off"
          );
          onClose();
        },
      },
    ];

    favorites.slice(0, 6).forEach((f, i) => {
      list.push({
        id: `fav-${i}`,
        label: f.title,
        hint: PLATFORMS[f.platform]?.name,
        group: "Saved",
        keywords: `saved favorite ${f.title} ${f.platform}`,
        icon: Star,
        run: fetchUrl(f.url),
      });
    });

    recent.slice(0, 6).forEach((r, i) => {
      list.push({
        id: `recent-${i}`,
        label: r.title,
        hint: PLATFORMS[r.platform]?.name,
        group: "Recent",
        keywords: `recent history ${r.title} ${r.platform}`,
        icon: History,
        run: fetchUrl(r.url),
      });
    });

    list.push(
      {
        id: "go-home",
        label: "Home",
        group: "Go to",
        keywords: "home top downloader",
        icon: Home,
        run: go("/"),
      },
      {
        id: "go-platforms",
        label: "Supported platforms",
        group: "Go to",
        keywords: "platforms supported",
        icon: Layers,
        run: go("/#platforms"),
      },
      {
        id: "go-how",
        label: "How it works",
        group: "Go to",
        keywords: "how it works steps guide",
        icon: ListChecks,
        run: go("/#how-it-works"),
      },
      {
        id: "go-faq",
        label: "FAQ",
        group: "Go to",
        keywords: "faq questions help",
        icon: FileText,
        run: go("/#faq"),
      },
      {
        id: "go-changelog",
        label: "What's new",
        group: "Go to",
        keywords: "changelog updates new whats",
        icon: Sparkles,
        run: go("/changelog"),
      },
      {
        id: "go-status",
        label: "Status  is SnapLoad working?",
        group: "Go to",
        keywords: "status up down outage broken working health",
        icon: Activity,
        run: go("/status"),
      },
      {
        id: "go-guides",
        label: "How-to guides",
        group: "Go to",
        keywords: "guides how to help tutorial blog watermark mp3 batch",
        icon: BookOpen,
        run: go("/guides"),
      }
    );

    LANDING_SLUGS.forEach((slug) => {
      const page = LANDING_PAGES[slug];
      const name = PLATFORMS[page.platform]?.name ?? slug;
      list.push({
        id: `landing-${slug}`,
        label: `${name} downloader`,
        group: "Go to",
        keywords: `${name} ${slug} downloader page`,
        icon: Layers,
        run: go(`/${slug}`),
      });
    });

    return list;
  }, [recent, favorites, onClose, onSelectUrl, onPasteFetch, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.group} ${it.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Reset transient state each time the palette opens; manage focus.
  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement;
      setQuery("");
      setActive(0);
      // Focus after paint so the portal node exists
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      restoreFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  // Keep the active row scrolled into view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) =>
        filtered.length ? (a - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  }

  // Group the filtered items in display order while keeping a global index
  let runningIndex = -1;
  const groups: { name: string; items: { item: CommandItem; index: number }[] }[] =
    [];
  for (const item of filtered) {
    runningIndex += 1;
    const idx = runningIndex;
    const last = groups[groups.length - 1];
    if (last && last.name === item.group) {
      last.items.push({ item, index: idx });
    } else {
      groups.push({ name: item.group, items: [{ item, index: idx }] });
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-veil/10 bg-raised shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-veil/[0.08] px-4">
          <Search size={16} className="shrink-0 text-ink-3" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search commands, saved videos, pages…"
            className="h-12 w-full bg-transparent text-sm text-ink-1 placeholder-ink-3 outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={
              filtered[active] ? `cmd-${filtered[active].id}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden shrink-0 rounded border border-veil/10 bg-veil/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-ink-3 sm:block">
            Esc
          </kbd>
        </div>

        <div
          ref={listRef}
          id="command-list"
          role="listbox"
          className="max-h-[52vh] overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-ink-3">
              No matching commands
            </p>
          ) : (
            groups.map((group) => (
              <div key={group.name} className="mb-1">
                <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-4">
                  {group.name}
                </p>
                {group.items.map(({ item, index }) => {
                  const Icon = item.icon;
                  const isActive = index === active;
                  return (
                    <button
                      key={item.id}
                      id={`cmd-${item.id}`}
                      data-index={index}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => item.run()}
                      onMouseMove={() => setActive(index)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                        isActive ? "bg-veil/[0.07]" : ""
                      }`}
                    >
                      <Icon
                        size={15}
                        className={isActive ? "text-ink-1" : "text-ink-3"}
                      />
                      <span className="min-w-0 flex-1 truncate text-sm text-ink-1">
                        {item.label}
                      </span>
                      {item.hint && (
                        <span className="shrink-0 text-[11px] text-ink-4">
                          {item.hint}
                        </span>
                      )}
                      {isActive && (
                        <CornerDownLeft
                          size={13}
                          className="shrink-0 text-ink-4"
                          aria-hidden
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
