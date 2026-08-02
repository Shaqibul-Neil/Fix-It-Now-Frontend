"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_PAGE_SIZE } from "@/src/lib/constant/constant";
import { ALL_OPTION_VALUE } from "@/src/lib/options/filter.options";

export interface IServerPagination {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  getFilter: (key: string) => string | undefined;
  setFilter: (key: string, value?: string) => void;
  getFilterList: (key: string) => string[];
  toggleFilterValue: (key: string, value: string) => void;
  clearFilters: () => void;
}

// The URL is the table state, so a filter change also resets the page.
export const useServerPagination = (
  defaultPageSize = DEFAULT_PAGE_SIZE,
): IServerPagination => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("limit")) || defaultPageSize;

  const push = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return {
    page,
    pageSize,

    setPage: (next) => push((params) => params.set("page", String(next))),

    setPageSize: (next) =>
      push((params) => {
        params.set("limit", String(next));
        params.set("page", "1");
      }),

    // "ALL" is the UI's word for no filter — a bookmarked one must not reach the API.
    getFilter: (key) => {
      const value = searchParams.get(key);
      return value && value !== ALL_OPTION_VALUE ? value : undefined;
    },

    setFilter: (key, value) =>
      push((params) => {
        if (value) params.set(key, value);
        else params.delete(key);
        params.set("page", "1");
      }),

    // Checkbox groups live in the URL as repeated keys.
    getFilterList: (key) => searchParams.getAll(key),

    toggleFilterValue: (key, value) =>
      push((params) => {
        const current = params.getAll(key);
        const next = current.includes(value)
          ? current.filter((entry) => entry !== value)
          : [...current, value];

        params.delete(key);
        next.forEach((entry) => params.append(key, entry));
        params.set("page", "1");
      }),

    clearFilters: () => router.push(pathname, { scroll: false }),
  };
};
