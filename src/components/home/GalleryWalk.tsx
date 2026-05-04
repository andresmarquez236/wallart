"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

import Image from "next/image";

const styles = [
  { id: "abstract", title: "Abstracto", color: "#1a1a1a", image: "/assets/gallery-1-v2.png" },
  { id: "minimalist", title: "Minimalista", color: "#0a0a0a", image: "/assets/gallery-2-v2.png" },
  { id: "photography", title: "Fotografía", color: "#2d3748", image: "/assets/gallery-3-v2.png" },
  { id: "classic", title: "Clásico", color: "#4a5568", image: "/assets/gallery-4-v2.png" },
];

export function GalleryWalk() {
  const container = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || !wrapper.current || !bgRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.gallery-panel');
      
      // Calculate total width to scroll
      const totalWidth = wrapper.current!.scrollWidth - window.innerWidth;

      // Horizontal Scroll Tween
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
        }
      });

      // Background Color shifts based on panel position
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: scrollTween,
          start: "left center",
          end: "right center",
          onEnter: () => gsap.to(bgRef.current, { backgroundColor: styles[i].color, duration: 0.5 }),
          onEnterBack: () => gsap.to(bgRef.current, { backgroundColor: styles[i].color, duration: 0.5 }),
        });
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden">
      {/* Dynamic Background */}
      <div ref={bgRef} className="absolute inset-0 bg-[#1a1a1a] transition-colors duration-500 ease-in-out" />
      
      {/* Horizontal Scroll Wrapper */}
      <div ref={wrapper} className="absolute top-0 left-0 h-full flex w-[400vw]">
        {styles.map((style, i) => (
          <div 
            key={style.id} 
            className="gallery-panel relative w-screen h-full flex flex-col items-center justify-center p-8 lg:p-24"
          >
            <div className="relative w-[85vw] md:w-[60vw] max-w-5xl aspect-video flex items-center justify-center shadow-[10px_20px_40px_rgba(0,0,0,0.6)] drop-shadow-2xl overflow-hidden bg-[#0a0a0a] rounded-sm transform transition-transform hover:scale-[1.02] duration-500">
               <Image src={style.image} alt={style.title} fill className="object-cover opacity-90" />
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 mix-blend-overlay" />
            </div>
            <h3 className="mt-12 text-5xl md:text-7xl font-serif text-white/90 italic tracking-tight mix-blend-difference">
              {style.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
