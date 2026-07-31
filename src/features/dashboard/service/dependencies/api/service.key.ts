import type { IServiceListQuery } from "../types/service.types";

export const serviceKeys = {
  customer: {
    lists: ["services"] as const,
    list: (query: IServiceListQuery) => ["services", query] as const,
  },
  technician: {
    lists: ["my-services"] as const,
    list: (query: IServiceListQuery) => ["my-services", query] as const,
  },
  admin: {
    lists: ["all-services"] as const,
    list: (query: IServiceListQuery) => ["all-services", query] as const,
  },
};
