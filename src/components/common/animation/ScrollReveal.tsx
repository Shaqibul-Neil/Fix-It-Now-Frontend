"use client";

import type { ReactNode } from "react";
import { useRevealOnScroll } from "@/src/hooks/animation/useRevealOnScroll";

interface IScrollRevealProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  stagger?: number;
}

const ScrollReveal = ({
  children,
  className,
  distance,
  stagger,
}: IScrollRevealProps) => {
  const containerRef = useRevealOnScroll<HTMLDivElement>({
    distance,
    stagger,
  });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
