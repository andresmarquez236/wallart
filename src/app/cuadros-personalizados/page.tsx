"use client";

import { useReducer, useCallback } from "react";
import { AIChatPanel, ChatMessage } from "@/components/studio/AIChatPanel";
import { StudioPreview } from "@/components/studio/StudioPreview";
import { VersionHistory } from "@/components/studio/VersionHistory";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Link from "next/link";

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

      if (imageUrl && !text) {
        // If only an image was uploaded (no prompt), use it directly
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
        text: text
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
    <main className="h-screen w-full bg-background flex flex-col overflow-hidden text-foreground">

      {/* Top Nav Bar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[--border] flex-shrink-0 z-40 bg-background">
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

      {/* 3-Panel Layout */}
      <div className="flex flex-1 overflow-hidden">

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
