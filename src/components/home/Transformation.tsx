"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";

export function Transformation() {
  const container = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || !frameRef.current || !artRef.current || !textContainerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the container
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "+=200%", // Pin for 2 viewport heights
        pin: true,
        anticipatePin: 1,
      });

      // Sequence: 1. Fade in Frame, 2. Fade in Art, 3. Fade in Text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
        }
      });

      tl.to(frameRef.current, { opacity: 1, duration: 1 })
        .to(artRef.current, { opacity: 1, duration: 1 })
        .to(textContainerRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, "-=0.5");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container}
      className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center"
    >
      {/* Wall Image */}
      <div className="absolute inset-0">
        <Image src="/assets/wall-v2.png" alt="Pared vacía" fill className="object-cover opacity-50" priority />
      </div>

      {/* The Art Piece Container - Smaller and positioned slightly higher */}
      <div className="relative w-[85%] md:w-[55%] max-w-4xl aspect-video mx-auto z-10 flex flex-col items-center justify-center -mt-16 md:-mt-24">
        {/* Frame Placeholder */}
        <div 
          ref={frameRef}
          className="absolute inset-0 opacity-0 flex items-center justify-center"
        >
          {/* Art Image (Hidden initially) */}
          <div 
            ref={artRef}
            className="absolute inset-0 opacity-0 flex items-center justify-center"
          >
            {/* CSS Multi-Panel Slicing */}
            <div className="relative w-full h-[60%] md:h-[80%] flex justify-center items-center gap-2 md:gap-4 z-20">
              {[
                { height: "h-[60%]", bgPos: "0%" },
                { height: "h-[80%]", bgPos: "25%" },
                { height: "h-[100%]", bgPos: "50%" },
                { height: "h-[80%]", bgPos: "75%" },
                { height: "h-[60%]", bgPos: "100%" },
              ].map((panel, i) => (
                <div 
                  key={i} 
                  className={`w-1/5 ${panel.height} relative shadow-[10px_20px_30px_rgba(0,0,0,0.8)] overflow-hidden rounded-sm transform transition-transform hover:scale-105 duration-500`}
                >
                  <div 
                    className="absolute inset-0 w-[500%] h-full"
                    style={{
                      backgroundImage: `url('/assets/art-v4.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: `${panel.bgPos} center`,
                      transform: `translateX(-${i * 20}%)`
                    }}
                  />
                  {/* Subtle glass/gloss overlay to simulate acrylic/rigid material */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/20 mix-blend-overlay" />
                </div>
              ))}
            </div>
            
            {/* Glow effect behind the art */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/30 via-amber-700/10 to-transparent -z-10 blur-[80px]" />
          </div>
        </div>

        {/* Animated Typography */}
        <div 
          ref={textContainerRef}
          className="absolute -bottom-28 md:-bottom-36 left-0 right-0 text-center opacity-0 translate-y-8 z-30"
        >
          <h3 className="text-2xl md:text-4xl font-serif text-white tracking-wide">
            Donde había vacío, ahora hay <span className="italic text-white/70">profundidad</span>.
          </h3>
          <p className="mt-4 md:mt-6 text-white/50 text-[0.7rem] md:text-sm font-light tracking-[0.3em] uppercase">
            Cada panel redefine lo invisible
          </p>
        </div>
      </div>
    </section>
  );
}
