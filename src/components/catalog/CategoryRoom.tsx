"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Category, FormatType } from "@/lib/catalog-data";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryRoomProps {
  category: Category;
  isActive: boolean;
}

export function CategoryRoom({ category, isActive }: CategoryRoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const artworksWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !artworksWrapperRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const totalArtworks = category.artworks.length;
    
    // We pin the container for a duration proportional to the number of artworks
    // e.g., 3 artworks = 300% of viewport height
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalArtworks * 100}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Calculate which artwork should be active based on scroll progress
          const index = Math.min(
            Math.floor(self.progress * totalArtworks),
            totalArtworks - 1
          );
          setActiveIndex(index);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [category.artworks.length]);

  const activeArt = category.artworks[activeIndex];

  // Helper to render the sliced art based on format
  const renderSlices = (imageUrl: string, format: FormatType) => {
    let slices: Array<{ width: string; height: string; bgPos: string }> = [];
    if (format === "one-piece") {
      slices = [{ width: "w-full", height: "h-full", bgPos: "center" }];
    } else if (format === "triptych") {
      slices = [
        { width: "w-1/3", height: "h-full", bgPos: "0%" },
        { width: "w-1/3", height: "h-full", bgPos: "50%" },
        { width: "w-1/3", height: "h-full", bgPos: "100%" },
      ];
    } else if (format === "five-piece") {
      slices = [
        { width: "w-1/5", height: "h-[60%]", bgPos: "0%" },
        { width: "w-1/5", height: "h-[80%]", bgPos: "25%" },
        { width: "w-1/5", height: "h-[100%]", bgPos: "50%" },
        { width: "w-1/5", height: "h-[80%]", bgPos: "75%" },
        { width: "w-1/5", height: "h-[60%]", bgPos: "100%" },
      ];
    }

    return (
      <div className="relative w-full h-full flex justify-center items-center gap-2 md:gap-4 z-20">
        {slices.map((slice, i) => (
          <div 
            key={i} 
            className={cn(
              "relative overflow-hidden rounded-sm transform transition-transform hover:scale-[1.02] duration-500 shadow-[10px_20px_30px_rgba(0,0,0,0.8)]",
              slice.width, slice.height
            )}
          >
            <div 
              className="absolute inset-0 h-full"
              style={{
                width: format === "one-piece" ? "100%" : (format === "triptych" ? "300%" : "500%"),
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: `${slice.bgPos} center`,
                transform: format === "one-piece" ? "none" : `translateX(-${i * (format === "triptych" ? 33.33 : 20)}%)`
              }}
            />
            {/* Acrylic gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/20 mix-blend-overlay pointer-events-none" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-background overflow-hidden">
      {/* Background Room */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={category.roomImage} 
          alt={`Sala ${category.title}`} 
          fill 
          className="object-cover opacity-50"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--overlay-strong)] to-[color:var(--surface)] -z-10" />
      </div>

      {/* Art Projection Area */}
      {/* We adjust the width based on the format. Triptychs and 5-pieces need to be wider than 1-piece. */}
      <div className={cn(
        "relative z-10 mx-auto aspect-video flex flex-col items-center justify-center mt-[-15vh] md:mt-[-10vh] transition-all duration-1000",
        category.id === "one-piece" ? "w-[70%] md:w-[40%] max-w-2xl" : "w-[90%] md:w-[60%] max-w-5xl"
      )}>
        
        {/* We stack all artworks and fade between them based on activeIndex */}
        <div className="absolute inset-0 w-full h-full" ref={artworksWrapperRef}>
          {category.artworks.map((art, idx) => (
            <div 
              key={art.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                idx === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              {renderSlices(art.image, category.id)}
            </div>
          ))}
          {/* Subtle Glow Behind the Art */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent -z-10 blur-[80px]" />
        </div>
      </div>

      {/* Interface / Overlays */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row items-end md:items-end justify-between z-20 transition-opacity duration-1000 delay-300",
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        
        {/* Art Info */}
        <div className="text-left w-full md:w-1/3 mb-8 md:mb-0">
           <h4 className="text-brand-400 font-mono text-[0.6rem] md:text-xs tracking-[0.3em] uppercase mb-2">
             Formato: {category.title}
           </h4>
           <h2 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide">
             {activeArt?.title}
           </h2>
           <p className="text-[color:var(--foreground-soft)] font-light mt-2 md:mt-4 max-w-sm text-sm md:text-base">
             {activeArt?.description}
           </p>
           <p className="text-xl md:text-2xl font-light text-foreground mt-4">
             ${activeArt?.price}
           </p>
           
           <button className="mt-6 flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-none font-bold uppercase tracking-widest text-[0.6rem] md:text-xs hover:bg-brand-200 transition-colors">
             <ShoppingCart className="w-4 h-4" /> Añadir
           </button>
        </div>

        {/* Thumbnails (Miniaturas) */}
        <div className="flex gap-4">
          {category.artworks.map((art, idx) => (
            <button
              key={art.id}
              className={cn(
                "relative w-16 h-16 md:w-24 md:h-24 border border-[color:var(--border)] overflow-hidden transition-all duration-300 hover:scale-105 hover:border-foreground",
                idx === activeIndex ? "border-foreground scale-105 opacity-100" : "opacity-40 grayscale"
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
