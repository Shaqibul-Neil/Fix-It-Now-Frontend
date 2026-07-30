import Image from "next/image";
import { cn } from "@/src/lib/utils/cn";
import type { IBannerSlide } from "../types/home.types";

const BannerMedia = ({ slides }: { slides: IBannerSlide[] }) => {
  return (
    <div aria-hidden className="absolute inset-0">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          data-banner-media
          style={{ zIndex: index }}
          className={cn("absolute inset-0", index > 0 && "invisible opacity-0")}
        >
          <div data-media-cover className="absolute inset-0 overflow-hidden">
            <div data-media-image className="absolute inset-0">
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerMedia;
