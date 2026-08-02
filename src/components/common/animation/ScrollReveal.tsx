"use client";

import type { ReactNode } from "react";
import { useRevealOnScroll } from "@/src/hooks/animation/useRevealOnScroll";

interface IScrollRevealProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  stagger?: number;
  variant?: "fade" | "wipe";
}

const ScrollReveal = ({
  children,
  className,
  distance,
  stagger,
  variant,
}: IScrollRevealProps) => {
  const containerRef = useRevealOnScroll<HTMLDivElement>({
    distance,
    stagger,
    variant,
  });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
