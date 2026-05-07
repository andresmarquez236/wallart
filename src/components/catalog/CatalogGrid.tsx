"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Category, Artwork, ArtworkTheme, CATALOG_THEMES } from "@/lib/catalog-data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface CatalogGridProps {
  categories: Category[];
  activeCategory: string | "all";
  activeTheme: ArtworkTheme | "all";
  onFilterChange: (categoryId: string | "all") => void;
  onThemeChange: (themeId: ArtworkTheme | "all") => void;
  onArtworkClick: (category: Category, artwork: Artwork) => void;
}

export function CatalogGrid({
  categories,
  activeCategory,
  activeTheme,
  onFilterChange,
  onThemeChange,
  onArtworkClick,
}: CatalogGridProps) {
  const [openMenu, setOpenMenu] = useState<"catalog" | "themes" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const byCategory =
    activeCategory === "all"
      ? categories.flatMap((c) => c.artworks.map((a) => ({ artwork: a, category: c })))
      : categories
          .find((c) => c.id === activeCategory)
          ?.artworks.map((a) => ({ artwork: a, category: categories.find((c) => c.id === activeCategory)! })) ?? [];

  const displayedItems =
    activeTheme === "all" ? byCategory : byCategory.filter(({ artwork }) => artwork.themes.includes(activeTheme));

  const activeCategoryLabel =
    activeCategory === "all" ? "Todos" : (categories.find((c) => c.id === activeCategory)?.title ?? "Todos");
  const activeThemeLabel =
    activeTheme === "all" ? "Todas" : (CATALOG_THEMES.find((t) => t.id === activeTheme)?.label ?? "Todas");

  const catalogOptions: Array<{ id: string | "all"; title: string; description: string }> = [
    {
      id: "all",
      title: "Todos",
      description: "Visión completa del catálogo curado.",
    },
    ...categories.map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description,
    })),
  ];

  useEffect(() => {
    const onDocClick = (event: PointerEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("pointerdown", onDocClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onDocClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const handleCategorySelect = (value: string | "all") => {
    onFilterChange(value);
    setOpenMenu(null);
  };

  const handleThemeSelect = (value: ArtworkTheme | "all") => {
    onThemeChange(value);
    setOpenMenu(null);
  };

  return (
    <div id="obras" className="w-full max-w-7xl mx-auto px-4 md:px-12 pt-10 pb-24 md:pt-16 md:pb-32">
      {/* Sticky Filter Header */}
      <div ref={menuRef} className="sticky top-20 z-30 mb-10 md:mb-14">
        <div className="relative border-y border-[color:var(--border)] bg-background/88 backdrop-blur-xl">
          <div className="relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="grid grid-cols-2">
              <button
                onClick={() => setOpenMenu((prev) => (prev === "catalog" ? null : "catalog"))}
                className={cn(
                  "group relative flex min-h-[4.75rem] items-center justify-between border-r border-[color:var(--border)] px-4 py-3 text-left transition-colors duration-300 md:min-h-[5.25rem] md:px-6",
                  openMenu === "catalog"
                    ? "bg-[color:var(--surface)]"
                    : "hover:bg-[color:var(--surface)]/60"
                )}
                aria-expanded={openMenu === "catalog"}
                aria-controls="catalog-menu"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="font-mono text-[0.48rem] tracking-[0.26em] uppercase text-[color:var(--muted)]">Formato</span>
                  <span className="font-serif text-[1.85rem] leading-none text-foreground truncate md:text-[2.35rem]">{activeCategoryLabel}</span>
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 flex-shrink-0 text-[color:var(--muted)] transition-transform duration-300", openMenu === "catalog" && "rotate-180")}
                />
              </button>

              <button
                onClick={() => setOpenMenu((prev) => (prev === "themes" ? null : "themes"))}
                className={cn(
                  "group relative flex min-h-[4.75rem] items-center justify-between px-4 py-3 text-left transition-colors duration-300 md:min-h-[5.25rem] md:px-6",
                  openMenu === "themes"
                    ? "bg-[color:var(--surface)]"
                    : "hover:bg-[color:var(--surface)]/60"
                )}
                aria-expanded={openMenu === "themes"}
                aria-controls="themes-menu"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="font-mono text-[0.48rem] tracking-[0.26em] uppercase text-[color:var(--muted)]">Tema</span>
                  <span className="font-serif text-[1.85rem] leading-none text-foreground truncate md:text-[2.35rem]">{activeThemeLabel}</span>
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 flex-shrink-0 text-[color:var(--muted)] transition-transform duration-300", openMenu === "themes" && "rotate-180")}
                />
              </button>
            </div>

            <div className="hidden border-l border-[color:var(--border)] px-6 py-4 md:block">
              <p className="font-mono text-[0.5rem] tracking-[0.26em] uppercase text-[color:var(--muted)]">
                {displayedItems.length} obras
              </p>
            </div>

            <div
              id="catalog-menu"
              className={cn(
                "col-span-full overflow-hidden border-t border-[color:var(--border)] transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
                openMenu === "catalog" ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0 border-t-transparent"
              )}
            >
              <div className="bg-[color:var(--surface)]/80 p-2 md:p-3">
                <div className="grid grid-cols-1 md:grid-cols-4">
                  {catalogOptions.map((option, index) => (
                    <button
                      key={option.id}
                      onClick={() => handleCategorySelect(option.id)}
                      className={cn(
                        "group flex min-h-16 items-center justify-between border-b border-[color:var(--border)] px-3 py-3 text-left transition-colors md:border-b-0 md:border-r md:px-4",
                        activeCategory === option.id
                          ? "bg-background/70"
                          : "hover:bg-background/45"
                      )}
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 font-mono text-[0.58rem] tracking-[0.22em] text-[color:var(--muted)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-serif text-xl md:text-2xl leading-tight text-foreground">{option.title}</span>
                          <span className="block text-xs md:text-sm text-[color:var(--foreground-soft)] truncate">
                            {option.description}
                          </span>
                        </span>
                      </div>
                      <ArrowUpRight
                        className={cn(
                          "h-3.5 w-3.5 flex-shrink-0 text-[color:var(--muted)] transition-all duration-300",
                          activeCategory === option.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="themes-menu"
              className={cn(
                "col-span-full overflow-hidden border-t border-[color:var(--border)] transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
                openMenu === "themes" ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0 border-t-transparent"
              )}
            >
              <div className="bg-[color:var(--surface)]/80 p-2 max-h-[22rem] overflow-y-auto custom-scrollbar md:p-3">
                <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-4">
                  <button
                    onClick={() => handleThemeSelect("all")}
                    className={cn(
                      "flex min-h-12 items-center border border-[color:var(--border)] px-3 py-2 text-left font-serif text-lg transition-colors md:min-h-14 md:text-xl",
                      activeTheme === "all"
                        ? "bg-background text-foreground"
                        : "text-[color:var(--muted)] hover:bg-background/55 hover:text-foreground"
                    )}
                  >
                    Todas
                  </button>
                  {CATALOG_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                    onClick={() => handleThemeSelect(theme.id)}
                    className={cn(
                      "flex min-h-12 items-center border border-[color:var(--border)] px-3 py-2 text-left font-serif text-lg transition-colors md:min-h-14 md:text-xl",
                      activeTheme === theme.id
                        ? "bg-background text-foreground"
                        : "text-[color:var(--muted)] hover:bg-background/55 hover:text-foreground"
                    )}
                  >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[color:var(--border)] px-4 py-2 md:hidden">
              <p className="font-mono text-[0.5rem] tracking-[0.24em] uppercase text-[color:var(--muted)]">
                {displayedItems.length} obras
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* The Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 md:gap-x-12">
        {displayedItems.map(({ artwork, category }, idx) => (
          <div 
            key={`${category.id}-${artwork.id}-${idx}`}
            className="group cursor-pointer flex flex-col"
            onClick={() => onArtworkClick(category, artwork)}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--surface-2)] mb-6 rounded-lg">
              <Image 
                src={artwork.image} 
                alt={artwork.title} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[color:var(--overlay-soft)] group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Meta Info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:opacity-80 transition-all">
                  {artwork.title}
                </h3>
                <p className="font-mono text-[0.6rem] text-[color:var(--muted)] tracking-widest uppercase mt-2">
                  {category.title}
                </p>
              </div>
              <p className="font-light text-lg text-[color:var(--foreground-soft)]">
                ${artwork.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
