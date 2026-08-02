"use client";

import { AppCheckbox, Text } from "@/src/components";
import { useServerPagination } from "@/src/hooks/useServerPagination";
import {
  ALL_OPTION_VALUE,
  FILTER_OPTIONS,
} from "@/src/lib/options/filter.options";
import { cn } from "@/src/lib/utils/cn";
import {
  PRICE_BUCKET_LABEL,
  TECHNICIAN_TOGGLES,
} from "../constants/technician.filters";
import type { ITechnicianFacets } from "../types/technician.types";

const CITY_OPTIONS = FILTER_OPTIONS.city.options.filter(
  (option) => option.value !== ALL_OPTION_VALUE,
);

const RATING_STEPS = ["5", "4", "3", "2"];

const GROUP_TITLE =
  "text-xs font-semibold uppercase tracking-[0.16em] text-project-accent";

interface ITechnicianListFilterProps {
  facets: ITechnicianFacets;
  className?: string;
}

const TechnicianListFilter = ({
  facets,
  className,
}: ITechnicianListFilterProps) => {
  const {
    getFilter,
    setFilter,
    getFilterList,
    toggleFilterValue,
    clearFilters,
  } = useServerPagination();

  const isChecked = (key: string, value: string) =>
    getFilterList(key).includes(value);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 divide-y divide-project-border border border-project-border bg-project-card",
        className,
      )}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <Text variant="semibold-base" as="h2" className={GROUP_TITLE}>
          Narrow it down
        </Text>

        <button
          type="button"
          onClick={clearFilters}
          className="cursor-pointer text-xs font-medium text-project-primary hover:underline"
        >
          Clear all
        </button>
      </div>

      {facets.categories.length > 0 && (
        <fieldset className="space-y-1 px-5 py-5">
          <legend className={GROUP_TITLE}>Service offered</legend>

          <div className="space-y-2.5">
            {facets.categories.map((category) => (
              <AppCheckbox
                key={category.id}
                id={`category-${category.id}`}
                label={`${category.name} (${category.count})`}
                checked={isChecked("categoryIds", category.id)}
                onCheckedChange={() =>
                  toggleFilterValue("categoryIds", category.id)
                }
              />
            ))}
          </div>
        </fieldset>
      )}

      {facets.skills.length > 0 && (
        <fieldset className="space-y-1 px-5 py-5">
          <legend className={GROUP_TITLE}>Skills</legend>

          <div className="custom-scrollbar max-h-64 space-y-2.5 overflow-y-auto pr-1">
            {facets.skills.map((skill) => (
              <AppCheckbox
                key={skill.value}
                id={`skill-${skill.value}`}
                label={`${skill.value} (${skill.count})`}
                checked={isChecked("skills", skill.value)}
                onCheckedChange={() => toggleFilterValue("skills", skill.value)}
              />
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="space-y-1 px-5 py-5">
        <legend className={GROUP_TITLE}>Availability</legend>

        <div className="space-y-2.5">
          {TECHNICIAN_TOGGLES.map((toggle) => (
            <AppCheckbox
              key={toggle.key}
              id={toggle.key}
              label={toggle.label}
              checked={getFilter(toggle.key) === "true"}
              onCheckedChange={(checked) =>
                setFilter(toggle.key, checked ? "true" : undefined)
              }
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-1 px-5 py-5">
        <legend className={GROUP_TITLE}>Hourly rate</legend>

        <div className="space-y-2.5">
          {Object.entries(PRICE_BUCKET_LABEL).map(([bucket, label]) => (
            <AppCheckbox
              key={bucket}
              id={`price-${bucket}`}
              label={label}
              checked={isChecked("priceBuckets", bucket)}
              onCheckedChange={() => toggleFilterValue("priceBuckets", bucket)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-1 px-5 py-5">
        <legend className={GROUP_TITLE}>City</legend>

        <div className="custom-scrollbar max-h-56 space-y-2.5 overflow-y-auto pr-1">
          {CITY_OPTIONS.map((city) => (
            <AppCheckbox
              key={city.value}
              id={`city-${city.value}`}
              label={city.label}
              checked={isChecked("city", city.value)}
              onCheckedChange={() => toggleFilterValue("city", city.value)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-1 px-5 py-5">
        <legend className={GROUP_TITLE}>Rating</legend>

        <div className="flex flex-wrap gap-2">
          {RATING_STEPS.map((rating) => {
            const isActive = getFilter("minRating") === rating;

            return (
              <button
                key={rating}
                type="button"
                onClick={() =>
                  setFilter("minRating", isActive ? undefined : rating)
                }
                className={cn(
                  "cursor-pointer border px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "border-project-primary bg-project-muted-primary text-project-primary"
                    : "border-project-border text-project-muted-foreground hover:border-project-primary",
                )}
              >
                {rating}+ stars
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};

export default TechnicianListFilter;
