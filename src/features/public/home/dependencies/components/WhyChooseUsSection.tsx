import { PageHeader, ScrollReveal, Text } from "@/src/components";
import { VALUE_INTRO, WHY_CHOOSE_US } from "../constants/home.content";

const WhyChooseUsSection = () => {
  const [feature, ...rest] = WHY_CHOOSE_US;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <ScrollReveal>
        <PageHeader
          as="h2"
          textVariant="display"
          descriptionAside
          eyebrow={VALUE_INTRO.eyebrow}
          title={VALUE_INTRO.title}
          description={VALUE_INTRO.description}
          divClassName="mb-10 gap-4 sm:mb-14 lg:grid-cols-[1fr_1.1fr] lg:gap-10"
          descriptionClassName="lg:pb-2"
        />
      </ScrollReveal>

      <ScrollReveal
        variant="wipe"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <article className="flex flex-col justify-between bg-project-aside p-8 text-project-aside-foreground sm:col-span-2 lg:row-span-2 lg:p-10">
          <div className="space-y-5">
            <span className="flex size-12 items-center justify-center border border-current/20 text-project-aside-primary">
              <feature.icon className="size-6" />
            </span>

            <h3 className="font-semibold leading-tight tracking-tight text-balance text-[clamp(1.35rem,2.2vw,1.9rem)]">
              {feature.title}
            </h3>

            <Text
              variant="normal-sm"
              as="p"
              className="max-w-md leading-relaxed text-current/70"
            >
              {feature.description}
            </Text>
          </div>

          {feature.stats && (
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-current/15 pt-6">
              {feature.stats.map((stat) => (
                <div key={stat.id}>
                  <dt className="sr-only">{stat.label}</dt>

                  <dd>
                    <Text
                      variant="semibold-2xl"
                      as="span"
                      className="block text-project-aside-primary"
                    >
                      {stat.value}
                    </Text>

                    <Text
                      variant="normal-xs"
                      as="span"
                      className="mt-1 block text-current/60"
                    >
                      {stat.label}
                    </Text>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </article>

        {rest.map((value) => (
          <article
            key={value.id}
            className="group flex flex-col border border-project-border bg-project-card p-6 transition-colors hover:border-project-primary"
          >
            <span className="flex size-11 items-center justify-center bg-project-muted-primary text-project-primary">
              <value.icon className="size-5" />
            </span>

            <Text
              variant="semibold-base"
              as="h3"
              className="mt-5 leading-snug text-project-accent"
            >
              {value.title}
            </Text>

            {/* Draws in under the heading on hover. */}
            <span
              aria-hidden
              className="mt-3 block h-px w-8 bg-project-primary transition-all duration-500 group-hover:w-full"
            />

            <Text
              variant="normal-sm"
              as="p"
              className="mt-3 leading-relaxed text-project-muted-foreground"
            >
              {value.description}
            </Text>
          </article>
        ))}
      </ScrollReveal>
    </section>
  );
};

export default WhyChooseUsSection;
