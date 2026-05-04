"use client";

import Image from "next/image";
import { Category, Artwork } from "@/lib/catalog-data";
import { cn } from "@/lib/utils";

interface CatalogGridProps {
  categories: Category[];
  activeCategory: string | "all";
  onFilterChange: (categoryId: string | "all") => void;
  onArtworkClick: (category: Category, artwork: Artwork) => void;
}

export function CatalogGrid({ categories, activeCategory, onFilterChange, onArtworkClick }: CatalogGridProps) {
  
  // Flatten artworks for "all" view, or get specific category artworks
  const displayedItems = activeCategory === "all" 
    ? categories.flatMap(c => c.artworks.map(a => ({ artwork: a, category: c })))
    : categories.find(c => c.id === activeCategory)?.artworks.map(a => ({ artwork: a, category: categories.find(c => c.id === activeCategory)! })) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
      
      {/* Sticky Filter Header */}
      <div className="sticky top-24 z-30 flex justify-center mb-16 bg-[#0a0a0a]/80 backdrop-blur-md py-4 border-b border-white/5">
        <div className="flex space-x-6 md:space-x-12 overflow-x-auto scrollbar-hide px-4">
          <button
            onClick={() => onFilterChange("all")}
            className={cn(
              "font-mono text-[0.6rem] md:text-xs tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap",
              activeCategory === "all" ? "text-brand-300 font-bold" : "text-white/40 hover:text-white/80"
            )}
          >
            Todas las Formas
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => onFilterChange(c.id)}
              className={cn(
                "font-mono text-[0.6rem] md:text-xs tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap",
                activeCategory === c.id ? "text-brand-300 font-bold" : "text-white/40 hover:text-white/80"
              )}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 md:gap-x-12">
        {displayedItems.map(({ artwork, category }, idx) => (
          <div 
            key={`${category.id}-${artwork.id}-${idx}`}
            className="group cursor-pointer flex flex-col"
            onClick={() => onArtworkClick(category, artwork)}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#111] mb-6">
              <Image 
                src={artwork.image} 
                alt={artwork.title} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Meta Info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-brand-200 transition-colors">
                  {artwork.title}
                </h3>
                <p className="font-mono text-[0.6rem] text-white/40 tracking-widest uppercase mt-2">
                  {category.title}
                </p>
              </div>
              <p className="font-light text-lg text-white/80">
                ${artwork.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
