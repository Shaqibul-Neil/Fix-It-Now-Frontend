"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { DURATION, EASE, STAGGER } from "@/src/lib/animation/animation.tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Replays the quote, the docket rows and the repair photos every time a
// different review is picked. The very first play waits for the scroll.
export const useTestimonialSwap = (activeIndex: number) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const hasPlayed = useRef(false);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const scrollTrigger = hasPlayed.current
        ? undefined
        : {
            trigger: root,
            start: "top 80%",
            toggleActions: "play none none none",
          };

      hasPlayed.current = true;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-quote]",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            ease: EASE.out,
            scrollTrigger,
          },
        );

        gsap.fromTo(
          "[data-docket-row]",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: DURATION.fast,
            ease: EASE.out,
            stagger: STAGGER,
            scrollTrigger,
          },
        );

        gsap.fromTo(
          "[data-shot]",
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: DURATION.slow,
            ease: EASE.out,
            stagger: STAGGER,
            clearProps: "clipPath",
            scrollTrigger,
          },
        );
      });

      return () => media.kill();
    },
    { scope: rootRef, dependencies: [activeIndex], revertOnUpdate: true },
  );

  return rootRef;
};
