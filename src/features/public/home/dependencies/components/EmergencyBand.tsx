import { Siren } from "lucide-react";
import { AppButton, ScrollReveal, Text } from "@/src/components";
import { EMERGENCY_BAND } from "../constants/home.content";

const EmergencyBand = () => {
  return (
    <section className="relative isolate overflow-hidden bg-project-primary text-project-primary-foreground">
      {/* Hazard stripes, the one place on the site loud enough to earn them. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[repeating-linear-gradient(45deg,currentColor_0_10px,transparent_10px_20px)] opacity-30"
      />

      <ScrollReveal className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between xl:px-8">
        <div className="flex items-start gap-5">
          <span className="flex size-12 shrink-0 items-center justify-center border border-current/30">
            <Siren className="size-6" />
          </span>

          <div className="max-w-xl space-y-2">
            <Text
              variant="medium-xs"
              as="span"
              className="block uppercase tracking-[0.28em] text-current/70"
            >
              {EMERGENCY_BAND.eyebrow}
            </Text>

            <h2 className="font-semibold leading-tight tracking-tight text-balance text-[clamp(1.4rem,2.6vw,2.1rem)]">
              {EMERGENCY_BAND.title}
            </h2>

            <Text
              variant="normal-sm"
              as="p"
              className="leading-relaxed text-current/80"
            >
              {EMERGENCY_BAND.description}
            </Text>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:items-end">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {EMERGENCY_BAND.stats.map((stat) => (
              <div key={stat.id}>
                <dt className="sr-only">{stat.label}</dt>

                <dd>
                  <Text
                    variant="semibold-2xl"
                    as="span"
                    className="block tabular-nums"
                  >
                    {stat.value}
                  </Text>

                  <Text
                    variant="medium-xs"
                    as="span"
                    className="mt-1 block uppercase tracking-[0.16em] text-current/65"
                  >
                    {stat.label}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>

          <AppButton
            text={EMERGENCY_BAND.cta.label}
            href={EMERGENCY_BAND.cta.href}
            leftIcon={Siren}
            className="self-start border-current bg-transparent text-current hover:bg-project-primary-foreground hover:text-project-primary lg:self-end"
          />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default EmergencyBand;
