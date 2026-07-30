"use client";

import type { ReactNode } from "react";
import type { TParallaxDirection } from "@/src/lib/animation/parallax.direction";
import { useBannerTimeline } from "../animation/useBannerTimeline";

interface IBannerMotionProps {
  slideCount: number;
  direction?: TParallaxDirection;
  className?: string;
  children: ReactNode;
}

const BannerMotion = ({
  slideCount,
  direction,
  className,
  children,
}: IBannerMotionProps) => {
  const sectionRef = useBannerTimeline({ slideCount, direction });

  return (
    <section
      ref={sectionRef}
      aria-label="Featured services"
      data-navbar-overlay
      className={className}
    >
      {children}
    </section>
  );
};

export default BannerMotion;
