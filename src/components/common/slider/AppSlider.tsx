"use client";

import { Children, isValidElement, useState, type ReactNode } from "react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance, SwiperOptions } from "swiper/types";
import { cn } from "@/src/lib/utils/cn";
import SliderNav from "./SliderNav";

import "swiper/css";

const CONTROLS_ALIGN = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

interface IAppSliderProps {
  children: ReactNode;
  label: string;
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: SwiperOptions["breakpoints"];
  loop?: boolean;
  autoplayDelay?: number;
  bullets?: boolean;
  controlsLabel?: string;
  controlsAlign?: keyof typeof CONTROLS_ALIGN;
  controlsPosition?: "top" | "bottom";
  className?: string;
  slideClassName?: string;
  controlsClassName?: string;
}

// Slides are rendered by the caller, so their markup ships in the server HTML.
const AppSlider = ({
  children,
  label,
  slidesPerView = 1,
  spaceBetween = 24,
  breakpoints,
  loop = false,
  autoplayDelay,
  bullets = true,
  controlsLabel,
  controlsAlign = "center",
  controlsPosition = "bottom",
  className,
  slideClassName,
  controlsClassName,
}: IAppSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const slides = Children.toArray(children).filter(isValidElement);

  if (slides.length === 0) return null;

  const isTop = controlsPosition === "top";

  const controls = slides.length > 1 && (
    <SliderNav
      swiper={swiper}
      label={controlsLabel}
      bullets={bullets}
      className={cn(
        "flex",
        isTop ? "mb-5" : "mt-8",
        CONTROLS_ALIGN[controlsAlign],
        controlsClassName,
      )}
    />
  );

  return (
    <div className={cn("relative", className)}>
      {isTop && controls}

      <Swiper
        modules={[A11y, Keyboard, Autoplay]}
        onSwiper={setSwiper}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        loop={loop}
        keyboard={{ enabled: true }}
        autoplay={
          autoplayDelay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }
            : false
        }
        a11y={{ enabled: true }}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.key ?? index}
            className={cn("h-auto", slideClassName)}
          >
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>

      {!isTop && controls}
    </div>
  );
};

export default AppSlider;
