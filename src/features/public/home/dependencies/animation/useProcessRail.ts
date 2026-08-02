"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { EASE, SCRUB } from "@/src/lib/animation/animation.tokens";

const DIM = 0.35;

const SPAN = 1;

// Turns downward scrolling into a sideways run through the steps, lighting each
// card as it arrives. Wide screens only — below that the rail is a plain column.
export const useProcessRail = (cardCount: number) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || cardCount < 2) return;

      const track = section.querySelector<HTMLElement>("[data-rail-track]");
      const viewport = track?.parentElement;
      const progress = section.querySelector<HTMLElement>(
        "[data-rail-progress]",
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-rail-card]",
        section,
      );

      if (!track || !viewport || cards.length !== cardCount) return;

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const distance = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth);

          gsap.set(cards, { opacity: (index) => (index === 0 ? 1 : DIM) });

          const timeline = gsap.timeline({
            defaults: { ease: EASE.none },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              anticipatePin: 1,
              scrub: SCRUB,
              invalidateOnRefresh: true,
            },
          });

          timeline.to(track, { x: () => -distance(), duration: SPAN }, 0);

          if (progress) {
            timeline.to(progress, { scaleX: 1, duration: SPAN }, 0);
          }

          const slot = SPAN / cardCount;

          cards.forEach((card, index) => {
            if (index === 0) return;

            timeline.to(
              card,
              { opacity: 1, duration: slot * 0.6 },
              slot * (index - 0.6),
            );
          });
        },
      );

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        media.kill();
      };
    },
    { scope: sectionRef, dependencies: [cardCount] },
  );

  return sectionRef;
};
