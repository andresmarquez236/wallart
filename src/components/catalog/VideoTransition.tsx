"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface VideoTransitionProps {
  videoSrc: string;
}

export function VideoTransition({ videoSrc }: VideoTransitionProps) {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!container.current || !videoRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;

    // We wait for the video metadata to load so we know its duration
    video.onloadedmetadata = () => {
      const ctx = gsap.context(() => {
        // Scrub the video based on scroll progress through this container
        ScrollTrigger.create({
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Slight smoothing
          onUpdate: (self) => {
             if (video.duration) {
               video.currentTime = video.duration * self.progress;
             }
          }
        });
      }, container);

      return () => ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={container}
      className="relative w-full h-[200vh] bg-black"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* We use a subtle text fallback in case video is missing/loading */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <p className="text-white/20 font-mono tracking-widest text-xs uppercase">
            Avanzando a la siguiente sala...
          </p>
        </div>
        
        <video 
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover opacity-90 mix-blend-screen"
          muted 
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
