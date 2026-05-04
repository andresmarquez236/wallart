"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Manifesto() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!container.current || !textRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Split text conceptually for animation (simple opacity reveal)
    // A more complex implementation would use SplitText, but we'll use a mask/gradient approach for a pure CSS/GSAP blend
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container}
      className="relative min-h-[80vh] w-full flex items-center justify-center bg-[#0a0a0a] px-6 py-32"
    >
      <div className="max-w-5xl mx-auto">
        <p 
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight md:leading-tight"
        >
          No vendemos <span className="italic text-white/50">impresiones</span>. <br />
          Creamos piezas visuales que transforman <span className="font-sans font-bold tracking-tighter">paredes</span>, espacios y <span className="italic">recuerdos</span> en <span className="underline decoration-1 underline-offset-8">arte</span>.
        </p>
      </div>
    </section>
  );
}
