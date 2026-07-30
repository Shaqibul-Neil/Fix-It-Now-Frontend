import { ArrowRight } from "lucide-react";
import { AppButton, Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";
import type { IBannerSlide } from "../types/home.types";

const BannerCopy = ({ slides }: { slides: IBannerSlide[] }) => {
  const total = String(slides.length).padStart(2, "0");

  return (
    <div className="grid">
      {slides.map(({ icon: SlideIcon, ...slide }, index) => (
        <article
          key={slide.id}
          data-banner-copy
          className={cn(
            "col-start-1 row-start-1 max-w-xl space-y-5",
            index > 0 && "invisible opacity-0",
          )}
        >
          <div data-copy-line className="flex items-center gap-4">
            <Text
              variant="medium-xs"
              as="span"
              className="tabular-nums tracking-[0.28em] text-project-aside-primary"
            >
              {slide.index} / {total}
            </Text>

            <span aria-hidden className="h-px w-10 bg-current/30" />

            <span className="flex items-center gap-2">
              <SlideIcon className="size-4 shrink-0 text-project-aside-primary" />
              <Text
                variant="medium-xs"
                as="span"
                className="uppercase tracking-[0.22em] opacity-70"
              >
                {slide.category}
              </Text>
            </span>
          </div>

          <h2
            data-copy-mask
            className="overflow-hidden pb-1 font-semibold leading-[1.08] tracking-tight text-[clamp(1.45rem,2.2vw,2.15rem)]"
          >
            <span className="block">{slide.headline}</span>
          </h2>

          <div data-copy-line>
            <Text variant="normal-base" as="p" className="max-w-md opacity-85">
              {slide.description}
            </Text>
          </div>

          <div data-copy-line className="pt-1">
            <AppButton
              text={slide.cta.label}
              href={slide.cta.href}
              rightIcon={ArrowRight}
            />
          </div>
        </article>
      ))}
    </div>
  );
};

export default BannerCopy;
