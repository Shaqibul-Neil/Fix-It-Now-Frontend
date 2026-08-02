import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IAdminServiceRow,
  ICustomerServiceRow,
  IManagedServiceListQuery,
  IManagedServiceRow,
  IServiceListQuery,
} from "../types/service.types";

const buildQuery = ({
  category,
  search,
  city,
  minRating,
  page,
  limit,
}: IServiceListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (category) params.set("category", category);
  if (search) params.set("search", search);
  if (city) params.set("city", city);
  if (minRating) params.set("minRating", minRating);

  return `?${params.toString()}`;
};

// The managed lists take the public filters plus the record-status tab.
const buildManagedQuery = ({ status, ...query }: IManagedServiceListQuery) =>
  `${buildQuery(query)}${status ? `&status=${status}` : ""}`;

//-----------------Admin---------------
export const getAdminServices = (query: IManagedServiceListQuery) =>
  clientFetch<IAdminServiceRow[]>(
    `${apiEndpoints.dashboard.admin.services.list}${buildManagedQuery(query)}`,
  );

//-----------------Technician---------------
export const getTechnicianOwnServices = (query: IManagedServiceListQuery) =>
  clientFetch<IManagedServiceRow[]>(
    `${apiEndpoints.dashboard.technician.services.myServices}${buildManagedQuery(query)}`,
  );

//-----------------Customer---------------
export const getServices = (query: IServiceListQuery) =>
  clientFetch<ICustomerServiceRow[]>(
    `${apiEndpoints.dashboard.customer.services.list}${buildQuery(query)}`,
  );
