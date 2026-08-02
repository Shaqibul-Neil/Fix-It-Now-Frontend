"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { DURATION, EASE, STAGGER } from "@/src/lib/animation/animation.tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SHIFT = 24;

const DIM = 0.35;

// A pointer that can hover is the whole premise — a touch device gets the rows
// with their detail and thumbnail already open instead.
const HOVER_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Drives the rules-style index: rows light up one at a time and a preview card
// trails the cursor with the hovered category's photo.
export const useCategoryIndex = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const pick = <TElement extends HTMLElement>(
        selector: string,
        scope: HTMLElement = root,
      ) => gsap.utils.toArray<TElement>(selector, scope);

      const [card] = pick("[data-preview-card]");
      const previews = pick("[data-preview]");
      const rows = pick("[data-row]");
      const titles = pick("[data-row-title]");
      const sweeps = pick("[data-row-sweep]");
      const arrows = pick("[data-row-arrow]");
      const details = pick("[data-row-detail]");

      if (!card || rows.length !== previews.length) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(rows, {
          opacity: 0,
          y: 40,
          duration: DURATION.base,
          ease: EASE.out,
          stagger: STAGGER,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      media.add(HOVER_QUERY, () => {
        // Centring happens inside the same transform gsap writes — a
        // translate utility class would be overwritten by the follow tween.
        gsap.set(card, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
        gsap.set(previews, { autoAlpha: 0, scale: 0.9, rotate: 4 });
        gsap.set(sweeps, { scaleX: 0 });
        gsap.set(arrows, { rotate: -35, autoAlpha: 0.3 });
        gsap.set(details, { autoAlpha: 0, y: -6 });

        const xTo = gsap.quickTo(card, "x", {
          duration: DURATION.fast,
          ease: EASE.out,
        });

        const yTo = gsap.quickTo(card, "y", {
          duration: DURATION.fast,
          ease: EASE.out,
        });

        const follow = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect();
          xTo(event.clientX - bounds.left);
          yTo(event.clientY - bounds.top);
        };

        const reset = () => {
          gsap.to(card, { autoAlpha: 0, duration: 0.2 });
          gsap.to(titles, { opacity: 1, duration: 0.3, ease: EASE.out });
        };

        root.addEventListener("pointermove", follow);
        root.addEventListener("pointerleave", reset);

        const teardown = rows.map((row, index) => {
          const enter = () => {
            gsap.to(titles, { opacity: DIM, duration: 0.3, ease: EASE.out });
            gsap.to(titles[index], { opacity: 1, duration: 0.3, ease: EASE.out });

            gsap.to(pick("[data-row-shift]", row), {
              x: SHIFT,
              duration: DURATION.fast,
              ease: EASE.out,
            });

            gsap.to(sweeps[index], {
              scaleX: 1,
              duration: DURATION.base,
              ease: EASE.out,
            });

            gsap.to(arrows[index], {
              rotate: 0,
              autoAlpha: 1,
              duration: DURATION.fast,
              ease: EASE.out,
            });

            gsap.to(details[index], {
              autoAlpha: 1,
              y: 0,
              duration: 0.35,
              ease: EASE.out,
            });

            gsap.to(card, { autoAlpha: 1, duration: 0.25 });

            gsap.to(
              previews.filter((preview) => preview !== previews[index]),
              { autoAlpha: 0, scale: 0.9, rotate: 4, duration: 0.2 },
            );

            gsap.to(previews[index], {
              autoAlpha: 1,
              scale: 1,
              rotate: -3,
              duration: DURATION.fast,
              ease: EASE.pop,
            });
          };

          const leave = () => {
            gsap.to(pick("[data-row-shift]", row), {
              x: 0,
              duration: DURATION.fast,
              ease: EASE.out,
            });

            gsap.to(sweeps[index], {
              scaleX: 0,
              duration: DURATION.fast,
              ease: EASE.out,
            });

            gsap.to(arrows[index], {
              rotate: -35,
              autoAlpha: 0.3,
              duration: DURATION.fast,
              ease: EASE.out,
            });

            gsap.to(details[index], { autoAlpha: 0, y: -6, duration: 0.25 });
          };

          row.addEventListener("pointerenter", enter);
          row.addEventListener("pointerleave", leave);

          return () => {
            row.removeEventListener("pointerenter", enter);
            row.removeEventListener("pointerleave", leave);
          };
        });

        return () => {
          root.removeEventListener("pointermove", follow);
          root.removeEventListener("pointerleave", reset);
          teardown.forEach((remove) => remove());
        };
      });

      return () => media.kill();
    },
    { scope: rootRef },
  );

  return rootRef;
};
