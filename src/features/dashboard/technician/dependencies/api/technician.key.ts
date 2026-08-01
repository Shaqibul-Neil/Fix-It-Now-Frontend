import type { ITechnicianListQuery } from "../types/technician.types";

// `lists` is the prefix a mutation invalidates, `list` is the exact query.
export const technicianKeys = {
  admin: {
    lists: ["admin-technicians"] as const,
    list: (query: ITechnicianListQuery) =>
      ["admin-technicians", query] as const,
    details: (id: string) => ["admin-technician", id] as const,
  },
};
