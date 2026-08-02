import { CountUp, ScrollReveal, Text } from "@/src/components";
import { HOME_COUNTERS } from "../constants/home.content";

const COUNTER_STORAGE_KEY = "fixitnow_home_counters";

const CounterSection = () => {
  return (
    <section className="border-y border-project-border bg-project-card">
      <ScrollReveal className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {HOME_COUNTERS.map((counter) => (
          <div
            key={counter.id}
            className="min-w-0 border-project-border px-6 py-10 not-last:border-r nth-[-n+2]:border-b nth-[2n]:border-r-0 lg:nth-[-n+2]:border-b-0 lg:nth-[2n]:border-r xl:px-8"
          >
            <Text
              variant="semibold-3xl"
              as="p"
              className="tabular-nums text-project-primary"
            >
              <CountUp
                value={counter.value}
                decimals={counter.decimals}
                suffix={counter.suffix}
                storageKey={COUNTER_STORAGE_KEY}
              />
            </Text>

            <Text
              variant="medium-xs"
              as="h3"
              className="mt-4 uppercase tracking-[0.18em] text-project-accent"
            >
              {counter.label}
            </Text>

            <Text
              variant="normal-sm"
              as="p"
              className="mt-2 text-project-muted-foreground"
            >
              {counter.description}
            </Text>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
};

export default CounterSection;
