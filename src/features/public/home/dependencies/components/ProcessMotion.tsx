"use client";

import type { ReactNode } from "react";
import { useProcessRail } from "../animation/useProcessRail";

interface IProcessMotionProps {
  cardCount: number;
  className?: string;
  children: ReactNode;
}

const ProcessMotion = ({
  cardCount,
  className,
  children,
}: IProcessMotionProps) => {
  const sectionRef = useProcessRail(cardCount);

  return (
    <section
      ref={sectionRef}
      aria-label="How FixItNow works"
      className={className}
    >
      {children}
    </section>
  );
};

export default ProcessMotion;
