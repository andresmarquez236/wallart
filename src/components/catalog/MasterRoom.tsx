"use client";

import Image from "next/image";
import { Category, FormatType } from "@/lib/catalog-data";
import { cn } from "@/lib/utils";

interface MasterRoomProps {
  categories: Category[];
  activeCategoryId: string;
  activeArtworkId: string;
}

export function MasterRoom({ categories, activeCategoryId, activeArtworkId }: MasterRoomProps) {
  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];
  const currentFormat = activeCategory.id as FormatType;
  const bgImages = categories.map(c => ({ id: c.id, url: c.roomImage }));

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
      <div className="relative w-full h-full flex justify-center items-center gap-2 md:gap-4 z-20 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]">
        {slices.map((slice, i) => (
          <div 
            key={i} 
            className={cn(
              "relative overflow-hidden rounded-sm transform transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] shadow-[10px_20px_30px_rgba(0,0,0,0.8)]",
              slice.width, slice.height
            )}
          >
            <div 
              className="absolute inset-0 h-full transition-all duration-700"
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
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-background">
      {/* Background Rooms Crossfade */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((bg) => (
          <div 
            key={bg.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              activeCategoryId === bg.id ? "opacity-40" : "opacity-0"
            )}
          >
            <Image 
              src={bg.url} 
              alt="Room environment" 
              fill 
              className="object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        ))}
        {/* Dark Editorial Gradient Map */}
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--overlay-strong)] via-[color:var(--overlay-soft)] to-background z-10" />
      </div>

      {/* Center Wall Art Projection */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video flex flex-col items-center justify-center transition-all duration-1000 z-20",
        currentFormat === "one-piece" ? "w-[70%] md:w-[35%] max-w-xl" : "w-[90%] md:w-[60%] max-w-5xl",
        "mt-[-5vh]" // slight upward offset to leave room for UI
      )}>
        
        {/* All artworks stacked, crossfade based on activeArtworkId */}
        <div className="absolute inset-0 w-full h-full">
          {categories.flatMap(c => c.artworks).map((art) => (
            <div 
              key={art.id}
              className={cn(
                "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] scale-95 origin-center",
                art.id === activeArtworkId ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              )}
            >
              {renderSlices(art.image, currentFormat)}
            </div>
          ))}
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent -z-10 blur-[80px]" />
        </div>
      </div>
    </div>
  );
}
