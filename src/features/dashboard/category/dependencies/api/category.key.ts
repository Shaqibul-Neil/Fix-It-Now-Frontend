import type { ICategoryListQuery } from "../types/category.types";

// `lists` is the prefix a mutation invalidates, `list` is the exact query.
// `options` is the public list every category dropdown reads.
export const categoryKeys = {
  options: ["categories"] as const,
  admin: {
    lists: ["admin-categories"] as const,
    list: (query: ICategoryListQuery) => ["admin-categories", query] as const,
    details: ["admin-category"] as const,
    detail: (id: string) => ["admin-category", id] as const,
  },
};
