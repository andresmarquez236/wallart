"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Decision() {
  return (
    <section className="relative h-screen w-full flex flex-col md:flex-row">
      {/* Camino 1: Colecciones */}
      <Link 
        href="/colecciones"
        className="group relative flex-1 h-full flex flex-col items-center justify-center bg-background border-r border-foreground/10 overflow-hidden transition-all duration-700 hover:flex-[1.5]"
      >
        <div className="absolute inset-0 bg-brand-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10 flex flex-col items-center text-center p-8">
          <span className="text-sm font-mono tracking-widest uppercase mb-4 opacity-50">Explorar</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8 transition-transform duration-700 group-hover:scale-105">
            Obras de <br /><span className="italic">Catálogo</span>
          </h2>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-foreground pb-1">
            Ver Colecciones <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>

      {/* Camino 2: Personalizar */}
      <Link 
        href="/cuadros-personalizados"
        className="group relative flex-1 h-full flex flex-col items-center justify-center bg-brand-900 text-brand-100 overflow-hidden transition-all duration-700 hover:flex-[1.5]"
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10 flex flex-col items-center text-center p-8">
          <span className="text-sm font-mono tracking-widest uppercase mb-4 opacity-50">Crear</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8 transition-transform duration-700 group-hover:scale-105">
            Tu propia <br /><span className="italic">Historia</span>
          </h2>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-brand-100 pb-1">
            Personalizar <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </section>
  );
}
