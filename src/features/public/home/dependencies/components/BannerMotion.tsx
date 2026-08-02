"use client";

import type { ReactNode } from "react";
import { useBannerTimeline } from "../animation/useBannerTimeline";

interface IBannerMotionProps {
  sceneCount: number;
  className?: string;
  children: ReactNode;
}

const BannerMotion = ({
  sceneCount,
  className,
  children,
}: IBannerMotionProps) => {
  const sectionRef = useBannerTimeline(sceneCount);

  return (
    <section
      ref={sectionRef}
      aria-label="Book a verified technician"
      data-navbar-overlay
      className={className}
    >
      {children}
    </section>
  );
};

export default BannerMotion;
