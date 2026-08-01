import { clientFetch } from "@/src/lib/api/api.client";
import { apiEndpoints } from "@/src/lib/api/api.endpoint";
import type {
  IAdminPaymentDetails,
  IAdminPaymentRow,
  ICustomerPaymentDetails,
  ICustomerPaymentRow,
  IPaymentListQuery,
} from "../types/payment.types";

const buildQuery = ({ status, period, search, page, limit }: IPaymentListQuery) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) params.set("status", status);
  if (period) params.set("period", period);
  if (search) params.set("search", search);

  return `?${params.toString()}`;
};

//-----------------Admin---------------
export const getAdminPayments = (query: IPaymentListQuery) =>
  clientFetch<IAdminPaymentRow[]>(
    `${apiEndpoints.dashboard.admin.payments.list}${buildQuery(query)}`,
  );

export const getAdminPaymentDetails = (id: string) =>
  clientFetch<IAdminPaymentDetails>(
    apiEndpoints.dashboard.admin.payments.details(id),
  );

//-----------------Customer---------------
export const getCustomerPayments = (query: IPaymentListQuery) =>
  clientFetch<ICustomerPaymentRow[]>(
    `${apiEndpoints.dashboard.customer.payments.myPayments}${buildQuery(query)}`,
  );

export const getCustomerPaymentDetails = (id: string) =>
  clientFetch<ICustomerPaymentDetails>(
    apiEndpoints.dashboard.customer.payments.details(id),
  );
