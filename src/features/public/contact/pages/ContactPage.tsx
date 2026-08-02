import { ArrowUpRight, Siren } from "lucide-react";
import { PageHeader, ScrollReveal, Text } from "@/src/components";
import ContactForm from "../dependencies/components/ContactForm";
import {
  CONTACT_CHANNELS,
  CONTACT_DESKS,
  CONTACT_PAGE_INTRO,
} from "../dependencies/constants/contact.content";

const ContactPage = () => {
  return (
    <div className="pb-15 md:pb-20 lg:pb-25">
      <section className="bg-project-aside text-project-aside-foreground">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-0 sm:px-6 sm:pt-20 xl:px-8">
          <PageHeader
            textVariant="hero"
            eyebrow={CONTACT_PAGE_INTRO.eyebrow}
            title={CONTACT_PAGE_INTRO.title}
            description={CONTACT_PAGE_INTRO.description}
            divClassName="mb-0 max-w-3xl"
            eyebrowClassName="text-project-aside-primary"
            textClassName="text-current"
            descriptionClassName="max-w-xl text-current/70"
          />

          {/* Sits half in the dark band and half out of it. */}
          <dl className="mt-14 grid gap-px bg-current/15 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {CONTACT_CHANNELS.map((channel) => (
              <div
                key={channel.id}
                className="flex flex-col gap-3 bg-project-aside p-6"
              >
                <span className="flex size-10 items-center justify-center border border-current/20 text-project-aside-primary">
                  <channel.icon className="size-4.5" />
                </span>

                <dt>
                  <Text
                    variant="medium-xs"
                    as="span"
                    className="uppercase tracking-[0.2em] text-current/50"
                  >
                    {channel.label}
                  </Text>
                </dt>

                <dd>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="block font-semibold leading-snug text-current transition-colors hover:text-project-aside-primary"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <Text
                      variant="semibold-base"
                      as="span"
                      className="block leading-snug text-current"
                    >
                      {channel.value}
                    </Text>
                  )}

                  <Text
                    variant="normal-xs"
                    as="p"
                    className="mt-2 leading-relaxed text-current/55"
                  >
                    {channel.meta}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <section className="border-b border-project-border py-16">
          <ScrollReveal>
            <PageHeader
              as="h2"
              textVariant="section"
              eyebrow="Straight to the right desk"
              title="Three inboxes, each with a person behind it"
              divClassName="mb-8"
            />
          </ScrollReveal>

          <ScrollReveal
            variant="wipe"
            className="grid gap-4 md:grid-cols-3"
          >
            {CONTACT_DESKS.map((desk) => (
              <article
                key={desk.id}
                className="group flex flex-col border border-project-border bg-project-card p-6 transition-colors hover:border-project-primary"
              >
                <span className="flex size-11 items-center justify-center bg-project-muted-primary text-project-primary">
                  <desk.icon className="size-5" />
                </span>

                <Text
                  variant="semibold-lg"
                  as="h3"
                  className="mt-5 text-balance text-project-accent"
                >
                  {desk.title}
                </Text>

                <Text
                  variant="normal-sm"
                  as="p"
                  className="mt-3 flex-1 leading-relaxed text-project-muted-foreground"
                >
                  {desk.description}
                </Text>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-project-border pt-4">
                  <a
                    href={`mailto:${desk.email}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-project-primary transition-colors hover:text-project-accent"
                  >
                    {desk.email}
                    <ArrowUpRight className="size-3.5" />
                  </a>

                  <Text
                    variant="medium-xs"
                    as="span"
                    className="shrink-0 whitespace-nowrap uppercase tracking-[0.16em] text-project-muted-foreground"
                  >
                    {`~${desk.responseHours}h`}
                  </Text>
                </div>
              </article>
            ))}
          </ScrollReveal>
        </section>

        <section className="py-16">
          <ScrollReveal className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <PageHeader
                as="h2"
                textVariant="section"
                eyebrow="Write to us"
                title="Tell us what happened"
                description="The more detail you give, the fewer rounds it takes. A booking reference gets you an answer fastest."
                divClassName="mb-8"
              />

              <ContactForm />
            </div>

            <div className="space-y-4 self-start">
              <div className="border border-project-border bg-project-card p-6">
                <Text
                  variant="medium-xs"
                  as="span"
                  className="block uppercase tracking-[0.22em] text-project-primary"
                >
                  Include if you can
                </Text>

                <ul className="mt-5 space-y-3">
                  {[
                    "Your booking reference",
                    "The technician's name",
                    "What you expected and what happened",
                    "Photos of the work, if there are any",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-project-border pb-3 last:border-b-0 last:pb-0"
                    >
                      <span
                        aria-hidden
                        className="size-1.5 shrink-0 bg-project-primary"
                      />

                      <Text
                        variant="normal-sm"
                        as="span"
                        className="text-project-foreground"
                      >
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start gap-4 bg-project-aside p-6 text-project-aside-foreground">
                <span className="flex size-10 shrink-0 items-center justify-center border border-current/20 text-project-aside-primary">
                  <Siren className="size-5" />
                </span>

                <div>
                  <Text
                    variant="semibold-base"
                    as="h2"
                    className="text-current"
                  >
                    Water or live wires right now?
                  </Text>

                  <Text
                    variant="normal-sm"
                    as="p"
                    className="mt-2 leading-relaxed text-current/70"
                  >
                    Do not wait on email. Call the support line, or book an
                    emergency technician and someone accepts within the hour.
                  </Text>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
