"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/theme/ThemeProvider";

import Image from "next/image";

const styles = [
  { id: "abstract", title: "Abstracto", dark: "#161c27", light: "#e8eef8", image: "/assets/muestra_3.jpeg" },
  { id: "minimalist", title: "Minimalista", dark: "#111722", light: "#edf2fb", image: "/assets/muestra_4.png" },
  { id: "photography", title: "Fotografía", dark: "#1a2432", light: "#dde8f7", image: "/assets/muestra_5.png" },
  { id: "classic", title: "Clásico", dark: "#252f40", light: "#dbe3f0", image: "/assets/muestra_6.png" },
];

export function GalleryWalk() {
  const { theme } = useTheme();
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
          onEnter: () => gsap.to(bgRef.current, { backgroundColor: styles[i][theme], duration: 0.5 }),
          onEnterBack: () => gsap.to(bgRef.current, { backgroundColor: styles[i][theme], duration: 0.5 }),
        });
      });

    }, container);

    return () => ctx.revert();
  }, [theme]);

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden">
      {/* Dynamic Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-colors duration-500 ease-in-out"
        style={{ backgroundColor: styles[0][theme] }}
      />
      
      {/* Horizontal Scroll Wrapper */}
      <div ref={wrapper} className="absolute top-0 left-0 h-full flex w-[400vw]">
        {styles.map((style) => (
          <div 
            key={style.id} 
            className="gallery-panel relative w-screen h-full flex flex-col items-center justify-center p-8 lg:p-24"
          >
            <div className="relative w-[85vw] md:w-[60vw] max-w-5xl aspect-video flex items-center justify-center shadow-[10px_20px_40px_var(--shadow-color)] overflow-hidden bg-[color:var(--surface)] rounded-sm transform transition-transform hover:scale-[1.02] duration-500">
               <Image src={style.image} alt={style.title} fill className="object-cover opacity-90" />
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 mix-blend-overlay" />
            </div>
            <h3 className="mt-12 text-5xl md:text-7xl font-serif text-foreground italic tracking-tight">
              {style.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
