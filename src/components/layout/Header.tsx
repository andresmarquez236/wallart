"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ArrowLeft } from "lucide-react";

const NAV_LINKS = [
  { href: "/colecciones", label: "Catálogo" },
  { href: "/cuadros-personalizados", label: "Crear" },
];

// Minimal floating bar for immersive pages (catalog, studio)
function ImmersiveNav({ backHref = "/", backLabel = "Volver" }: { backHref?: string; backLabel?: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 pointer-events-none">
      <Link
        href={backHref}
        className="pointer-events-auto flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[color:var(--muted)] hover:text-foreground transition-colors bg-[color:var(--overlay-soft)] backdrop-blur-md px-4 py-2 rounded-full border border-[color:var(--border)]"
      >
        <ArrowLeft className="w-3 h-3" /> {backLabel}
      </Link>
      <div className="pointer-events-auto bg-[color:var(--overlay-soft)] backdrop-blur-md rounded-full border border-[color:var(--border)] p-1">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Catalog — minimal floating back nav
  if (pathname.startsWith("/colecciones")) {
    return <ImmersiveNav backHref="/" backLabel="Wall Art Studio" />;
  }

  // AI Studio — has its own nav built-in, but no theme toggle. Skip.
  if (pathname.startsWith("/cuadros-personalizados")) {
    return null;
  }

  // ── Main Header (Home, etc.) ───────────────────────────────────────────
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-[--border] py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-serif text-foreground text-lg tracking-wide hover:opacity-70 transition-opacity">
          Wall Art Studio
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "font-mono text-[0.65rem] tracking-[0.25em] uppercase transition-colors duration-200",
                pathname === href ? "text-foreground" : "text-[--muted] hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/cuadros-personalizados"
            className="px-5 py-2 border border-foreground/30 text-foreground font-mono text-[0.65rem] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300 rounded-full"
          >
            Empezar
          </Link>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menú"
          >
            <span className={cn("block w-5 h-px bg-foreground transition-all duration-300", menuOpen && "rotate-45 translate-y-[7px]")} />
            <span className={cn("block w-5 h-px bg-foreground transition-all duration-300", menuOpen && "opacity-0")} />
            <span className={cn("block w-5 h-px bg-foreground transition-all duration-300", menuOpen && "-rotate-45 -translate-y-[7px]")} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-400",
        menuOpen ? "max-h-60 border-t border-[--border]" : "max-h-0"
      )}>
        <nav className="flex flex-col bg-background/95 backdrop-blur-md">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "px-8 py-5 font-mono text-[0.7rem] tracking-[0.25em] uppercase border-b border-[--border] transition-colors",
                pathname === href ? "text-foreground" : "text-[--muted] hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
