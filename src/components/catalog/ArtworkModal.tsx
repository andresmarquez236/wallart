"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  X, ChevronLeft, ChevronRight, ShoppingCart, 
  ShieldCheck, Truck, Gem, ChevronDown, Minus, Plus
} from "lucide-react";
import { Category, FormatType, Artwork } from "@/lib/catalog-data";
import { cn } from "@/lib/utils";

interface ArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  artwork: Artwork;
  onNext: () => void;
  onPrev: () => void;
}

// ─── Shared Data ─────────────────────────────────────────────────────────────
const BACKGROUNDS = [
  "/assets/fondo-generico.png",
  "/assets/fondo_2.png",
  "/assets/fondo_3.png",
  "/assets/fondo_4.png",
];

const FINISHES = ["Mate", "Mate + Textura", "Brillo Ultra HD"];

const SIZES_BY_FORMAT: Record<string, string[]> = {
  "one-piece":  ["40×60 cm", "60×90 cm", "80×120 cm"],
  "triptych":   ["90×60 cm total", "120×80 cm total", "150×100 cm total"],
  "five-piece": ["120×60 cm total", "180×80 cm total", "200×100 cm total"],
};

// ─── Pill Selector ────────────────────────────────────────────────────────────
function PillSelector<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: T[];
  selected: T;
  onSelect: (v: T) => void;
}) {
  return (
    <div className="mb-6">
      <p className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-white/40 mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={cn(
              "px-4 py-2 rounded-full border text-xs font-light tracking-wide transition-all duration-200",
              selected === opt
                ? "border-white text-white bg-white/10"
                : "border-white/20 text-white/50 hover:border-white/50 hover:text-white/80"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Quantity Stepper ─────────────────────────────────────────────────────────
function QuantityStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-0 rounded-full border border-white/25 overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="w-10 text-center text-sm font-light text-white select-none">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left hover:text-white/80 transition-colors"
      >
        <span className="font-mono text-[0.65rem] tracking-widest uppercase text-white/60">{title}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 text-white/40", isOpen ? "rotate-180" : "rotate-0")} />
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
      )}>
        <div className="text-white/60 font-light text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export function ArtworkModal({ isOpen, onClose, category, artwork, onNext, onPrev }: ArtworkModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeBg, setActiveBg] = useState(BACKGROUNDS[0]);
  const [finish, setFinish] = useState(FINISHES[0]);
  const [size, setSize] = useState(() => SIZES_BY_FORMAT[category.id]?.[1] ?? SIZES_BY_FORMAT["one-piece"][1]);
  const [quantity, setQuantity] = useState(1);

  // Keep size in sync when artwork/category changes
  useEffect(() => {
    setSize(SIZES_BY_FORMAT[category.id]?.[1] ?? SIZES_BY_FORMAT["one-piece"][1]);
  }, [category.id]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setMounted(false), 500);
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  const renderSlices = (imageUrl: string, format: FormatType) => {
    const slices =
      format === "one-piece"
        ? [{ width: "w-full", height: "h-full", bgPos: "center", shift: 0 }]
        : format === "triptych"
        ? [
            { width: "w-1/3", height: "h-full", bgPos: "0%", shift: 0 },
            { width: "w-1/3", height: "h-full", bgPos: "50%", shift: 33.33 },
            { width: "w-1/3", height: "h-full", bgPos: "100%", shift: 66.66 },
          ]
        : [
            { width: "w-1/5", height: "h-[60%]", bgPos: "0%", shift: 0 },
            { width: "w-1/5", height: "h-[80%]", bgPos: "25%", shift: 20 },
            { width: "w-1/5", height: "h-[100%]", bgPos: "50%", shift: 40 },
            { width: "w-1/5", height: "h-[80%]", bgPos: "75%", shift: 60 },
            { width: "w-1/5", height: "h-[60%]", bgPos: "100%", shift: 80 },
          ];

    return (
      <div className="relative w-full h-full flex justify-center items-center gap-1 md:gap-3 z-20">
        {slices.map((slice, i) => (
          <div
            key={i}
            className={cn(
              "relative overflow-hidden rounded-sm shadow-[5px_15px_30px_rgba(0,0,0,0.6)] transition-all duration-700",
              slice.width, slice.height
            )}
          >
            <div
              className="absolute inset-0 h-full"
              style={{
                width: format === "one-piece" ? "100%" : format === "triptych" ? "300%" : "500%",
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: `${slice.bgPos} center`,
                transform: format === "one-piece" ? "none" : `translateX(-${slice.shift}%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/20 mix-blend-overlay pointer-events-none" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col lg:flex-row bg-[#050505] transition-opacity duration-500",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* ── LEFT: Room View ───────────────────────────────────────────────── */}
      <div className="relative w-full lg:w-[60%] h-[45vh] lg:h-full bg-black overflow-hidden flex-shrink-0 group">

        {/* Background crossfade */}
        <div className="absolute inset-0 z-0">
          {BACKGROUNDS.map((bg) => (
            <div key={bg} className={cn("absolute inset-0 transition-opacity duration-1000", activeBg === bg ? "opacity-90" : "opacity-0")}>
              <Image src={bg} alt="Ambiente" fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button onClick={onPrev} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/20 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-black/50 transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={onNext} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/20 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-black/50 transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Art projection */}
        <div className={cn(
          "absolute z-20 transition-all duration-700",
          "top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2",
          category.id === "one-piece" ? "w-[40%] lg:w-[30%] aspect-[4/5]" : "w-[60%] lg:w-[50%] aspect-video"
        )}>
          {renderSlices(artwork.image, category.id as FormatType)}
        </div>

        {/* BG Thumbnail Switcher */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {BACKGROUNDS.map((bg) => (
            <button key={bg} onClick={() => setActiveBg(bg)}
              className={cn("relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300",
                activeBg === bg ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
              )}>
              <Image src={bg} alt="Fondo" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ── RIGHT: E-Commerce Panel ───────────────────────────────────────── */}
      <div className="relative w-full lg:w-[40%] h-[55vh] lg:h-full overflow-y-auto bg-[#0a0a0a] border-l border-white/10 p-8 lg:p-14 flex flex-col justify-start custom-scrollbar">

        {/* Close */}
        <button onClick={onClose} className="absolute top-6 right-6 lg:top-8 lg:right-8 p-2 text-white/40 hover:text-white transition-colors z-50">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mt-4 lg:mt-10 mb-8">
          <h4 className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mb-3">{category.title}</h4>
          <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-3">{artwork.title}</h1>
          <p className="text-3xl font-light text-white">${artwork.price}</p>
        </div>

        {/* ── Pill Selectors ── */}
        <PillSelector label="¿Qué acabado prefieres?" options={FINISHES as any} selected={finish} onSelect={setFinish as any} />
        <PillSelector label="Tamaño" options={SIZES_BY_FORMAT[category.id] as any} selected={size} onSelect={setSize as any} />

        {/* ── Quantity + CTAs ── */}
        <div className="border-t border-white/10 pt-6 mb-8 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <button className="flex-1 flex items-center justify-center gap-2 border border-white/30 text-white py-[0.6rem] text-xs font-mono tracking-widest uppercase hover:border-white hover:bg-white/5 transition-all rounded-full">
              <ShoppingCart className="w-3.5 h-3.5" /> Añadir al carrito
            </button>
          </div>
          <button className="w-full bg-white text-black py-[0.9rem] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors rounded-full">
            Comprar ahora
          </button>
        </div>

        {/* ── 3 Benefits ── */}
        <div className="grid grid-cols-1 gap-3 mb-10">
          {[
            { icon: <Gem className="w-4 h-4 text-white/50" />, text: "Impresión Giclée + Acrílico Ultra Brillo 3D" },
            { icon: <Truck className="w-4 h-4 text-white/50" />, text: "Envío asegurado gratis a todo el país" },
            { icon: <ShieldCheck className="w-4 h-4 text-white/50" />, text: "Sin marco · listo para colgar · garantía vitalicia" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              {icon}
              <p className="text-xs font-light text-white/60">{text}</p>
            </div>
          ))}
        </div>

        {/* ── Accordions ── */}
        <div className="border-t border-white/10">
          <Accordion title="Descripción de la Obra">
            {artwork.description} Esta pieza exclusiva forma parte de nuestro catálogo de edición limitada, diseñada para elevar espacios modernos con su estética de alto contraste.
          </Accordion>
          <Accordion title="Material y Calidad">
            Panel rígido de alta densidad revestido con acrílico premium. No requiere marco. Sistema de colgado invisible para que la obra flote a 2 cm de la pared.
          </Accordion>
          <Accordion title="Tiempos de Producción y Envío">
            Producción bajo demanda: 5–7 días hábiles. Envío asegurado: 2–4 días adicionales según destino.
          </Accordion>
          <Accordion title="Preguntas Frecuentes">
            <strong>¿Cómo se limpia?</strong><br />
            Paño de microfibra seco o ligeramente húmedo. Sin químicos abrasivos.<br /><br />
            <strong>¿Viene listo para colgar?</strong><br />
            Sí, incluye riel de aluminio pre-instalado en la parte trasera.
          </Accordion>
        </div>

      </div>
    </div>
  );
}
