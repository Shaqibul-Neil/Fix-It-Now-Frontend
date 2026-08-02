import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AppButton, PageHeader, ScrollReveal, Text } from "@/src/components";
import {
  JOIN_BENEFITS,
  JOIN_INTRO,
  JOIN_STEPS,
} from "../constants/home.content";

const JOIN_PHOTO =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80&bri=-20";

// The only section addressed to technicians rather than customers.
const JoinSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <ScrollReveal className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden sm:aspect-3/2 lg:aspect-4/5">
            <Image
              src={JOIN_PHOTO}
              alt="Technician selecting a tool at a workbench"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Earnings sit on the photo so the offer lands before the copy does. */}
          <dl className="relative z-10 -mt-14 ml-4 mr-4 grid grid-cols-3 gap-px bg-project-border sm:-mt-16 sm:ml-8 sm:mr-8 lg:mr-0">
            {JOIN_INTRO.earnings.map((item) => (
              <div key={item.id} className="min-w-0 bg-project-aside p-5">
                <dt className="sr-only">{item.label}</dt>

                <dd>
                  <Text
                    variant="semibold-2xl"
                    as="span"
                    className="block tabular-nums text-project-aside-primary"
                  >
                    {item.value}
                  </Text>

                  <Text
                    variant="normal-xs"
                    as="span"
                    className="mt-1.5 block leading-snug text-project-aside-foreground/65"
                  >
                    {item.label}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <PageHeader
            as="h2"
            textVariant="display"
            eyebrow={JOIN_INTRO.eyebrow}
            title={JOIN_INTRO.title}
            description={JOIN_INTRO.description}
            divClassName="mb-0"
          />

          <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {JOIN_BENEFITS.map((benefit) => (
              <li key={benefit.id}>
                <span className="flex size-10 items-center justify-center bg-project-muted-primary text-project-primary">
                  <benefit.icon className="size-4.5" />
                </span>

                <Text
                  variant="semibold-base"
                  as="h3"
                  className="mt-4 text-project-accent"
                >
                  {benefit.title}
                </Text>

                <Text
                  variant="normal-sm"
                  as="p"
                  className="mt-2 leading-relaxed text-project-muted-foreground"
                >
                  {benefit.description}
                </Text>
              </li>
            ))}
          </ul>

          <ol className="mt-10 grid gap-px border-t border-project-border bg-project-border sm:grid-cols-3">
            {JOIN_STEPS.map((step) => (
              <li key={step.id} className="bg-project-background py-5 sm:px-5">
                <Text
                  variant="medium-xs"
                  as="span"
                  className="block tabular-nums tracking-[0.3em] text-project-primary"
                >
                  {step.step}
                </Text>

                <Text
                  variant="semibold-sm-2"
                  as="h3"
                  className="mt-2 text-project-accent"
                >
                  {step.title}
                </Text>

                <Text
                  variant="normal-xs"
                  as="p"
                  className="mt-1.5 leading-relaxed text-project-muted-foreground"
                >
                  {step.description}
                </Text>
              </li>
            ))}
          </ol>

          <AppButton
            text={JOIN_INTRO.cta.label}
            href={JOIN_INTRO.cta.href}
            rightIcon={ArrowRight}
            className="mt-8"
          />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default JoinSection;
