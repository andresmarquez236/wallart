"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./AIChatPanel";
import { useState } from "react";

interface VersionHistoryProps {
  versions: ChatMessage[];
  activeVersionId: string | null;
  onSelect: (id: string) => void;
}

export function VersionHistory({ versions, activeVersionId, onSelect }: VersionHistoryProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Only show messages that have a generated image
  const imageVersions = versions.filter(m => m.generatedImage);

  return (
    <div className="flex flex-col h-full bg-[color:var(--surface)] border-l border-[color:var(--border)]">
      
      {/* Header */}
      <div className="px-4 py-5 border-b border-[color:var(--border)] flex-shrink-0">
        <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-[color:var(--muted)]">
          Versiones
        </p>
        <p className="font-serif text-foreground text-base mt-0.5 leading-snug">
          {imageVersions.length > 0 ? `${imageVersions.length} creacion${imageVersions.length > 1 ? "es" : ""}` : "Sin creaciones aún"}
        </p>
      </div>

      {/* Versions Grid */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {imageVersions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full pb-16 space-y-3">
            <div className="w-12 h-12 border border-dashed border-[color:var(--border)] rounded-sm flex items-center justify-center">
              <span className="text-[color:var(--muted)] text-xl">◻</span>
            </div>
            <p className="font-mono text-[0.55rem] text-[color:var(--muted)] tracking-widest text-center uppercase leading-relaxed">
              Tus creaciones<br />aparecerán aquí
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {imageVersions.map((v, idx) => (
              <div
                key={v.id}
                onClick={() => onSelect(v.id)}
                className={cn(
                  "relative w-full aspect-video overflow-hidden rounded-sm border-2 group transition-all duration-300 cursor-pointer",
                  activeVersionId === v.id
                    ? "border-foreground"
                    : "border-[color:var(--border)] hover:border-[color:var(--border-strong)]"
                )}
              >
                <Image
                  src={v.generatedImage!}
                  alt={v.text ?? `Versión ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[color:var(--overlay-soft)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Version number */}
                <div className="absolute top-2 left-2">
                  <span className="font-mono text-[0.5rem] bg-[color:var(--overlay-strong)] text-[color:var(--foreground-soft)] px-2 py-0.5 tracking-widest uppercase">
                    v{idx + 1}
                  </span>
                </div>

                {/* Favorite */}
                <div
                  onClick={(e) => toggleFavorite(e, v.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <Star
                    className={cn(
                      "w-3.5 h-3.5 transition-all",
                      favorites.has(v.id)
                        ? "fill-foreground text-foreground"
                        : "text-[color:var(--muted)] hover:text-foreground"
                    )}
                  />
                </div>

                {/* Active badge */}
                {activeVersionId === v.id && (
                  <div className="absolute bottom-2 left-2">
                    <span className="font-mono text-[0.5rem] bg-foreground text-background px-2 py-0.5 tracking-widest uppercase">
                      Activa
                    </span>
                  </div>
                )}

                {/* Prompt text on hover */}
                {v.text && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[color:var(--overlay-strong)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-[color:var(--foreground-soft)] text-[0.55rem] font-light line-clamp-2 leading-relaxed">
                      {v.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
