"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

type FormatId = "one-piece" | "triptych" | "five-piece";

const BACKGROUNDS = [
  "/assets/fondo-generico.png",
  "/assets/fondo_2.png",
  "/assets/fondo_3.png",
  "/assets/fondo_4.png",
];

const SIZES: Record<FormatId, string[]> = {
  "one-piece":  ["40×60 cm", "60×90 cm", "80×120 cm"],
  "triptych":   ["90×60 cm", "120×80 cm", "150×100 cm"],
  "five-piece": ["120×60 cm", "180×80 cm", "200×100 cm"],
};

interface StudioPreviewProps {
  activeImage: string | null;
  activeFormat: FormatId;
  activeSize: string;
  activeBg: string;
  onFormatChange: (f: FormatId) => void;
  onSizeChange: (s: string) => void;
  onBgChange: (bg: string) => void;
  onCheckout: () => void;
}

function renderSlices(imageUrl: string, format: FormatId) {
  const slices =
    format === "one-piece"
      ? [{ w: "w-full", h: "h-full", pos: "0%", shift: 0 }]
      : format === "triptych"
      ? [
          { w: "w-1/3", h: "h-full", pos: "0%", shift: 0 },
          { w: "w-1/3", h: "h-full", pos: "50%", shift: 33.33 },
          { w: "w-1/3", h: "h-full", pos: "100%", shift: 66.66 },
        ]
      : [
          { w: "w-1/5", h: "h-[60%]", pos: "0%", shift: 0 },
          { w: "w-1/5", h: "h-[80%]", pos: "25%", shift: 20 },
          { w: "w-1/5", h: "h-[100%]", pos: "50%", shift: 40 },
          { w: "w-1/5", h: "h-[80%]", pos: "75%", shift: 60 },
          { w: "w-1/5", h: "h-[60%]", pos: "100%", shift: 80 },
        ];

  return (
    <div className="w-full h-full flex items-center justify-center gap-1.5">
      {slices.map((s, i) => (
        <div
          key={i}
          className={cn("relative overflow-hidden rounded-sm shadow-[6px_18px_36px_rgba(0,0,0,0.7)] flex-shrink-0 transition-all duration-700", s.w, s.h)}
        >
          {/* Native img with object-position for slicing works with data URLs. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: "cover",
              objectPosition: format === "one-piece"
                ? "center center"
                : `${s.pos} center`,
              width: format === "one-piece" ? "100%" : format === "triptych" ? "300%" : "500%",
              maxWidth: "none",
              transform: `translateX(-${s.shift}%)`,
            }}
          />
          {/* Acrílico gloss */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/25 mix-blend-overlay pointer-events-none" />
        </div>
      ))}
    </div>
  );
}

export function StudioPreview({
  activeImage,
  activeFormat,
  activeSize,
  activeBg,
  onFormatChange,
  onSizeChange,
  onBgChange,
  onCheckout,
}: StudioPreviewProps) {
  const formats: { id: FormatId; label: string }[] = [
    { id: "one-piece", label: "1 Pieza" },
    { id: "triptych", label: "Tríptico" },
    { id: "five-piece", label: "5 Piezas" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[color:var(--surface)] group">

      {/* Background crossfade */}
      <div className="absolute inset-0 z-0">
        {BACKGROUNDS.map((bg) => (
          <div key={bg} className={cn("absolute inset-0 transition-opacity duration-1000", activeBg === bg ? "opacity-60" : "opacity-0")}>
            <Image src={bg} alt="Ambiente" fill className="object-cover" priority />
          </div>
        ))}
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--overlay-strong)] via-transparent to-[color:var(--overlay-strong)] z-10" />
      </div>

      {/* Header label */}
      <div className="relative z-20 px-8 pt-6 flex-shrink-0">
        <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-[color:var(--muted)]">
          Vista Previa en Vivo
        </span>
      </div>

      {/* Art Projection */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-12">
        {activeImage ? (
          <div className={cn(
            "relative transition-all duration-700",
            "top-[-8%]",
            activeFormat === "one-piece"
              ? "w-[35%] aspect-[4/5]"
              : "w-[68%] aspect-video"
          )}>
            {renderSlices(activeImage, activeFormat)}
            {/* Reflection / shadow on floor */}
            <div className="absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-b from-[color:var(--overlay-soft)] to-transparent blur-sm" />
          </div>
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 border border-dashed border-[color:var(--border)] flex items-center justify-center mx-auto mb-4 rounded-sm">
              <span className="text-[color:var(--muted)] text-3xl">+</span>
            </div>
            <p className="font-mono text-[0.6rem] text-[color:var(--muted)] tracking-widest uppercase">
              Tu arte aparecerá aquí
            </p>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="relative z-20 px-8 pb-8 flex-shrink-0 space-y-4">
        
        {/* Format Pills */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.5rem] text-[color:var(--muted)] tracking-widest uppercase w-14 flex-shrink-0">Formato</span>
          <div className="flex gap-2 flex-wrap">
            {formats.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onFormatChange(id)}
                className={cn(
                  "px-4 py-1.5 rounded-full border text-[0.65rem] font-light tracking-wide transition-all duration-200",
                  activeFormat === id
                    ? "border-foreground text-foreground bg-foreground/10"
                    : "border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--border-strong)] hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Size Pills */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.5rem] text-[color:var(--muted)] tracking-widest uppercase w-14 flex-shrink-0">Tamaño</span>
          <div className="flex gap-2 flex-wrap">
            {SIZES[activeFormat].map((s) => (
              <button
                key={s}
                onClick={() => onSizeChange(s)}
                className={cn(
                  "px-4 py-1.5 rounded-full border text-[0.65rem] font-light tracking-wide transition-all duration-200",
                  activeSize === s
                    ? "border-foreground text-foreground bg-foreground/10"
                    : "border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--border-strong)] hover:text-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Divider + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-[color:var(--border)]">
          {/* BG Switcher */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {BACKGROUNDS.map((bg) => (
              <button
                key={bg}
                onClick={() => onBgChange(bg)}
                className={cn(
                  "relative w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-300",
                  activeBg === bg ? "border-foreground scale-110" : "border-transparent opacity-50 hover:opacity-100"
                )}
              >
                <Image src={bg} alt="Fondo" fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Checkout */}
          {activeImage && (
            <button
              onClick={onCheckout}
              className="flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:opacity-85 transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Convertir en Arte Real
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
