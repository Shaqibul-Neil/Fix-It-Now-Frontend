import { Plus } from "lucide-react";
import { AppButton, PageHeader, ScrollReveal, Text } from "@/src/components";
import { FAQ_INTRO, HOME_FAQ } from "../constants/home.content";

// Native details/summary — the answers stay in the HTML for crawlers and the
// accordion costs no JavaScript.
const FaqSection = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
          <PageHeader
            as="h2"
            textVariant="display"
            eyebrow={FAQ_INTRO.eyebrow}
            title={FAQ_INTRO.title}
            description={FAQ_INTRO.description}
            divClassName="mb-0"
          />

          <AppButton
            text="Ask us directly"
            href="#contact"
            variant="outline"
            className="mt-8"
          />
        </ScrollReveal>

        <ScrollReveal className="border-t border-project-border">
          {HOME_FAQ.map((item) => (
            <details
              key={item.id}
              name="home-faq"
              className="group border-b border-project-border"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <Text
                  variant="semibold-lg"
                  as="h3"
                  className="text-balance text-project-accent transition-colors group-hover:text-project-primary group-open:text-project-primary"
                >
                  {item.question}
                </Text>

                <span
                  aria-hidden
                  className="mt-0.5 grid size-8 shrink-0 place-items-center border border-project-border text-project-muted-foreground transition-all duration-300 group-hover:border-project-primary group-open:rotate-45 group-open:border-project-primary group-open:bg-project-primary group-open:text-project-primary-foreground"
                >
                  <Plus className="size-4" />
                </span>
              </summary>

              <Text
                variant="normal-base"
                as="p"
                className="max-w-2xl pb-6 leading-relaxed text-project-muted-foreground"
              >
                {item.answer}
              </Text>
            </details>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FaqSection;
