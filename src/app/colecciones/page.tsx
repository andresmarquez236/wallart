"use client";

import { useState } from "react";
import Image from "next/image";
import { CATALOG_DATA, Category, Artwork, ArtworkTheme } from "@/lib/catalog-data";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { ArtworkModal } from "@/components/catalog/ArtworkModal";

export default function ColeccionesPage() {
  const [activeFilter, setActiveFilter] = useState<string | "all">("all");
  const [activeTheme, setActiveTheme] = useState<ArtworkTheme | "all">("all");
  const featuredCategory = CATALOG_DATA[0];
  const featuredArtwork = featuredCategory.artworks[0];
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const openModal = (category: Category, artwork: Artwork) => {
    setSelectedCategory(category);
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    if (!selectedCategory || !selectedArtwork) return;
    const currentIndex = selectedCategory.artworks.findIndex(a => a.id === selectedArtwork.id);
    const nextIndex = (currentIndex + 1) % selectedCategory.artworks.length;
    setSelectedArtwork(selectedCategory.artworks[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedCategory || !selectedArtwork) return;
    const currentIndex = selectedCategory.artworks.findIndex(a => a.id === selectedArtwork.id);
    const prevIndex = (currentIndex - 1 + selectedCategory.artworks.length) % selectedCategory.artworks.length;
    setSelectedArtwork(selectedCategory.artworks[prevIndex]);
  };

  return (
    <main className="bg-background min-h-screen relative text-foreground selection:bg-foreground selection:text-background">
      
      {/* Header Placeholder (if applicable in layout, otherwise include here) */}
      <header className="fixed top-0 w-full z-40 bg-gradient-to-b from-[color:var(--overlay-strong)] to-transparent h-24 pointer-events-none" />

      {/* Curated Entry */}
      <section className="px-4 pt-28 md:px-12 md:pt-32">
        <div className="relative mx-auto min-h-[72svh] max-w-7xl overflow-hidden rounded-sm border border-[color:var(--border)] bg-[color:var(--surface)] md:min-h-[68vh]">
          <Image
            src={featuredArtwork.image}
            alt={featuredArtwork.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent md:bg-gradient-to-r md:from-background/88 md:via-background/42 md:to-transparent" />

          <div className="relative z-10 flex min-h-[72svh] max-w-2xl flex-col justify-end px-5 pb-7 pt-8 md:min-h-[68vh] md:px-10 md:py-10">
            <p className="mb-4 font-mono text-[0.55rem] tracking-[0.28em] uppercase text-[color:var(--muted)]">
              Catálogo curado · {CATALOG_DATA.flatMap((category) => category.artworks).length} obras
            </p>
            <h1 className="font-serif text-5xl leading-[0.92] text-foreground md:text-7xl">
              Arte listo para ocupar tu pared.
            </h1>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-[color:var(--foreground-soft)] md:text-base">
              Explora piezas por formato y temática, o abre una obra para verla en ambiente antes de decidir.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => openModal(featuredCategory, featuredArtwork)}
                className="min-h-12 rounded-full bg-foreground px-6 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85"
              >
                Ver obra destacada
              </button>
              <a
                href="#obras"
                className="flex min-h-12 items-center justify-center rounded-full border border-foreground/25 px-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Explorar obras
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalist Grid */}
      <CatalogGrid 
        categories={CATALOG_DATA}
        activeCategory={activeFilter}
        activeTheme={activeTheme}
        onFilterChange={(value) => {
          setActiveFilter(value);
          setActiveTheme("all");
        }}
        onThemeChange={setActiveTheme}
        onArtworkClick={openModal}
      />

      {/* Immersive Modal Lightbox */}
      {selectedCategory && selectedArtwork && (
        <ArtworkModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          category={selectedCategory}
          artwork={selectedArtwork}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      
      {/* Footer Call to Action */}
      <section className="h-[40vh] flex flex-col items-center justify-center bg-[color:var(--surface)] border-t border-[color:var(--border)] mt-16">
        <h2 className="text-3xl md:text-5xl font-serif mb-8 italic text-foreground">¿Tienes tu propia visión?</h2>
        <a 
          href="/cuadros-personalizados" 
          className="px-8 py-4 border border-foreground/25 text-foreground font-mono text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
        >
          Crear Arte a Medida
        </a>
      </section>
    </main>
  );
}
