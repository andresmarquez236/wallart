"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className={cn(
        "relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300",
        "text-foreground/40 hover:text-foreground hover:bg-foreground/8",
        className
      )}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300" />
      )}
    </button>
  );
}
