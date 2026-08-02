"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { EASE, SCRUB } from "@/src/lib/animation/animation.tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SCROLL_PER_SCENE = 0.9;
const SCENE_UNIT = 1;

// Pins the banner and swaps photo and copy together as the page is scrolled.
export const useBannerTimeline = (sceneCount: number) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || sceneCount < 2) return;

      const pick = (selector: string) =>
        gsap.utils.toArray<HTMLElement>(selector, section);

      const layers = pick("[data-banner-media]");
      const scenes = pick("[data-banner-scene]");
      const [progress] = pick("[data-banner-progress]");
      const [cue] = pick("[data-banner-cue]");

      if (layers.length !== sceneCount || scenes.length !== sceneCount) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { duration: SCENE_UNIT, ease: EASE.inOut },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${window.innerHeight * SCROLL_PER_SCENE * (sceneCount - 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        });

        const span = SCENE_UNIT * (sceneCount - 1);

        if (cue) {
          timeline.to(cue, { autoAlpha: 0, duration: SCENE_UNIT * 0.3 }, 0);
        }

        if (progress) {
          timeline.to(
            progress,
            { scaleX: 1, duration: span, ease: EASE.none },
            0,
          );
        }

        for (let index = 1; index < sceneCount; index += 1) {
          const at = (index - 1) * SCENE_UNIT;

          timeline
            .to(layers[index - 1], { autoAlpha: 0, scale: 1.06 }, at)
            .fromTo(
              layers[index],
              { autoAlpha: 0, scale: 1.12 },
              { autoAlpha: 1, scale: 1 },
              at,
            )
            .to(
              scenes[index - 1],
              { autoAlpha: 0, yPercent: -12, duration: SCENE_UNIT * 0.4 },
              at,
            )
            .fromTo(
              scenes[index],
              { autoAlpha: 0, yPercent: 14 },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: SCENE_UNIT * 0.5,
                ease: EASE.out,
              },
              at + SCENE_UNIT * 0.35,
            );
        }
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        media.kill();
      };
    },
    { scope: sectionRef, dependencies: [sceneCount] },
  );

  return sectionRef;
};
