import { PageHeader, ScrollReveal, Text } from "@/src/components";
import { COVERAGE_CITIES, COVERAGE_INTRO } from "../constants/home.content";

const CoverageSection = () => {
  const [flagship, ...rest] = COVERAGE_CITIES;

  const total = COVERAGE_CITIES.reduce(
    (sum, city) => sum + city.technicianCount,
    0,
  );

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <ScrollReveal>
        <PageHeader
          as="h2"
          textVariant="display"
          descriptionAside
          eyebrow={COVERAGE_INTRO.eyebrow}
          title={COVERAGE_INTRO.title}
          description={COVERAGE_INTRO.description}
          divClassName="mb-10 gap-4 sm:mb-14 lg:grid-cols-[1fr_1.1fr] lg:gap-10"
        />
      </ScrollReveal>

      <ScrollReveal
        variant="wipe"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* The city with most of the supply gets the wide tile. */}
        <article className="flex flex-col justify-between bg-project-aside p-8 text-project-aside-foreground sm:col-span-2 lg:p-10">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-semibold leading-none tracking-tight text-[clamp(1.8rem,3.4vw,2.6rem)]">
                {flagship.city}
              </h3>

              <Text
                variant="medium-xs"
                as="span"
                className="uppercase tracking-[0.2em] text-project-aside-primary"
              >
                {`${flagship.technicianCount} technicians`}
              </Text>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2">
              {flagship.areas.map((area) => (
                <li
                  key={area}
                  className="border border-current/20 px-3 py-1.5 transition-colors hover:border-project-aside-primary"
                >
                  <Text variant="normal-sm" as="span">
                    {area}
                  </Text>
                </li>
              ))}
            </ul>
          </div>

          <Text
            variant="normal-sm"
            as="p"
            className="mt-8 max-w-md leading-relaxed text-current/65"
          >
            {`${total} technicians publish working hours across every area listed here. Nothing outside them can be booked.`}
          </Text>
        </article>

        {rest.map((city) => (
          <article
            key={city.id}
            className="flex flex-col border border-project-border bg-project-card p-6 transition-colors hover:border-project-primary"
          >
            <div className="flex items-start justify-between gap-4">
              <Text
                variant="semibold-xl"
                as="h3"
                className="tracking-tight text-project-accent"
              >
                {city.city}
              </Text>

              <Text
                variant="medium-xs"
                as="span"
                className={
                  city.isLive
                    ? "shrink-0 border border-project-success/40 px-2.5 py-1 uppercase tracking-[0.16em] text-project-success"
                    : "shrink-0 border border-project-border px-2.5 py-1 uppercase tracking-[0.16em] text-project-muted-foreground"
                }
              >
                {city.isLive ? "Live" : "Opening"}
              </Text>
            </div>

            <Text
              variant="medium-sm"
              as="p"
              className="mt-3 tabular-nums text-project-primary"
            >
              {`${city.technicianCount} technicians`}
            </Text>

            <Text
              variant="normal-sm"
              as="p"
              className="mt-4 leading-relaxed text-project-muted-foreground"
            >
              {city.areas.join(" · ")}
            </Text>
          </article>
        ))}
      </ScrollReveal>
    </section>
  );
};

export default CoverageSection;
