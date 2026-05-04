"use client";

import { useState } from "react";
import { CATALOG_DATA, Category, Artwork } from "@/lib/catalog-data";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { ArtworkModal } from "@/components/catalog/ArtworkModal";

export default function ColeccionesPage() {
  const [activeFilter, setActiveFilter] = useState<string | "all">("all");
  
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
    <main className="bg-[#0a0a0a] min-h-screen relative text-foreground selection:bg-brand-200 selection:text-black">
      
      {/* Header Placeholder (if applicable in layout, otherwise include here) */}
      <header className="fixed top-0 w-full z-40 bg-gradient-to-b from-black to-transparent h-24 pointer-events-none" />

      {/* Intro Header */}
      <section className="pt-32 pb-16 px-6 md:px-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">El Catálogo</h1>
        <p className="text-white/60 font-light text-sm md:text-base">
          Explora nuestra colección curada. Selecciona una obra para visualizarla inmersivamente en su formato correspondiente.
        </p>
      </section>

      {/* Minimalist Grid */}
      <CatalogGrid 
        categories={CATALOG_DATA}
        activeCategory={activeFilter}
        onFilterChange={setActiveFilter}
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
      <section className="h-[40vh] flex flex-col items-center justify-center bg-black border-t border-white/10 mt-16">
        <h2 className="text-3xl md:text-5xl font-serif mb-8 italic text-white/90">¿Tienes tu propia visión?</h2>
        <a 
          href="/cuadros-personalizados" 
          className="px-8 py-4 border border-brand-100 text-brand-100 font-mono text-sm tracking-widest uppercase hover:bg-brand-100 hover:text-black transition-colors"
        >
          Crear Arte a Medida
        </a>
      </section>
    </main>
  );
}
