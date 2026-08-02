"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper/types";
import { cn } from "@/src/lib/utils/cn";
import IconButton from "../buttons/IconButton";

interface ISliderNavProps {
  swiper: SwiperInstance | null;
  label?: string;
  bullets?: boolean;
  className?: string;
}

// Prev / next buttons with optional dots, kept in step with the track.
const SliderNav = ({ swiper, label, bullets, className }: ISliderNavProps) => {
  const [state, setState] = useState({
    atStart: true,
    atEnd: false,
    index: 0,
    count: 0,
  });

  useEffect(() => {
    if (!swiper) return;

    const sync = () =>
      setState({
        atStart: swiper.isBeginning,
        atEnd: swiper.isEnd,
        index: swiper.snapIndex,
        count: swiper.snapGrid.length,
      });

    sync();
    swiper.on("slideChange", sync);
    swiper.on("resize", sync);
    swiper.on("update", sync);

    return () => {
      swiper.off("slideChange", sync);
      swiper.off("resize", sync);
      swiper.off("update", sync);
    };
  }, [swiper]);

  const isLooping = Boolean(swiper?.params.loop);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {label && (
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-project-muted-foreground">
          {label}
        </span>
      )}

      <div className="flex items-center gap-3">
        <IconButton
          aria-label="Previous slide"
          className="size-9 rounded-full"
          disabled={!swiper || (!isLooping && state.atStart)}
          onClick={() => swiper?.slidePrev()}
        >
          <ChevronLeft className="size-4" />
        </IconButton>

        {bullets && state.count > 1 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: state.count }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === state.index}
                onClick={() => swiper?.slideTo(index)}
                className={cn(
                  "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                  index === state.index
                    ? "w-6 bg-project-primary"
                    : "w-1.5 bg-project-border hover:bg-project-muted-foreground",
                )}
              />
            ))}
          </div>
        )}

        <IconButton
          aria-label="Next slide"
          variant="noOutline"
          className="size-9 rounded-full"
          disabled={!swiper || (!isLooping && state.atEnd)}
          onClick={() => swiper?.slideNext()}
        >
          <ChevronRight className="size-4" />
        </IconButton>
      </div>
    </div>
  );
};

export default SliderNav;
