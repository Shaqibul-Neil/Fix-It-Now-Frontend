import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  AppAvatar,
  AppButton,
  PageHeader,
  ScrollReveal,
  Text,
} from "@/src/components";
import {
  ABOUT_CTA,
  ABOUT_HERO_IMAGE,
  ABOUT_INTRO,
  ABOUT_PRINCIPLES,
  ABOUT_STATS,
  ABOUT_STORY,
  ABOUT_TEAM,
  MILESTONES,
  TEAM_INTRO,
  VETTING_INTRO,
  VETTING_STEPS,
} from "../dependencies/constants/about.content";

const AboutPage = () => {
  return (
    <div className="pb-15 md:pb-20 lg:pb-25">
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 xl:px-8">
        <PageHeader
          textVariant="hero"
          descriptionAside
          eyebrow={ABOUT_INTRO.eyebrow}
          title={ABOUT_INTRO.title}
          description={ABOUT_INTRO.description}
          divClassName="mb-0 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16"
        />

        <div className="relative mt-12 aspect-16/9 overflow-hidden sm:aspect-21/9 lg:mt-16">
          <Image
            src={ABOUT_HERO_IMAGE.src}
            alt={ABOUT_HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
        </div>

        <dl className="grid grid-cols-2 gap-px bg-project-border lg:grid-cols-4">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.id} className="min-w-0 bg-project-aside px-6 py-7">
              <dt className="sr-only">{stat.label}</dt>

              <dd>
                <Text
                  variant="semibold-3xl"
                  as="span"
                  className="block tabular-nums text-project-aside-primary"
                >
                  {stat.value}
                </Text>

                <Text
                  variant="medium-xs"
                  as="span"
                  className="mt-3 block uppercase tracking-[0.18em] text-project-aside-foreground/60"
                >
                  {stat.label}
                </Text>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <section className="border-b border-project-border py-16 lg:py-20">
          <ScrollReveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <PageHeader
                as="h2"
                textVariant="section"
                eyebrow={ABOUT_STORY.eyebrow}
                title={ABOUT_STORY.title}
                divClassName="mb-0"
              />

              <blockquote className="mt-8 border-l-2 border-project-primary pl-5">
                <p className="font-medium leading-snug text-balance text-project-accent text-[clamp(1.1rem,1.8vw,1.4rem)]">
                  {ABOUT_STORY.pullQuote}
                </p>
              </blockquote>
            </div>

            <div className="space-y-6">
              {ABOUT_STORY.paragraphs.map((paragraph) => (
                <Text
                  key={paragraph}
                  variant="normal-base"
                  as="p"
                  className="leading-relaxed text-project-foreground"
                >
                  {paragraph}
                </Text>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section className="border-b border-project-border py-16 lg:py-20">
          <ScrollReveal>
            <PageHeader
              as="h2"
              textVariant="section"
              eyebrow="What we hold to"
              title="Four rules the platform is built around"
              divClassName="mb-10 max-w-2xl"
            />
          </ScrollReveal>

          {/* Numbered rows rather than cards — this reads as a charter. */}
          <ScrollReveal variant="wipe" className="border-t border-project-border">
            {ABOUT_PRINCIPLES.map((principle) => (
              <article
                key={principle.id}
                className="group grid gap-4 border-b border-project-border py-8 md:grid-cols-[5rem_1fr_1.3fr] md:items-baseline md:gap-8"
              >
                <Text
                  variant="medium-xs"
                  as="span"
                  className="tabular-nums tracking-[0.3em] text-project-primary"
                >
                  {principle.index}
                </Text>

                <h3 className="font-semibold leading-tight tracking-tight text-balance text-project-accent text-[clamp(1.2rem,2vw,1.6rem)] transition-colors group-hover:text-project-primary">
                  {principle.title}
                </h3>

                <Text
                  variant="normal-base"
                  as="p"
                  className="leading-relaxed text-project-muted-foreground"
                >
                  {principle.description}
                </Text>
              </article>
            ))}
          </ScrollReveal>
        </section>

        <section className="border-b border-project-border py-16 lg:py-20">
          <ScrollReveal>
            <PageHeader
              as="h2"
              textVariant="section"
              descriptionAside
              eyebrow={VETTING_INTRO.eyebrow}
              title={VETTING_INTRO.title}
              description={VETTING_INTRO.description}
              divClassName="mb-10 lg:grid-cols-[1fr_1fr] lg:gap-12"
            />
          </ScrollReveal>

          <ScrollReveal
            variant="wipe"
            className="grid gap-px bg-project-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {VETTING_STEPS.map((step, index) => (
              <article
                key={step.id}
                className="flex flex-col bg-project-card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center bg-project-muted-primary text-project-primary">
                    <step.icon className="size-5" />
                  </span>

                  <span className="font-semibold leading-none tabular-nums text-[2.5rem] text-project-border">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <Text
                  variant="semibold-base"
                  as="h3"
                  className="mt-5 text-balance text-project-accent"
                >
                  {step.title}
                </Text>

                <Text
                  variant="normal-sm"
                  as="p"
                  className="mt-3 flex-1 leading-relaxed text-project-muted-foreground"
                >
                  {step.description}
                </Text>

                <Text
                  variant="medium-xs"
                  as="span"
                  className="mt-5 block border-t border-project-border pt-4 uppercase tracking-[0.16em] text-project-primary"
                >
                  {step.outcome}
                </Text>
              </article>
            ))}
          </ScrollReveal>
        </section>

        <section className="border-b border-project-border py-16 lg:py-20">
          <ScrollReveal>
            <PageHeader
              as="h2"
              textVariant="section"
              eyebrow="How we got here"
              title="Two years, one problem"
              divClassName="mb-10 max-w-2xl"
            />
          </ScrollReveal>

          {/* Timeline runs along a single rule, markers sitting on it. */}
          <ScrollReveal
            variant="wipe"
            className="grid gap-8 border-t border-project-border pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            {MILESTONES.map((milestone) => (
              <article key={milestone.id} className="relative pl-6">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 size-2.5 bg-project-primary"
                />

                <Text
                  variant="medium-xs"
                  as="span"
                  className="block uppercase tracking-[0.22em] text-project-primary"
                >
                  {milestone.period}
                </Text>

                <Text
                  variant="semibold-lg"
                  as="h3"
                  className="mt-3 text-balance text-project-accent"
                >
                  {milestone.title}
                </Text>

                <Text
                  variant="normal-sm"
                  as="p"
                  className="mt-2 leading-relaxed text-project-muted-foreground"
                >
                  {milestone.description}
                </Text>
              </article>
            ))}
          </ScrollReveal>
        </section>

        <section className="py-16 lg:py-20">
          <ScrollReveal>
            <PageHeader
              as="h2"
              textVariant="section"
              descriptionAside
              eyebrow={TEAM_INTRO.eyebrow}
              title={TEAM_INTRO.title}
              description={TEAM_INTRO.description}
              divClassName="mb-10 lg:grid-cols-[1fr_1fr] lg:gap-12"
            />
          </ScrollReveal>

          <ScrollReveal
            variant="wipe"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {ABOUT_TEAM.map((member) => (
              <article
                key={member.id}
                className="flex flex-col border border-project-border bg-project-card p-6 transition-colors hover:border-project-primary"
              >
                <AppAvatar name={member.name} className="size-14 text-base" />

                <Text
                  variant="semibold-base"
                  as="h3"
                  className="mt-5 text-project-accent"
                >
                  {member.name}
                </Text>

                <Text
                  variant="medium-xs"
                  as="span"
                  className="mt-1.5 block uppercase tracking-[0.18em] text-project-primary"
                >
                  {member.role}
                </Text>

                <Text
                  variant="normal-sm"
                  as="p"
                  className="mt-4 leading-relaxed text-project-muted-foreground"
                >
                  {member.focus}
                </Text>
              </article>
            ))}
          </ScrollReveal>
        </section>

        <ScrollReveal className="flex flex-col items-start justify-between gap-6 bg-project-aside p-8 text-project-aside-foreground sm:flex-row sm:items-center lg:p-10">
          <div className="max-w-lg space-y-2">
            <h2 className="font-semibold leading-tight tracking-tight text-[clamp(1.3rem,2.2vw,1.8rem)]">
              {ABOUT_CTA.title}
            </h2>

            <Text variant="normal-sm" as="p" className="text-current/70">
              {ABOUT_CTA.description}
            </Text>
          </div>

          <div className="flex flex-wrap gap-3">
            <AppButton
              text={ABOUT_CTA.primary.label}
              href={ABOUT_CTA.primary.href}
              rightIcon={ArrowRight}
            />

            <AppButton
              text={ABOUT_CTA.secondary.label}
              href={ABOUT_CTA.secondary.href}
              className="border-current/40 bg-transparent text-current hover:bg-project-aside-foreground hover:text-project-aside"
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutPage;
