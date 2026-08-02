import { ArrowRight } from "lucide-react";
import { AppButton, PageHeader, ScrollReveal, Text } from "@/src/components";
import { CATEGORY_LIST } from "../dependencies/constants/category.dummy";
import CategoryCard from "../dependencies/components/CategoryCard";

// Cycles so the masonry never lines two neighbouring tiles up at the same edge.
const RATIOS = ["tall", "wide", "square", "wide", "square", "tall"] as const;

const CategoriesPage = () => {
  const technicians = CATEGORY_LIST.reduce(
    (sum, category) => sum + category.technicianCount,
    0,
  );

  const services = CATEGORY_LIST.reduce(
    (sum, category) => sum + category.serviceCount,
    0,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 xl:px-8">
      <ScrollReveal>
        <PageHeader
          textVariant="hero"
          descriptionAside
          eyebrow="Every trade we cover"
          title={
            <>
              Pick the trade.
              <span className="block text-project-primary">
                We&rsquo;ll bring the person.
              </span>
            </>
          }
          description="Each category below is staffed only by technicians who cleared an ID check and an admin review. Open one to see who is available, what they charge and the jobs they take most."
          divClassName="mb-0 gap-8 border-b border-project-border pb-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
        >
          <dl className="grid grid-cols-3 border-t border-project-border pt-5">
            {[
              { id: "categories", value: CATEGORY_LIST.length, label: "Trades" },
              { id: "technicians", value: technicians, label: "Technicians" },
              { id: "services", value: services, label: "Services" },
            ].map((stat) => (
              <div key={stat.id} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>

                <dd>
                  <Text
                    variant="semibold-2xl"
                    as="span"
                    className="block tabular-nums text-project-accent"
                  >
                    {stat.value}
                  </Text>

                  <Text
                    variant="medium-xs"
                    as="span"
                    className="mt-1 block uppercase tracking-[0.18em] text-project-muted-foreground"
                  >
                    {stat.label}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>
        </PageHeader>
      </ScrollReveal>

      <ScrollReveal
        variant="wipe"
        className="mt-10 gap-4 sm:columns-2 lg:columns-3 [&>a]:mb-4"
      >
        {CATEGORY_LIST.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            ratio={RATIOS[index % RATIOS.length]}
          />
        ))}
      </ScrollReveal>

      <ScrollReveal className="mt-16 flex flex-col items-start justify-between gap-6 bg-project-aside p-8 text-project-aside-foreground sm:flex-row sm:items-center lg:p-10">
        <div className="max-w-lg space-y-2">
          <h2 className="font-semibold leading-tight tracking-tight text-[clamp(1.3rem,2.2vw,1.8rem)]">
            Not sure which trade you need?
          </h2>

          <Text variant="normal-sm" as="p" className="text-current/70">
            Browse every verified technician instead and filter by skill, budget
            and working hours.
          </Text>
        </div>

        <AppButton
          text="Browse technicians"
          href="/technicians"
          rightIcon={ArrowRight}
        />
      </ScrollReveal>
    </div>
  );
};

export default CategoriesPage;
