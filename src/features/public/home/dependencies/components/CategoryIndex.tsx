"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Text } from "@/src/components";
import type { ICategoryListItem } from "@/src/features/public/category/dependencies/types/category.types";
import { formatMoney } from "@/src/lib/utils/format.utils";
import { useCategoryIndex } from "../animation/useCategoryIndex";

const CategoryIndex = ({
  categories,
}: {
  categories: ICategoryListItem[];
}) => {
  const rootRef = useCategoryIndex();

  return (
    <div ref={rootRef} className="relative border-t border-project-border">
      {/* Rides the cursor across the whole list, so it sits outside the rows. */}
      <div
        data-preview-card
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-64 w-72 lg:block xl:h-72 xl:w-80"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            data-preview
            className="absolute inset-0 flex flex-col border border-project-border bg-project-card shadow-[12px_12px_0_0_var(--color-project-primary)]"
          >
            <div className="relative flex-1 overflow-hidden">
              {category.image && (
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              )}
            </div>

            <Text
              variant="medium-xs"
              as="span"
              className="block px-4 py-3 uppercase tracking-[0.2em] text-project-primary"
            >
              {`${category.technicianCount} technicians`}
            </Text>
          </div>
        ))}
      </div>

      <ul>
        {categories.map((category, index) => (
          <li
            key={category.id}
            data-row
            className="group/row relative border-b border-project-border"
          >
            <Link
              href={`/categories/${category.slug}`}
              // Right padding is the slack the hover shift moves into.
              className="relative block py-7 pr-6 md:py-9 md:pr-10"
              aria-label={`${category.name} — ${category.technicianCount} technicians`}
            >
              <span
                data-row-sweep
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-project-primary"
              />

              <span data-row-shift className="flex items-start gap-4 md:gap-8">
                <Text
                  variant="medium-xs"
                  as="span"
                  className="mt-3 shrink-0 tabular-nums tracking-[0.3em] text-project-muted-foreground transition-colors duration-300 group-hover/row:text-project-primary"
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>

                <span className="min-w-0 flex-1">
                  <span
                    data-row-title
                    className="block font-semibold uppercase leading-[0.95] tracking-tight text-project-accent transition-colors duration-300 text-[clamp(1.75rem,5vw,4rem)] group-hover/row:text-project-primary"
                  >
                    {category.name}
                  </span>

                  {category.description && (
                    <Text
                      data-row-detail
                      variant="normal-sm"
                      as="span"
                      className="mt-3 block max-w-xl leading-relaxed text-project-muted-foreground"
                    >
                      {category.description}
                    </Text>
                  )}

                  {/* Stands in for the cursor preview where there is no cursor. */}
                  <span className="mt-5 flex items-center gap-3 lg:hidden">
                    <span className="relative size-14 shrink-0 overflow-hidden border border-project-border">
                      {category.image && (
                        <Image
                          src={category.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </span>

                    <Text
                      variant="medium-xs"
                      as="span"
                      className="uppercase tracking-[0.2em] text-project-primary"
                    >
                      {`${category.technicianCount} technicians · from ${formatMoney(category.startingPrice)}`}
                    </Text>
                  </span>
                </span>

                <span className="mt-3 hidden w-36 shrink-0 text-right lg:block">
                  <Text
                    variant="medium-xs"
                    as="span"
                    className="block uppercase tracking-[0.22em] text-project-muted-foreground"
                  >
                    From
                  </Text>

                  <Text
                    variant="semibold-2xl"
                    as="span"
                    className="mt-1.5 block whitespace-nowrap tabular-nums text-project-accent transition-colors duration-300 group-hover/row:text-project-primary"
                  >
                    {formatMoney(category.startingPrice)}
                  </Text>
                </span>

                <span
                  data-row-arrow
                  aria-hidden
                  className="mt-2 grid size-11 shrink-0 place-items-center rounded-full border border-project-border text-project-muted-foreground transition-colors duration-300 md:size-12 group-hover/row:border-project-primary group-hover/row:bg-project-primary group-hover/row:text-project-primary-foreground"
                >
                  <ArrowUpRight className="size-4.5" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryIndex;
