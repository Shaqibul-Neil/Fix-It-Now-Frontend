"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { DURATION, EASE } from "@/src/lib/animation/animation.tokens";

// Auth-only choreography: wordmark drops, headline lines rise out of their
// masks, the brass rule draws across, then the proof rows settle.
export const useAuthAsideTimeline = () => {
  const asideRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: EASE.out } });

      timeline
        .from("[data-aside-brand]", {
          opacity: 0,
          y: -16,
          duration: DURATION.fast,
        })
        .from(
          "[data-aside-line]",
          { yPercent: 115, duration: DURATION.base, stagger: 0.1 },
          "-=0.2",
        )
        .from(
          "[data-aside-rule]",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: DURATION.slow,
          },
          "-=0.55",
        )
        .from(
          "[data-aside-item]",
          { opacity: 0, x: -18, duration: DURATION.fast, stagger: 0.08 },
          "-=0.8",
        )
        .from(
          "[data-aside-stat]",
          { opacity: 0, y: 18, duration: DURATION.fast, stagger: 0.08 },
          "-=0.45",
        );
    },
    { scope: asideRef },
  );

  return asideRef;
};
