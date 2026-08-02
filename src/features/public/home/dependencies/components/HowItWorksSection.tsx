import { ArrowRight } from "lucide-react";
import { AppButton, PageHeader, Text } from "@/src/components";
import { HOW_IT_WORKS, PROCESS_INTRO } from "../constants/home.content";
import ProcessMotion from "./ProcessMotion";

const GUTTER = "mx-auto w-full max-w-7xl px-4 sm:px-6 xl:px-8";

const CARD =
  "relative flex shrink-0 flex-col justify-between border p-6 lg:h-88 lg:w-84 lg:p-8 xl:w-92";

const HowItWorksSection = () => {
  return (
    <ProcessMotion
      // The closing card rides the rail with the steps.
      cardCount={HOW_IT_WORKS.length + 1}
      className="relative isolate overflow-hidden bg-project-aside py-20 text-project-aside-foreground sm:py-24 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-1 opacity-[0.06] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[72px_72px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 -z-1 size-120 rounded-full bg-project-aside-primary/15 blur-[160px]"
      />

      <div className={GUTTER}>
        <PageHeader
          as="h2"
          textVariant="display"
          eyebrow={PROCESS_INTRO.eyebrow}
          title={PROCESS_INTRO.title}
          description={PROCESS_INTRO.description}
          divClassName="mb-0 max-w-2xl"
          eyebrowClassName="text-project-aside-primary"
          textClassName="text-current"
          descriptionClassName="text-current/70"
        />
      </div>

      <div className="mx-auto mt-10 w-full max-w-7xl lg:mt-14">
        <div
          data-rail-track
          className="relative flex w-full flex-col gap-4 px-4 sm:px-6 lg:w-max lg:flex-row lg:gap-6 xl:px-8"
        >
          {/* Threads the cards together in the gaps between them. */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-17 hidden h-px bg-current/12 lg:block"
          />

          {HOW_IT_WORKS.map((step) => (
            <article
              key={step.id}
              data-rail-card
              className={`${CARD} group border-current/12 bg-current/4 transition-colors hover:border-project-aside-primary/60`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center border border-current/15 text-project-aside-primary transition-colors group-hover:border-project-aside-primary/60">
                  <step.icon className="size-5" />
                </span>

                <span className="font-semibold leading-none tabular-nums text-[3.25rem] text-project-aside-primary/25 transition-colors group-hover:text-project-aside-primary/45">
                  {step.step}
                </span>
              </div>

              <div className="mt-8 space-y-3 lg:mt-0">
                <Text
                  variant="semibold-xl"
                  as="h3"
                  className="tracking-tight text-balance"
                >
                  {step.title}
                </Text>

                <Text
                  variant="normal-sm"
                  as="p"
                  className="leading-relaxed text-current/65"
                >
                  {step.description}
                </Text>
              </div>

              <Text
                variant="medium-xs"
                as="span"
                className="mt-6 block uppercase tracking-[0.2em] text-project-aside-primary"
              >
                {step.meta}
              </Text>
            </article>
          ))}

          <article
            data-rail-card
            className={`${CARD} border-project-aside-primary/50 bg-project-aside-primary/10`}
          >
            <div className="space-y-3">
              <Text
                variant="semibold-xl"
                as="h3"
                className="tracking-tight text-balance"
              >
                {PROCESS_INTRO.cta.title}
              </Text>

              <Text
                variant="normal-sm"
                as="p"
                className="leading-relaxed text-current/70"
              >
                {PROCESS_INTRO.cta.description}
              </Text>
            </div>

            <AppButton
              text={PROCESS_INTRO.cta.label}
              href={PROCESS_INTRO.cta.href}
              rightIcon={ArrowRight}
              className="mt-8 self-start"
            />
          </article>
        </div>
      </div>

      <div className={`${GUTTER} mt-10 hidden lg:block`}>
        <div className="h-0.5 bg-current/15">
          <span
            data-rail-progress
            style={{ transform: "scaleX(0)" }}
            className="block h-full origin-left bg-project-aside-primary"
          />
        </div>
      </div>
    </ProcessMotion>
  );
};

export default HowItWorksSection;
