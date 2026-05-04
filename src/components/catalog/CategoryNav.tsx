"use client";

import { Category } from "@/lib/catalog-data";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
}

export function CategoryNav({ categories, activeCategoryId, onSelect }: CategoryNavProps) {
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className="group relative flex items-center justify-end"
        >
          {/* Label (Shows on hover or active) */}
          <span className={cn(
            "absolute right-8 mr-4 text-xs font-mono uppercase tracking-widest transition-all duration-300",
            activeCategoryId === category.id 
              ? "opacity-100 translate-x-0 text-white" 
              : "opacity-0 translate-x-4 text-white/50 group-hover:opacity-100 group-hover:translate-x-0"
          )}>
            {category.title}
          </span>
          
          {/* Dot */}
          <div className={cn(
            "w-2 h-2 rounded-full transition-all duration-500",
            activeCategoryId === category.id 
              ? "bg-brand-300 scale-150 shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
              : "bg-white/20 hover:bg-white/50"
          )} />
        </button>
      ))}
    </nav>
  );
}
