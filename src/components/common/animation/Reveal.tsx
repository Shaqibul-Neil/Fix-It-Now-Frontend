"use client";

import type { ReactNode } from "react";
import { useRevealOnMount } from "@/src/hooks/animation/useRevealOnMount";

interface IRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Reveal = ({ children, className, delay }: IRevealProps) => {
  const containerRef = useRevealOnMount<HTMLDivElement>({ delay });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
