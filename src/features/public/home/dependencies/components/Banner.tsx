import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { AppButton, Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";
import { BANNER_INTRO, BANNER_SCENES } from "../constants/home.content";
import BannerMotion from "./BannerMotion";

const Banner = () => {
  return (
    <div className="-mt-18">
      <BannerMotion
        sceneCount={BANNER_SCENES.length}
        className="relative isolate h-svh w-full overflow-hidden bg-project-aside text-project-aside-foreground"
      >
        <div aria-hidden className="absolute inset-0">
          {BANNER_SCENES.map((scene, index) => (
            <div
              key={scene.id}
              data-banner-media
              className={cn(
                "absolute inset-0",
                index > 0 && "invisible opacity-0",
              )}
            >
              <Image
                src={scene.image.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                quality={90}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div
          aria-hidden
          className="absolute inset-0 z-1 bg-linear-to-b from-black/80 via-black/45 to-black/85"
        />
        {/* Keeps the copy column dark while the photo stays open on the right. */}
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

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 pt-26 pb-20 sm:px-6 sm:pt-30 xl:px-8">
          <div className="max-w-2xl space-y-5">
            <Text
              variant="medium-xs"
              as="span"
              className="block uppercase tracking-[0.28em] text-project-aside-primary"
            >
              {BANNER_INTRO.eyebrow}
            </Text>

            <div className="grid">
              {BANNER_SCENES.map((scene, index) => (
                <div
                  key={scene.id}
                  data-banner-scene
                  className={cn(
                    "col-start-1 row-start-1 space-y-5",
                    index > 0 && "invisible opacity-0",
                  )}
                >
                  <h1 className="font-semibold leading-[0.95] tracking-tight text-[clamp(2.4rem,5vw,4.25rem)]">
                    <span className="block">{scene.headline}</span>
                    <span className="block text-project-aside-primary">
                      {scene.highlight}
                    </span>
                  </h1>

                  <Text
                    variant="normal-base"
                    as="p"
                    className="max-w-lg text-white"
                  >
                    {scene.description}
                  </Text>
                </div>
              ))}
            </div>

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
