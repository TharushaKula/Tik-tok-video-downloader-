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
import { LANDING_FOR_PLATFORM } from "@/lib/landing";
import { LOCALIZED_LANDING_SLUGS } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
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
  const { t, locale, href: localHref, landingNames } = useI18n();
  const p = t.palette;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  // Build the full command list from current state
  const items = useMemo<CommandItem[]>(() => {
    // Pages that exist in this language stay in it; the rest are English.
    const go = (href: string) => () => {
      onClose();
      router.push(localHref(href));
    };
    const english = locale === "en";
    const fetchUrl = (url: string) => () => {
      onClose();
      onSelectUrl(url);
    };

    const list: CommandItem[] = [
      {
        id: "paste",
        label: p.paste,
        hint: p.pasteHint,
        group: p.groups.actions,
        keywords: "paste clipboard download fetch",
        icon: ClipboardPaste,
        run: () => {
          onClose();
          onPasteFetch();
        },
      },
      {
        id: "theme-system",
        label: p.themeSystem,
        group: p.groups.theme,
        keywords: "theme auto system appearance",
        icon: Monitor,
        run: () => {
          setThemePref("system");
          onClose();
        },
      },
      {
        id: "theme-light",
        label: p.themeLight,
        group: p.groups.theme,
        keywords: "theme light appearance bright",
        icon: Sun,
        run: () => {
          setThemePref("light");
          onClose();
        },
      },
      {
        id: "theme-dark",
        label: p.themeDark,
        group: p.groups.theme,
        keywords: "theme dark appearance night",
        icon: Moon,
        run: () => {
          setThemePref("dark");
          onClose();
        },
      },
      {
        id: "toggle-sound",
        label: p.toggleSound,
        group: p.groups.preferences,
        keywords: "sound chime mute audio volume ding notification quiet",
        icon: Volume2,
        run: () => {
          const next = !isSoundEnabled();
          setSoundEnabled(next);
          if (next) playCompletionChime(); // instant preview of the chime
          toast.success(next ? p.soundOn : p.soundOff);
          onClose();
        },
      },
    ];

    favorites.slice(0, 6).forEach((f, i) => {
      list.push({
        id: `fav-${i}`,
        label: f.title,
        hint: PLATFORMS[f.platform]?.name,
        group: p.groups.saved,
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
        group: p.groups.recent,
        keywords: `recent history ${r.title} ${r.platform}`,
        icon: History,
        run: fetchUrl(r.url),
      });
    });

    const goTo = p.groups.goTo;
    list.push(
      {
        id: "go-home",
        label: p.home,
        group: goTo,
        keywords: "home top downloader",
        icon: Home,
        run: go("/"),
      },
      {
        id: "go-platforms",
        label: p.platforms,
        group: goTo,
        keywords: "platforms supported",
        icon: Layers,
        run: go("/#platforms"),
      },
      {
        id: "go-how",
        label: p.howItWorks,
        group: goTo,
        keywords: "how it works steps guide",
        icon: ListChecks,
        run: go("/#how-it-works"),
      },
      {
        id: "go-faq",
        label: p.faq,
        group: goTo,
        keywords: "faq questions help",
        icon: FileText,
        // The full FAQ page is English; translated pages have their own
        // questions section on the home page.
        run: go(english ? "/faq" : "/#faq"),
      }
    );
    // English-only pages are offered on English pages only.
    if (english) {
      list.push(
        {
          id: "go-changelog",
          label: p.changelog,
          group: goTo,
          keywords: "changelog updates new whats",
          icon: Sparkles,
          run: go("/changelog"),
        },
        {
          id: "go-status",
          label: p.status,
          group: goTo,
          keywords: "status up down outage broken working health",
          icon: Activity,
          run: go("/status"),
        },
        {
          id: "go-features",
          label: p.features,
          group: goTo,
          keywords: "features what can it do",
          icon: Sparkles,
          run: go("/features"),
        },
        {
          id: "go-extension",
          label: p.extension,
          group: goTo,
          keywords: "extension chrome edge browser addon",
          icon: Layers,
          run: go("/extension"),
        },
        {
          id: "go-about",
          label: p.about,
          group: goTo,
          keywords: "about who privacy trust",
          icon: FileText,
          run: go("/about"),
        },
        {
          id: "go-guides",
          label: p.guides,
          group: goTo,
          keywords: "guides how to help tutorial blog watermark mp3 batch",
          icon: BookOpen,
          run: go("/guides"),
        }
      );
    }

    // Platform names are matched too, so "tiktok" finds the TikTok page in
    // any language.
    const platformFor = Object.fromEntries(
      Object.entries(LANDING_FOR_PLATFORM).map(([id, slug]) => [slug, id])
    ) as Record<string, keyof typeof PLATFORMS>;
    LOCALIZED_LANDING_SLUGS.forEach((slug) => {
      const platform = platformFor[slug];
      const name = landingNames[slug] ?? slug;
      list.push({
        id: `landing-${slug}`,
        label: name,
        group: goTo,
        keywords: `${platform ? PLATFORMS[platform].name : ""} ${slug} downloader page`,
        icon: Layers,
        run: go(`/${slug}`),
      });
    });

    return list;
  }, [
    recent,
    favorites,
    onClose,
    onSelectUrl,
    onPasteFetch,
    router,
    p,
    locale,
    localHref,
    landingNames,
  ]);

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
      aria-label={p.aria}
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
            placeholder={p.placeholder}
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
              {p.noMatch}
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
