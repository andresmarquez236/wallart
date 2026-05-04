"use client";

import { useRef, useState } from "react";
import { Paperclip, ArrowUp, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text?: string;
  imageUrl?: string;
  generatedImage?: string;
  timestamp: Date;
}

interface AIChatPanelProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  onSendPrompt: (text: string, imageUrl?: string) => void;
  activeVersionId: string | null;
  onSelectVersion: (id: string) => void;
}

const SUGGESTIONS = [
  "Abstracto geométrico en azul profundo",
  "Ciudad nocturna en blanco y negro",
  "Botánico minimalista, líneas finas",
  "Fuego y humo, tonos cálidos",
  "Mar en calma, horizonte infinito",
  "Tipografía brutalista, sans-serif",
];

export function AIChatPanel({
  messages,
  isGenerating,
  onSendPrompt,
  activeVersionId,
  onSelectVersion,
}: AIChatPanelProps) {
  const [input, setInput] = useState("");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const text = input.trim();
    if (!text && !attachedImage) return;
    onSendPrompt(text, attachedImage ?? undefined);
    setInput("");
    setAttachedImage(null);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAttachedImage(url);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-r border-white/8">

      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8 flex-shrink-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Sparkles className="w-3.5 h-3.5 text-white/40" />
          <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-white/40">
            Studio AI
          </span>
        </div>
        <p className="font-serif text-white text-lg leading-snug">
          Describe tu obra ideal
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">

        {messages.length === 0 && (
          <div className="space-y-3 pt-2">
            <p className="font-mono text-[0.55rem] tracking-[0.25em] uppercase text-white/25 mb-4">
              Sugerencias para empezar
            </p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => onSendPrompt(s)}
                className="w-full text-left px-4 py-3 border border-white/10 hover:border-white/30 text-white/50 hover:text-white text-xs font-light transition-all duration-200 rounded-sm"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex flex-col gap-2", msg.role === "user" ? "items-end" : "items-start")}>
            {/* Role label */}
            <span className="font-mono text-[0.5rem] tracking-widest uppercase text-white/20 px-1">
              {msg.role === "user" ? "Tú" : "Studio AI"}
            </span>

            {/* User image attachment */}
            {msg.imageUrl && (
              <div className="relative w-32 h-32 overflow-hidden rounded-sm border border-white/15">
                <Image src={msg.imageUrl} alt="Referencia" fill className="object-cover" />
              </div>
            )}

            {/* Text bubble */}
            {msg.text && (
              <div className={cn(
                "max-w-[85%] px-4 py-3 text-sm font-light leading-relaxed",
                msg.role === "user"
                  ? "bg-white/8 text-white rounded-sm rounded-tr-none"
                  : "text-white/70 border border-white/10 rounded-sm rounded-tl-none"
              )}>
                {msg.text}
              </div>
            )}

            {/* Generated image result */}
            {msg.generatedImage && (
              <div
                onClick={() => onSelectVersion(msg.id)}
                className={cn(
                  "relative w-full aspect-video overflow-hidden rounded-sm border-2 transition-all duration-300 group cursor-pointer",
                  activeVersionId === msg.id ? "border-white" : "border-white/10 hover:border-white/40"
                )}
              >
                {/* Use native img to support data: URLs from our proxy */}
                <img
                  src={msg.generatedImage}
                  alt="Resultado"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {activeVersionId === msg.id && (
                  <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                    <span className="font-mono text-[0.55rem] text-white tracking-widest uppercase bg-black/60 px-3 py-1.5">
                      Activa en Vista
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Generating indicator */}
        {isGenerating && (
          <div className="flex items-start gap-3">
            <div className="flex gap-1 px-4 py-3 border border-white/10 rounded-sm rounded-tl-none">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full bg-white/50 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Attached image preview */}
      {attachedImage && (
        <div className="px-6 pb-2 flex-shrink-0">
          <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-sm">
            <div className="relative w-10 h-10 overflow-hidden rounded-sm flex-shrink-0">
              <Image src={attachedImage} alt="Adjunto" fill className="object-cover" />
            </div>
            <p className="text-xs text-white/50 font-light flex-1">Imagen de referencia adjunta</p>
            <button onClick={() => setAttachedImage(null)} className="text-white/30 hover:text-white text-xs transition-colors">✕</button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-6 pb-6 pt-3 flex-shrink-0 border-t border-white/8">
        <div className="flex items-end gap-3 bg-white/5 border border-white/15 hover:border-white/30 rounded-sm p-3 transition-colors focus-within:border-white/40">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Describe el arte que quieres crear…"
            rows={2}
            className="flex-1 bg-transparent text-white text-sm font-light placeholder:text-white/25 resize-none outline-none leading-relaxed custom-scrollbar"
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => fileRef.current?.click()}
              className="p-1.5 text-white/30 hover:text-white transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim() && !attachedImage}
              className="p-1.5 bg-white text-black rounded-full disabled:opacity-20 hover:bg-white/80 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <p className="mt-2 font-mono text-[0.5rem] text-white/20 tracking-widest text-center uppercase">
          Enter para enviar · Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
}
