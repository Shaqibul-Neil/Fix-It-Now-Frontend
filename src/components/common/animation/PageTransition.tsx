"use client";

import type { ReactNode } from "react";
import { useRouteTransition } from "@/src/hooks/animation/useRouteTransition";

interface IPageTransitionProps {
  children: ReactNode;
  className?: string;
}

const PageTransition = ({ children, className }: IPageTransitionProps) => {
  const containerRef = useRouteTransition<HTMLDivElement>();

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default PageTransition;
