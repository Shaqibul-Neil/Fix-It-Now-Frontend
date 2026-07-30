"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const OVERLAY_ANCHOR_SELECTOR = "[data-navbar-overlay]";

export const useOverlayChrome = (offset = 72) => {
  const pathname = usePathname();
  const [isOverlay, setIsOverlay] = useState<boolean | null>(null);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const anchor = document.querySelector(OVERLAY_ANCHOR_SELECTOR);

      setIsOverlay(!!anchor && anchor.getBoundingClientRect().bottom > offset);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [offset, pathname]);

  return isOverlay;
};
