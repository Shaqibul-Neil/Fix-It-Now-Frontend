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

const SLIDE_UNIT = 1;
const SCROLL_PER_SLIDE = 0.95;
const DRIFT = 40;

interface IBannerTimelineOptions {
  slideCount: number;
  direction?: TParallaxDirection;
}

export const useBannerTimeline = ({
  slideCount,
  direction = "up",
}: IBannerTimelineOptions) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || slideCount < 2) return;

      const pick = (parent: Element, selector: string) =>
        gsap.utils.toArray<HTMLElement>(selector, parent);

      const layers = pick(section, "[data-banner-media]");
      const copies = pick(section, "[data-banner-copy]");
      const ticks = pick(section, "[data-banner-tick]");
      const [drift] = pick(section, "[data-banner-drift]");
      const [progress] = pick(section, "[data-banner-progress]");
      const [cue] = pick(section, "[data-banner-cue]");

      if (layers.length !== slideCount || copies.length !== slideCount) return;

      const { axis, sign } = PARALLAX_TRAVEL[direction];
      const offset = axis === "y" ? "yPercent" : "xPercent";

      const build = (isReduced: boolean) => {
        layers.forEach((layer, index) => {
          if (index === 0) return;

          gsap.set(layer, { autoAlpha: isReduced ? 0 : 1 });
          if (isReduced) return;

          gsap.set(pick(layer, "[data-media-cover]"), { [offset]: 100 * sign });
          gsap.set(pick(layer, "[data-media-image]"), {
            [offset]: -100 * sign,
            scale: 1.12,
          });
        });

        if (ticks.length) gsap.set(ticks[0], { scaleX: 1 });

        const timeline = gsap.timeline({
          defaults: { duration: SLIDE_UNIT, ease: EASE.none },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${window.innerHeight * SCROLL_PER_SLIDE * (slideCount - 1)}`,
            pin: true,
            anticipatePin: 1,
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        });

        const span = SLIDE_UNIT * (slideCount - 1);

        if (cue) {
          timeline.to(cue, { autoAlpha: 0, duration: SLIDE_UNIT * 0.25 }, 0);
        }

        if (progress) {
          timeline.to(progress, { scaleX: 1, duration: span }, 0);
        }

        if (drift && !isReduced) {
          timeline.to(drift, { [axis]: -DRIFT * sign, duration: span }, 0);
        }

        for (let index = 1; index < slideCount; index += 1) {
          const at = (index - 1) * SLIDE_UNIT;
          const incoming = copies[index];
          const outgoing = copies[index - 1];

          if (isReduced) {
            timeline.to(
              layers[index],
              { autoAlpha: 1, duration: SLIDE_UNIT * 0.6 },
              at,
            );
          } else {
            timeline
              .to(
                pick(layers[index], "[data-media-cover]"),
                { [offset]: 0, ease: EASE.inOut },
                at,
              )
              .to(
                pick(layers[index], "[data-media-image]"),
                { [offset]: 0, scale: 1, ease: EASE.inOut },
                at,
              )
              .to(
                pick(layers[index - 1], "[data-media-image]"),
                { scale: 1.08 },
                at,
              );
          }

          timeline
            .to(outgoing, { autoAlpha: 0, duration: SLIDE_UNIT * 0.3 }, at)
            .set(incoming, { autoAlpha: 1 }, at + SLIDE_UNIT * 0.28);

          if (!isReduced) {
            timeline.fromTo(
              pick(incoming, "[data-copy-mask] > *"),
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: SLIDE_UNIT * 0.45,
                ease: EASE.out,
                stagger: 0.05,
              },
              at + SLIDE_UNIT * 0.28,
            );
          }

          timeline.fromTo(
            pick(incoming, "[data-copy-line]"),
            { opacity: 0, y: isReduced ? 0 : 24 },
            {
              opacity: 1,
              y: 0,
              duration: SLIDE_UNIT * 0.45,
              ease: EASE.out,
              stagger: 0.05,
            },
            at + SLIDE_UNIT * 0.32,
          );

          if (ticks.length === slideCount) {
            timeline
              .to(
                ticks[index - 1],
                {
                  scaleX: 0,
                  transformOrigin: "right center",
                  duration: SLIDE_UNIT * 0.35,
                },
                at,
              )
              .to(
                ticks[index],
                {
                  scaleX: 1,
                  transformOrigin: "left center",
                  duration: SLIDE_UNIT * 0.5,
                },
                at + SLIDE_UNIT * 0.2,
              );
          }
        }
      };

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => build(false));
      media.add("(prefers-reduced-motion: reduce)", () => build(true));

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        media.kill();
      };
    },
    { scope: sectionRef, dependencies: [slideCount, direction] },
  );

  return sectionRef;
};
