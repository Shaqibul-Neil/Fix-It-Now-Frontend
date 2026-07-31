"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, STAGGER } from "@/src/lib/animation/animation.tokens";
import type { IServiceRow } from "@/src/features/dashboard/service/dependencies/types/service.types";
import ServiceCard from "./ServiceCard";

gsap.registerPlugin(useGSAP, Flip, ScrollTrigger);

// The swap-on-hover trade only makes sense with a mouse and enough width for
// the hero + 2x2 grid — below `lg` every card renders in one plain column.
const SWAP_BREAKPOINT = "(min-width: 1024px)";

const ServiceMasonry = ({ services }: { services: IServiceRow[] }) => {
  const [order, setOrder] = useState(() => services.map((service) => service.id));
  const containerRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const byId = new Map(services.map((service) => [service.id, service]));
  const ordered = order
    .map((id) => byId.get(id))
    .filter((service): service is IServiceRow => Boolean(service));

  // Entrance, once — the swap tween below reuses these same cards later.
  useGSAP(
    () => {
      const cards = containerRef.current?.children;
      if (!cards?.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: DURATION.base,
        ease: EASE.out,
        stagger: STAGGER,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      if (!flipState.current) return;

      Flip.from(flipState.current, {
        duration: 0.7,
        ease: "power3.inOut",
        absolute: true,
        scale: true,
      });
      flipState.current = null;
    },
    { dependencies: [order], scope: containerRef },
  );

  const handleHover = (id: string) => {
    if (!window.matchMedia(SWAP_BREAKPOINT).matches) return;

    const index = order.indexOf(id);
    if (index <= 0 || !containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      "[data-flip-id]",
      containerRef.current,
    );
    flipState.current = Flip.getState(cards);

    setOrder((prev) => {
      const next = [...prev];
      [next[0], next[index]] = [next[index], next[0]];
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
    >
      {ordered.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          variant={index === 0 ? "hero" : "compact"}
          className={
            index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : undefined
          }
          onMouseEnter={() => handleHover(service.id)}
        />
      ))}
    </div>
  );
};

export default ServiceMasonry;
