"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { EASE, SCRUB } from "@/src/lib/animation/animation.tokens";
import {
  PARALLAX_TRAVEL,
  type TParallaxDirection,
} from "@/src/lib/animation/parallax.direction";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface IParallaxOptions {
  direction?: TParallaxDirection;
  distance?: number;
  selector?: string | null;
  scrub?: number;
  start?: string;
  end?: string;
}

export const useParallax = <TElement extends HTMLElement = HTMLDivElement>({
  direction = "up",
  distance = 120,
  selector = "[data-parallax]",
  scrub = SCRUB,
  start = "top bottom",
  end = "bottom top",
}: IParallaxOptions = {}) => {
  const containerRef = useRef<TElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const targets = selector
        ? gsap.utils.toArray<HTMLElement>(selector, container)
        : [container];
      if (!targets.length) return;

      const { axis, sign } = PARALLAX_TRAVEL[direction];

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        targets.forEach((target) => {
          const speed = Number(target.dataset.parallaxSpeed) || 1;
          const travel = distance * speed * sign;

          gsap.fromTo(
            target,
            { [axis]: travel },
            {
              [axis]: -travel,
              ease: EASE.none,
              scrollTrigger: {
                trigger: container,
                start,
                end,
                scrub,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });

      return () => media.kill();
    },
    {
      scope: containerRef,
      dependencies: [direction, distance, selector, scrub, start, end],
    },
  );

  return containerRef;
};
