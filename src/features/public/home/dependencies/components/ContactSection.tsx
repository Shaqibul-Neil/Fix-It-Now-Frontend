import { PageHeader, ScrollReveal, Text } from "@/src/components";
import ContactForm from "@/src/features/public/contact/dependencies/components/ContactForm";
import {
  CONTACT_CHANNELS,
  CONTACT_INTRO,
} from "@/src/features/public/contact/dependencies/constants/contact.content";

const ContactSection = () => {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <ScrollReveal className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <PageHeader
            as="h2"
            textVariant="display"
            eyebrow={CONTACT_INTRO.eyebrow}
            title={CONTACT_INTRO.title}
            description={CONTACT_INTRO.description}
            divClassName="mb-0"
          />

          <dl className="mt-10 border-t border-project-border">
            {CONTACT_CHANNELS.map((channel) => (
              <div
                key={channel.id}
                className="flex items-start gap-4 border-b border-project-border py-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center bg-project-muted-primary text-project-primary">
                  <channel.icon className="size-4.5" />
                </span>

                <div className="min-w-0">
                  <dt>
                    <Text
                      variant="medium-xs"
                      as="span"
                      className="uppercase tracking-[0.2em] text-project-muted-foreground"
                    >
                      {channel.label}
                    </Text>
                  </dt>

                  <dd>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="mt-1.5 block font-semibold text-project-accent transition-colors hover:text-project-primary"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <Text
                        variant="semibold-base"
                        as="span"
                        className="mt-1.5 block text-project-accent"
                      >
                        {channel.value}
                      </Text>
                    )}

                    <Text
                      variant="normal-sm"
                      as="p"
                      className="mt-1 text-project-muted-foreground"
                    >
                      {channel.meta}
                    </Text>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <ContactForm className="self-start" />
      </ScrollReveal>
    </section>
  );
};

export default ContactSection;
