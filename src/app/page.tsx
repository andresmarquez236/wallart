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
      <footer className="h-48 bg-[color:var(--surface)] w-full flex flex-col items-center justify-center text-[color:var(--muted)] font-mono text-xs tracking-widest uppercase relative z-10 border-t border-[color:var(--border)]">
        <p>Wall Art Studio © 2026</p>
        <p className="mt-2">MIT Level Experience</p>
      </footer>
    </main>
  );
}
