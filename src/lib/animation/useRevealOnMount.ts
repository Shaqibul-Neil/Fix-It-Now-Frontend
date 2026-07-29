"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { DURATION, EASE, STAGGER } from "./animation.tokens";

// useGSAP is registered as a plugin so bundlers never tree-shake it away.
gsap.registerPlugin(useGSAP);

interface IRevealOptions {
  delay?: number;
  distance?: number;
  stagger?: number;
}

// Fades and lifts the direct children of the returned ref, one after another.
// Generic on purpose — any section can reuse it, not only auth.
export const useRevealOnMount = <TElement extends HTMLElement = HTMLDivElement>({
  delay = 0,
  distance = 24,
  stagger = STAGGER,
}: IRevealOptions = {}) => {
  const containerRef = useRef<TElement>(null);

  useGSAP(
    () => {
      const children = containerRef.current?.children;
      if (!children?.length) return;

      gsap.from(children, {
        opacity: 0,
        y: distance,
        duration: DURATION.base,
        ease: EASE.out,
        stagger,
        delay,
      });
    },
    { scope: containerRef },
  );

  return containerRef;
};
