"use client";

import { useReducer, useCallback, useRef, useState } from "react";
import { AIChatPanel, ChatMessage } from "@/components/studio/AIChatPanel";
import { StudioPreview } from "@/components/studio/StudioPreview";
import { VersionHistory } from "@/components/studio/VersionHistory";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Paperclip, ShoppingCart, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

// ── Types ──────────────────────────────────────────────────────────────────
type FormatId = "one-piece" | "triptych" | "five-piece";

interface StudioState {
  messages: ChatMessage[];
  isGenerating: boolean;
  activeVersionId: string | null;
  activeFormat: FormatId;
  activeSize: string;
  activeBg: string;
}

type StudioAction =
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "SET_GENERATING"; payload: boolean }
  | { type: "SET_ACTIVE_VERSION"; payload: string }
  | { type: "SET_FORMAT"; payload: FormatId }
  | { type: "SET_SIZE"; payload: string }
  | { type: "SET_BG"; payload: string };

// ── Reducer ────────────────────────────────────────────────────────────────
function studioReducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_GENERATING":
      return { ...state, isGenerating: action.payload };
    case "SET_ACTIVE_VERSION":
      return { ...state, activeVersionId: action.payload };
    case "SET_FORMAT":
      return {
        ...state,
        activeFormat: action.payload,
        activeSize:
          action.payload === "one-piece" ? "60×90 cm"
          : action.payload === "triptych" ? "120×80 cm"
          : "180×80 cm",
      };
    case "SET_SIZE":
      return { ...state, activeSize: action.payload };
    case "SET_BG":
      return { ...state, activeBg: action.payload };
    default:
      return state;
  }
}

const initialState: StudioState = {
  messages: [],
  isGenerating: false,
  activeVersionId: null,
  activeFormat: "one-piece",
  activeSize: "60×90 cm",
  activeBg: "/assets/fondo-generico.png",
};

const MOBILE_SUGGESTIONS = [
  "Abstracto oscuro con textura dorada",
  "Retrato cinematográfico en claroscuro",
  "Ciudad nocturna minimalista",
  "Botánico elegante sobre fondo negro",
];

const MOBILE_FORMATS: { id: FormatId; label: string }[] = [
  { id: "one-piece", label: "1 Pieza" },
  { id: "triptych", label: "Tríptico" },
  { id: "five-piece", label: "5 Piezas" },
];

const MOBILE_SIZES: Record<FormatId, string[]> = {
  "one-piece": ["40×60", "60×90", "80×120"],
  triptych: ["90×60", "120×80", "150×100"],
  "five-piece": ["120×60", "180×80", "200×100"],
};

function MobileStudioInterface({
  state,
  activeImage,
  onSendPrompt,
  onSelectVersion,
  onFormatChange,
  onSizeChange,
  onCheckout,
}: {
  state: StudioState;
  activeImage: string | null;
  onSendPrompt: (text: string, imageUrl?: string) => void;
  onSelectVersion: (id: string) => void;
  onFormatChange: (format: FormatId) => void;
  onSizeChange: (size: string) => void;
  onCheckout: () => void;
}) {
  const [input, setInput] = useState("");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const text = input.trim();
    if (!text && !attachedImage) return;
    onSendPrompt(text, attachedImage ?? undefined);
    setInput("");
    setAttachedImage(null);
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setAttachedImage(reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <section className="md:hidden flex min-h-0 flex-1 flex-col bg-background">
      <div className={cn("flex-1 overflow-y-auto px-4 pt-5 custom-scrollbar", activeImage ? "pb-[18rem]" : "pb-28")}>
        {state.messages.length === 0 && (
          <div className="min-h-full flex flex-col justify-end gap-7 pb-4">
            <div>
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]">
                <Sparkles className="h-4 w-4 text-[color:var(--muted)]" />
              </div>
              <h1 className="font-serif text-4xl leading-none text-foreground">Crea una obra.</h1>
              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-[color:var(--foreground-soft)]">
                Describe una idea, sube una referencia o empieza con una dirección visual.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {MOBILE_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSendPrompt(suggestion)}
                  className="min-h-12 rounded-sm border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-left text-sm text-[color:var(--foreground-soft)] transition-colors hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-5">
          {state.messages.map((message) => (
            <article
              key={message.id}
              className={cn("flex flex-col gap-2", message.role === "user" ? "items-end" : "items-start")}
            >
              {message.text && (
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    message.role === "user"
                      ? "rounded-br-sm bg-foreground text-background"
                      : "rounded-bl-sm border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground-soft)]"
                  )}
                >
                  {message.text}
                </div>
              )}

              {message.imageUrl && (
                <div className="relative h-40 w-40 overflow-hidden rounded-sm border border-[color:var(--border)]">
                  <Image src={message.imageUrl} alt="Referencia" fill className="object-cover" />
                </div>
              )}

              {message.generatedImage && (
                <button
                  onClick={() => onSelectVersion(message.id)}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-sm border bg-[color:var(--surface)] text-left transition-colors",
                    state.activeVersionId === message.id ? "border-foreground/50" : "border-[color:var(--border)]"
                  )}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {/* Generated images can arrive as data URLs, so native img is the most reliable renderer here. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={message.generatedImage}
                      alt="Obra generada"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                      <span className="font-mono text-[0.55rem] tracking-[0.24em] uppercase text-white/80">
                        Vista activa
                      </span>
                      <span className="font-serif text-2xl text-white">{state.activeFormat === "one-piece" ? "1" : state.activeFormat === "triptych" ? "3" : "5"}</span>
                    </div>
                  </div>
                </button>
              )}
            </article>
          ))}

          {state.isGenerating && (
            <div className="flex items-center gap-2 text-[color:var(--muted)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              <span className="font-mono text-[0.58rem] tracking-[0.22em] uppercase">Generando obra</span>
            </div>
          )}
        </div>
      </div>

      {activeImage && (
        <div className="fixed bottom-24 left-4 right-4 z-40">
          <div className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]/95 shadow-[0_18px_36px_var(--shadow-color)] backdrop-blur-xl">
            <button
              onClick={() => setShowControls((value) => !value)}
              className="flex min-h-11 w-full items-center justify-between px-4 py-2.5 outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
            >
              <span className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-[color:var(--muted)]">
                {state.activeFormat} · {state.activeSize}
              </span>
              <SlidersHorizontal className="h-4 w-4 text-[color:var(--muted)]" />
            </button>

            <div className={cn("overflow-hidden transition-all duration-300", showControls ? "max-h-56 border-t border-[color:var(--border)]" : "max-h-0")}>
              <div className="space-y-3 p-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {MOBILE_FORMATS.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => onFormatChange(format.id)}
                      className={cn(
                        "min-h-9 flex-shrink-0 rounded-full border px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-foreground/40",
                        state.activeFormat === format.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-[color:var(--border)] text-[color:var(--foreground-soft)]"
                      )}
                    >
                      {format.label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {MOBILE_SIZES[state.activeFormat].map((size) => (
                    <button
                      key={size}
                      onClick={() => onSizeChange(size)}
                      className={cn(
                        "min-h-9 flex-shrink-0 rounded-full border px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-foreground/40",
                        state.activeSize.startsWith(size)
                          ? "border-foreground bg-foreground text-background"
                          : "border-[color:var(--border)] text-[color:var(--foreground-soft)]"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <button
                  onClick={onCheckout}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-background outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Convertir en arte real
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[color:var(--border)] bg-background/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
        {attachedImage && (
          <div className="mb-2 flex items-center gap-3 rounded-sm border border-[color:var(--border)] bg-[color:var(--surface)] p-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-sm">
              <Image src={attachedImage} alt="Adjunto" fill className="object-cover" />
            </div>
            <span className="flex-1 text-xs text-[color:var(--muted)]">Referencia adjunta</span>
            <button onClick={() => setAttachedImage(null)} className="p-2 text-[color:var(--muted)]">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2">
          <button onClick={() => fileRef.current?.click()} className="min-h-10 min-w-10 rounded-full text-[color:var(--muted)] outline-none focus-visible:ring-1 focus-visible:ring-foreground/40" aria-label="Adjuntar imagen de referencia">
            <Paperclip className="mx-auto h-4 w-4" />
          </button>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe tu obra..."
            rows={1}
            className="max-h-28 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-[color:var(--muted)]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() && !attachedImage}
            className="min-h-10 min-w-10 rounded-full bg-foreground text-background transition-opacity disabled:opacity-25 outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
            aria-label="Enviar"
          >
            <ArrowUp className="mx-auto h-4 w-4" />
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function CuadrosPersonalizadosPage() {
  const [state, dispatch] = useReducer(studioReducer, initialState);

  // Derive active image from active version
  const activeVersion = state.messages.find(m => m.id === state.activeVersionId);
  const activeImage = activeVersion?.generatedImage ?? activeVersion?.imageUrl ?? null;

  const handleSendPrompt = useCallback(async (text: string, imageUrl?: string) => {
    const userMsgId = `user-${Date.now()}`;

    // Add user message
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: userMsgId,
        role: "user",
        text: text || undefined,
        imageUrl,
        timestamp: new Date(),
      },
    });

    dispatch({ type: "SET_GENERATING", payload: true });

    try {
      let generatedImage: string;

      if (imageUrl) {
        // Reference uploads are used as the active base artwork in this demo flow.
        generatedImage = imageUrl;
      } else {
        // Call real DALL-E 3 API
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: text }),
        });
        const data = await res.json();
        if (!res.ok || !data.url) throw new Error(data.error ?? "Error generando imagen");
        generatedImage = data.url;
      }

      const aiMsgId = `ai-${Date.now()}`;
      const aiMessage: ChatMessage = {
        id: aiMsgId,
        role: "assistant",
        text: imageUrl
          ? text
            ? `Tomé tu imagen como base para: "${text}". Puedes ajustar formato y tamaño.`
            : "He tomado tu imagen de referencia como base. Puedes ajustar formato y tamaño."
          : text
          ? `Arte generado para: "${text}". Puedes seleccionarlo para ajustar el formato y tamaño.`
          : "He procesado tu imagen de referencia. Selecciónala para proyectarla en la pared.",
        generatedImage,
        timestamp: new Date(),
      };

      dispatch({ type: "ADD_MESSAGE", payload: aiMessage });
      dispatch({ type: "SET_ACTIVE_VERSION", payload: aiMsgId });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Error desconocido";
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: `⚠️ No se pudo generar la imagen: ${errMsg}`,
          timestamp: new Date(),
        },
      });
    } finally {
      dispatch({ type: "SET_GENERATING", payload: false });
    }
  }, []);

  return (
    <main className="h-dvh md:h-screen w-full bg-background flex flex-col overflow-hidden text-foreground">

      {/* Top Nav Bar */}
      <nav className="hidden md:flex items-center justify-between px-8 py-4 border-b border-[--border] flex-shrink-0 z-40 bg-background">
        <Link href="/" className="font-mono text-[0.6rem] tracking-widest uppercase text-[--muted] hover:text-foreground transition-colors flex items-center gap-2">
          ← Wall Art Studio
        </Link>
        <div className="flex items-center gap-3">
          {IS_DEMO && (
            <span className="font-mono text-[0.5rem] tracking-widest uppercase px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
              Demo
            </span>
          )}
          <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-[--muted]">AI Studio</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/5 border border-[--border]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[0.5rem] text-[--muted] tracking-widest uppercase">En vivo</span>
          </span>
          <ThemeToggle />
        </div>
      </nav>

      <nav className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[color:var(--border)] flex-shrink-0 z-40 bg-background">
        <Link href="/" className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-[color:var(--muted)]">
          ← Wall Art Studio
        </Link>
        <div className="flex items-center gap-2">
          {IS_DEMO && (
            <span className="font-mono text-[0.48rem] tracking-widest uppercase px-2 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
              Demo
            </span>
          )}
          <ThemeToggle />
        </div>
      </nav>

      <MobileStudioInterface
        state={state}
        activeImage={activeImage}
        onSendPrompt={handleSendPrompt}
        onSelectVersion={(id) => dispatch({ type: "SET_ACTIVE_VERSION", payload: id })}
        onFormatChange={(format) => dispatch({ type: "SET_FORMAT", payload: format })}
        onSizeChange={(size) => dispatch({ type: "SET_SIZE", payload: size })}
        onCheckout={() => alert(`Pedido: ${state.activeFormat} · ${state.activeSize}`)}
      />

      {/* 3-Panel Layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">

        {/* Panel Izquierdo: Chat (30%) */}
        <div className="w-[30%] flex-shrink-0 min-w-0 overflow-hidden">
          <AIChatPanel
            messages={state.messages}
            isGenerating={state.isGenerating}
            onSendPrompt={handleSendPrompt}
            activeVersionId={state.activeVersionId}
            onSelectVersion={(id) => dispatch({ type: "SET_ACTIVE_VERSION", payload: id })}
          />
        </div>

        {/* Panel Central: Preview (50%) */}
        <div className="flex-1 overflow-hidden min-w-0">
          <StudioPreview
            activeImage={activeImage}
            activeFormat={state.activeFormat}
            activeSize={state.activeSize}
            activeBg={state.activeBg}
            onFormatChange={(f) => dispatch({ type: "SET_FORMAT", payload: f })}
            onSizeChange={(s) => dispatch({ type: "SET_SIZE", payload: s })}
            onBgChange={(bg) => dispatch({ type: "SET_BG", payload: bg })}
            onCheckout={() => alert(`Pedido: ${state.activeFormat} · ${state.activeSize}`)}
          />
        </div>

        {/* Panel Derecho: Versiones (20%) */}
        <div className="w-[20%] flex-shrink-0 min-w-0 overflow-hidden">
          <VersionHistory
            versions={state.messages}
            activeVersionId={state.activeVersionId}
            onSelect={(id) => dispatch({ type: "SET_ACTIVE_VERSION", payload: id })}
          />
        </div>

      </div>
    </main>
  );
}
