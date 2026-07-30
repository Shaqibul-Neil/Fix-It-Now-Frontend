"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { DURATION, EASE } from "@/src/lib/animation/animation.tokens";

gsap.registerPlugin(useGSAP);

export const useRouteTransition = <
  TElement extends HTMLElement = HTMLDivElement,
>() => {
  const containerRef = useRef<TElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 16,
        duration: DURATION.fast,
        ease: EASE.out,
      });
    },
    { scope: containerRef, dependencies: [pathname] },
  );

  return containerRef;
};
