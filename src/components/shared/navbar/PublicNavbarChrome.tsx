"use client";

import type { ReactNode } from "react";
import { useOverlayChrome } from "@/src/hooks/useOverlayChrome";
import { cn } from "@/src/lib/utils/cn";

// The bar itself, so the nav stays one instance in the layout instead of being
// duplicated inside every hero. A hero can never host it: ScrollTrigger puts a
// transform on the pinned element, and a transformed ancestor makes sticky and
// fixed children stick to that element instead of the viewport.
const PublicNavbarChrome = ({ children }: { children: ReactNode }) => {
  const isOverlay = useOverlayChrome();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-500",
        // "dark" re-declares the project-* variables for this subtree only, so
        // the logo, links and toggle stay legible over a hero photo without a
        // single extra colour prop.
        isOverlay && "dark",
        isOverlay === false && "bg-project-background/85 backdrop-blur",
      )}
    >
      {children}
    </header>
  );
};

export default PublicNavbarChrome;
