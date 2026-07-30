import { Text } from "@/src/components";
import type { IBannerProofItem, IBannerSlide } from "../types/home.types";

interface IBannerRailProps {
  slides: IBannerSlide[];
  proof: IBannerProofItem[];
}

const BannerRail = ({ slides, proof }: IBannerRailProps) => {
  return (
    <div className="flex flex-col gap-7 lg:items-end">
      <ol className="flex items-center gap-2">
        {slides.map((slide) => (
          <li
            key={slide.id}
            className="relative h-0.5 w-9 bg-current/25 sm:w-12"
          >
            <span
              data-banner-tick
              style={{ transform: "scaleX(0)" }}
              className="block h-full origin-left bg-project-aside-primary"
            />
            <span className="sr-only">{slide.category}</span>
          </li>
        ))}
      </ol>

      <dl className="hidden gap-8 sm:grid sm:grid-cols-3 lg:text-right">
        {proof.map(({ value, label }) => (
          <div key={label} className="space-y-1">
            <dt className="sr-only">{label}</dt>
            <dd>
              <Text
                variant="semibold-xl"
                as="span"
                className="block text-project-aside-primary"
              >
                {value}
              </Text>
              <Text
                variant="normal-xs"
                as="span"
                className="block uppercase tracking-[0.18em] opacity-55"
              >
                {label}
              </Text>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default BannerRail;
