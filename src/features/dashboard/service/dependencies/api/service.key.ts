import type { IServiceListQuery } from "../types/service.types";

export const serviceKeys = {
  lists: ["services"] as const,
  list: (query: IServiceListQuery) => ["services", query] as const,
};
