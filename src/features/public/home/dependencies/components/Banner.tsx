import { ArrowDown, ArrowRight } from "lucide-react";
import { AppButton, Reveal, Text } from "@/src/components";
import {
  BANNER_INTRO,
  BANNER_PROOF,
  BANNER_SLIDES,
} from "../constants/home.content";
import BannerCopy from "./BannerCopy";
import BannerMedia from "./BannerMedia";
import BannerMotion from "./BannerMotion";
import BannerRail from "./BannerRail";

const Banner = () => {
  return (
    <div className="-mt-18">
      <BannerMotion
        slideCount={BANNER_SLIDES.length}
        direction="up"
        className="relative isolate h-svh w-full overflow-hidden bg-project-aside text-project-aside-foreground"
      >
        <BannerMedia slides={BANNER_SLIDES} />

        <div
          aria-hidden
          className="absolute inset-0 z-1 bg-linear-to-b from-black/80 via-black/45 to-black/85"
        />
        {/* Second scrim, left to right: the copy column keeps a dark bed no
            matter which photo is on screen, and the photo stays open on the
            right where nothing is written. */}
        <div
          aria-hidden
          className="absolute inset-0 z-1 bg-linear-to-r from-black/70 via-black/20 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-1 opacity-[0.07] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[72px_72px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/3 z-1 size-128 rounded-full bg-project-aside-primary/20 blur-[150px]"
        />

        <div
          data-banner-drift
          className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between gap-10 px-4 pb-12 pt-26 sm:px-6 sm:pt-30 xl:px-8"
        >
          <Reveal className="max-w-2xl space-y-5">
            <Text
              variant="medium-xs"
              as="span"
              className="block uppercase tracking-[0.28em] text-project-aside-primary"
            >
              {BANNER_INTRO.eyebrow}
            </Text>

            <h1 className="font-semibold leading-[0.95] tracking-tight text-[clamp(2.4rem,5vw,4.25rem)]">
              <span className="block">{BANNER_INTRO.headline}</span>
              <span className="block text-project-aside-primary">
                {BANNER_INTRO.highlight}
              </span>
            </h1>

            <Text variant="normal-base" as="p" className="max-w-lg text-white">
              {BANNER_INTRO.description}
            </Text>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <AppButton
                text={BANNER_INTRO.primaryCta.label}
                href={BANNER_INTRO.primaryCta.href}
                rightIcon={ArrowRight}
              />
              <AppButton
                text={BANNER_INTRO.secondaryCta.label}
                href={BANNER_INTRO.secondaryCta.href}
                variant="ghost"
                rightIcon={ArrowRight}
                className="h-9 px-4 text-current opacity-85 hover:text-project-aside-primary hover:opacity-100"
              />
            </div>
          </Reveal>

          <div className="grid gap-10 pt-8 lg:grid-cols-[1.2fr_auto] lg:items-end">
            <BannerCopy slides={BANNER_SLIDES} />
            <BannerRail slides={BANNER_SLIDES} proof={BANNER_PROOF} />
          </div>
        </div>

        <div
          data-banner-cue
          aria-hidden
          className="absolute inset-x-0 bottom-5 z-20 hidden justify-center lg:flex"
        >
          <span className="flex items-center gap-2 opacity-60">
            <ArrowDown className="size-3.5 animate-bounce" />
            <Text
              variant="medium-xs"
              as="span"
              className="uppercase tracking-[0.28em]"
            >
              Scroll
            </Text>
          </span>
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-20 h-0.5 bg-current/15"
        >
          <span
            data-banner-progress
            style={{ transform: "scaleX(0)" }}
            className="block h-full origin-left bg-project-aside-primary"
          />
        </div>
      </BannerMotion>
    </div>
  );
};

export default Banner;
