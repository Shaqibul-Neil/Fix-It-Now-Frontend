"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { DURATION, EASE } from "@/src/lib/animation/animation.tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ICountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  storageKey?: string;
  className?: string;
}

const format = (value: number, decimals: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

// Counts from zero up to the value once, the first time it scrolls into view.
const CountUp = ({
  value,
  decimals = 0,
  suffix,
  duration = DURATION.slow * 2,
  storageKey,
  className,
}: ICountUpProps) => {
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = numberRef.current;
      if (!node) return;

      const alreadyRan =
        Boolean(storageKey) && sessionStorage.getItem(storageKey!) === "1";
      const isReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (alreadyRan || isReduced) return;

      const counter = { current: 0 };
      node.textContent = format(0, decimals);

      gsap.to(counter, {
        current: value,
        duration,
        ease: EASE.out,
        onUpdate: () => {
          node.textContent = format(counter.current, decimals);
        },
        onComplete: () => {
          if (storageKey) sessionStorage.setItem(storageKey, "1");
        },
        scrollTrigger: { trigger: node, start: "top 90%", once: true },
      });
    },
    { dependencies: [value, decimals, duration, storageKey] },
  );

  return (
    <span className={className}>
      <span ref={numberRef}>{format(value, decimals)}</span>
      {suffix}
    </span>
  );
};

export default CountUp;
