// The admin list reads the same unpaginated public endpoint the select
// dropdowns do, so a write has to drop both caches.
export const categoryKeys = {
  options: ["categories"] as const,
  admin: {
    lists: ["admin-categories"] as const,
  },
};
