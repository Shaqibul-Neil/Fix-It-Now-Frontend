"use client";

import Image from "next/image";
import { useState } from "react";
import { BadgeCheck, Star } from "lucide-react";
import { PageHeader, Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";
import { formatMoney } from "@/src/lib/utils/format.utils";
import { TESTIMONIAL_INTRO, TESTIMONIALS } from "../constants/home.content";
import { useTestimonialSwap } from "../animation/useTestimonialSwap";

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useTestimonialSwap(activeIndex);

  const review = TESTIMONIALS[activeIndex];

  // Reads like the receipt of the job the quote came from.
  const docket = [
    { id: "category", label: "Category", value: review.categoryName },
    { id: "service", label: "Service booked", value: review.serviceTitle },
    { id: "technician", label: "Technician", value: review.technicianName },
    { id: "completed", label: "Completed", value: review.completedOn },
    { id: "paid", label: "Paid", value: formatMoney(review.amountPaid) },
  ];

  const shots = [
    { id: "before", label: "Before", src: review.beforeImage },
    { id: "after", label: "After", src: review.afterImage },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-project-aside py-20 text-project-aside-foreground sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-1 opacity-[0.06] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[72px_72px]"
      />

      <div
        ref={rootRef}
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 xl:px-8"
      >
        <PageHeader
          as="h2"
          textVariant="display"
          eyebrow={TESTIMONIAL_INTRO.eyebrow}
          title={TESTIMONIAL_INTRO.title}
          description={TESTIMONIAL_INTRO.description}
          divClassName="mb-0 max-w-2xl"
          eyebrowClassName="text-project-aside-primary"
          textClassName="text-current"
          descriptionClassName="text-current/70"
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <figure className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "size-4",
                      index < review.rating
                        ? "fill-project-aside-primary text-project-aside-primary"
                        : "text-current/25",
                    )}
                  />
                ))}
              </span>

              <Text
                variant="medium-xs"
                as="span"
                className="uppercase tracking-[0.2em] text-current/60"
              >
                {`${review.rating}.0 out of 5`}
              </Text>
            </div>

            <blockquote data-quote className="mt-6">
              <p className="font-medium leading-[1.25] tracking-tight text-balance text-[clamp(1.35rem,2.6vw,2.1rem)]">
                {review.quote}{" "}
                <span className="text-project-aside-primary">
                  {review.highlight}
                </span>
              </p>
            </blockquote>

            <figcaption className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Text variant="semibold-base" as="span" className="text-current">
                {review.customerName}
              </Text>

              <span aria-hidden className="h-3 w-px bg-current/25" />

              <Text
                variant="normal-sm"
                as="span"
                className="text-current/60"
              >
                {review.customerLocation}
              </Text>

              <span className="inline-flex items-center gap-1.5 border border-project-aside-primary/40 px-2.5 py-1 text-project-aside-primary">
                <BadgeCheck className="size-3.5" />

                <Text
                  variant="medium-xs"
                  as="span"
                  className="uppercase tracking-[0.16em]"
                >
                  Verified booking
                </Text>
              </span>
            </figcaption>

            <dl className="mt-9 border-t border-current/15">
              {docket.map((row) => (
                <div
                  key={row.id}
                  data-docket-row
                  className="flex items-baseline justify-between gap-6 border-b border-current/12 py-3"
                >
                  <dt>
                    <Text
                      variant="medium-xs"
                      as="span"
                      className="uppercase tracking-[0.2em] text-current/50"
                    >
                      {row.label}
                    </Text>
                  </dt>

                  <dd className="min-w-0 text-right">
                    <Text
                      variant="medium-sm"
                      as="span"
                      className="text-current"
                    >
                      {row.value}
                    </Text>
                  </dd>
                </div>
              ))}
            </dl>
          </figure>

          <div className="grid grid-cols-2 gap-3 self-start sm:gap-4">
            {shots.map((shot) => (
              <div key={shot.id} className="min-w-0">
                <div
                  data-shot
                  className="relative aspect-3/4 overflow-hidden border border-current/15"
                >
                  <Image
                    src={shot.src}
                    alt={`${shot.label} — ${review.serviceTitle}`}
                    fill
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="object-cover"
                  />
                </div>

                <Text
                  variant="medium-xs"
                  as="span"
                  className={cn(
                    "mt-3 block uppercase tracking-[0.24em]",
                    shot.id === "after"
                      ? "text-project-aside-primary"
                      : "text-current/50",
                  )}
                >
                  {shot.label}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Picks which review fills the panel above. */}
        <ul className="mt-14 grid gap-px border-t border-current/15 bg-current/10 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((entry, index) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-current={index === activeIndex}
                className={cn(
                  "group flex h-full w-full flex-col items-start gap-1 p-5 text-left transition-colors",
                  index === activeIndex
                    ? "bg-project-aside-primary/12"
                    : "bg-project-aside hover:bg-current/5",
                )}
              >
                <Text
                  variant="medium-xs"
                  as="span"
                  className={cn(
                    "uppercase tracking-[0.2em]",
                    index === activeIndex
                      ? "text-project-aside-primary"
                      : "text-current/45",
                  )}
                >
                  {entry.categoryName}
                </Text>

                <Text
                  variant="semibold-base"
                  as="span"
                  className="text-current"
                >
                  {entry.customerName}
                </Text>

                <Text
                  variant="normal-xs"
                  as="span"
                  className="text-current/55"
                >
                  {entry.customerLocation}
                </Text>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TestimonialSection;
