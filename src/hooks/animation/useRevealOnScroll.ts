"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { DURATION, EASE, STAGGER } from "@/src/lib/animation/animation.tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// "wipe" uncovers a child from its left edge — for filled or bordered blocks,
// where a plain fade reads as flat.
type TRevealVariant = "fade" | "wipe";

interface IRevealOnScrollOptions {
  distance?: number;
  stagger?: number;
  start?: string;
  variant?: TRevealVariant;
}

// Same fade-up as useRevealOnMount, but gated on scroll position instead of
// firing at mount — for content that starts below the fold.
export const useRevealOnScroll = <
  TElement extends HTMLElement = HTMLDivElement,
>({
  distance = 24,
  stagger = STAGGER,
  start = "top 85%",
  variant = "fade",
}: IRevealOnScrollOptions = {}) => {
  const containerRef = useRef<TElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const children = container?.children;
      if (!container || !children?.length) return;

      const isWipe = variant === "wipe";

      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: distance,
          ...(isWipe && { clipPath: "inset(0 100% 0 0)" }),
        },
        {
          opacity: 1,
          y: 0,
          ...(isWipe && { clipPath: "inset(0 0% 0 0)" }),
          duration: isWipe ? DURATION.slow : DURATION.base,
          ease: EASE.out,
          stagger,
          clearProps: isWipe ? "clipPath" : "none",
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: "play none none none",
          },
        },
      );

      // Several sibling sections each register their own ScrollTrigger on
      // mount; one created before a later section settles its layout can end
      // up with a stale start position and never fire. A refresh once
      // everything has painted recalculates every trigger against final
      // layout, so nothing is left stuck at opacity 0.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => ScrollTrigger.refresh()),
      );
    },
    { scope: containerRef, dependencies: [variant] },
  );

  return containerRef;
};
