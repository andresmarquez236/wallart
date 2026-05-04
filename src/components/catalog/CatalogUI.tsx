"use client";

import { Category } from "@/lib/catalog-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface CatalogUIProps {
  categories: Category[];
  activeCategoryId: string;
  activeArtworkId: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectArtwork: (artworkId: string) => void;
}

export function CatalogUI({ 
  categories, 
  activeCategoryId, 
  activeArtworkId, 
  onSelectCategory, 
  onSelectArtwork 
}: CatalogUIProps) {
  
  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];
  const activeArtwork = activeCategory.artworks.find(a => a.id === activeArtworkId) || activeCategory.artworks[0];

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between pb-8">
      
      {/* Top Format Selector */}
      <div className="pt-24 px-8 md:px-16 pointer-events-auto flex justify-center">
        <div className="flex space-x-8 md:space-x-16 border-b border-white/10 pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onSelectCategory(category.id);
                // Auto-select first artwork of new category
                onSelectArtwork(category.artworks[0].id);
              }}
              className={cn(
                "font-mono text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-300",
                activeCategoryId === category.id 
                  ? "text-brand-300 font-bold" 
                  : "text-white/40 hover:text-white/80"
              )}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Interface: Info + Thumbnails */}
      <div className="px-8 md:px-16 pointer-events-auto flex flex-col md:flex-row items-end justify-between gap-8">
        
        {/* Artwork Info & Buy Button */}
        <div className="text-left w-full md:w-1/3">
           <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide leading-tight">
             {activeArtwork.title}
           </h2>
           <p className="text-white/60 font-light mt-3 max-w-sm text-sm md:text-base">
             {activeArtwork.description}
           </p>
           <p className="text-xl md:text-2xl font-light text-white mt-4">
             ${activeArtwork.price}
           </p>
           
           <button className="mt-6 flex items-center gap-2 bg-white text-black px-8 py-3 rounded-none font-bold uppercase tracking-widest text-xs hover:bg-brand-200 transition-colors">
             <ShoppingCart className="w-4 h-4" /> Añadir
           </button>
        </div>

        {/* Horizontal Thumbnails */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide max-w-full md:max-w-[50%]">
          {activeCategory.artworks.map((art) => (
            <button
              key={art.id}
              onClick={() => onSelectArtwork(art.id)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 md:w-28 md:h-28 border transition-all duration-300",
                art.id === activeArtworkId 
                  ? "border-white scale-105 opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                  : "border-white/20 opacity-40 grayscale hover:grayscale-0 hover:opacity-80"
              )}
            >
              <Image src={art.image} alt={art.title} fill className="object-cover" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
