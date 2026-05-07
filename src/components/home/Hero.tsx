"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!container.current || !textRef.current || !bgRef.current || !videoRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    const initVideoScrub = () => {
      gsap.to(video, {
        currentTime: video.duration || 5,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    };
    
    const ctx = gsap.context(() => {
      // 1. Video Scroll Scrubbing
      if (video.readyState >= 1) {
        initVideoScrub();
      } else {
        video.addEventListener("loadedmetadata", initVideoScrub);
      }

      // 2. Background parallax effect
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 3. Text fade out and move up
      gsap.to(textRef.current, {
        y: -150,
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, container);

    return () => {
      ctx.revert();
      video.removeEventListener("loadedmetadata", initVideoScrub);
    };
  }, []);

  return (
    <section 
      ref={container} 
      className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 -top-[20%] h-[140%] w-full bg-[color:var(--surface)]"
      >
        <video 
          ref={videoRef}
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--overlay-soft)] to-background z-10" />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 text-center px-6 text-foreground">
        <h1 
          ref={textRef}
          className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.9] tracking-tighter"
        >
          Tu pared <br />
          <span className="italic font-light opacity-80 block mt-2 text-5xl md:text-7xl lg:text-[8rem]">no está vacía.</span>
        </h1>
      </div>
    </section>
  );
}
