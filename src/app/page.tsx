import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Transformation } from "@/components/home/Transformation";
import { GalleryWalk } from "@/components/home/GalleryWalk";
import { Decision } from "@/components/home/Decision";

export default function Home() {
  return (
    <main className="w-full bg-background">
      {/* Act 1: Impact */}
      <Hero />
      
      {/* Act 2: The Story */}
      <Manifesto />

      {/* Act 3: Before & After Reveal */}
      <Transformation />

      {/* Act 4: Dynamic Horizontal Scroll */}
      <GalleryWalk />

      {/* Act 5: Split CTA */}
      <Decision />

      {/* Footer Placeholder */}
      <footer className="h-48 bg-brand-900 w-full flex flex-col items-center justify-center text-brand-100/30 font-mono text-xs tracking-widest uppercase relative z-10 border-t border-white/5">
        <p>Wall Art Studio © 2026</p>
        <p className="mt-2">MIT Level Experience</p>
      </footer>
    </main>
  );
}
