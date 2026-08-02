import type { TSelectOption } from "@/src/types/filter.types";
import { ALL_OPTION_VALUE } from "@/src/lib/options/filter.options";
import type { TCategorySort } from "../types/category.types";

export const CATEGORY_SORT_OPTIONS: TSelectOption[] = [
  { label: "A to Z", value: "name" satisfies TCategorySort },
  { label: "Most booked", value: "popular" satisfies TCategorySort },
  { label: "Trending now", value: "trending" satisfies TCategorySort },
];

// The list is unpaginated, so the limit is how many tiles the page shows.
export const CATEGORY_LIMIT_OPTIONS: TSelectOption[] = [
  { label: "Show all", value: ALL_OPTION_VALUE },
  { label: "Show 6", value: "6" },
  { label: "Show 12", value: "12" },
  { label: "Show 24", value: "24" },
];
