import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IAdminService,
  IBaseServiceRow,
  IServiceListQuery,
  IServiceRow,
} from "../types/service.types";

const buildQuery = ({ category, search, page, limit }: IServiceListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (category) params.set("category", category);
  if (search) params.set("search", search);

  return `?${params.toString()}`;
};

//-----------------Admin---------------
export const getAdminServices = (query: IServiceListQuery) =>
  clientFetch<IAdminService[]>(
    `${apiEndpoints.admin.service}${buildQuery(query)}`,
  );

//-----------------Technician---------------
export const getTechnicianOwnServices = (query: IServiceListQuery) =>
  clientFetch<IBaseServiceRow[]>(
    `${apiEndpoints.technician.service}${buildQuery(query)}`,
  );

//-----------------Customer---------------
export const getServices = (query: IServiceListQuery) =>
  clientFetch<IServiceRow[]>(
    `${apiEndpoints.service.list}${buildQuery(query)}`,
  );
