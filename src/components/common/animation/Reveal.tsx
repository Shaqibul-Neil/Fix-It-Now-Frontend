"use client";

import type { ReactNode } from "react";
import { useRevealOnMount } from "@/src/lib/animation/useRevealOnMount";

interface IRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// children arrive as a prop, so Server Components passed in here stay on the
// server — only this wrapper ships to the browser.
const Reveal = ({ children, className, delay }: IRevealProps) => {
  const containerRef = useRevealOnMount<HTMLDivElement>({ delay });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
