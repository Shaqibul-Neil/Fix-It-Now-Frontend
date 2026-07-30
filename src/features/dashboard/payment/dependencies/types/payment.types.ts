import type { TBookingStatus, TPaymentStatus } from "@/src/types/types";

export type TPaymentProvider = "SSLCOMMERZ" | "STRIPE";

interface IPaymentParty {
  id: string;
  name: string;
}

interface IPayer extends IPaymentParty {
  email: string;
  phone: string | null;
}

// Decimal and DateTime both arrive as strings over JSON.
export interface ICustomerPaymentRow {
  id: string;
  status: TPaymentStatus;
  amount: string;
  paidAt: string | null;
  createdAt: string;
  bookingId: string;
  serviceTitle: string;
  provider: TPaymentProvider;
  method: string | null;
}

// The admin row is the customer one plus both parties and the gateway reference.
export interface IAdminPaymentRow extends ICustomerPaymentRow {
  transactionId: string;
  bookingStatus: TBookingStatus;
  scheduledAt: string;
  customer: IPayer;
  technician: IPaymentParty;
}

export interface IPaymentListQuery {
  status?: TPaymentStatus;
  period?: string;
  search?: string;
  page: number;
  limit: number;
}

export interface ICustomerPaymentDetails {
  id: string;
  transactionId: string;
  amount: string;
  currency: string;
  status: TPaymentStatus;
  provider: TPaymentProvider;
  method: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  booking: {
    id: string;
    status: TBookingStatus;
    notes: string | null;
    address: string;
    city: string | null;
    area: string | null;
    scheduledAt: string;
    acceptedAt: string | null;
    completedAt: string | null;
    cancelledAt: string | null;
  };
  service: {
    id: string;
    title: string;
    price: string;
    category: string;
  };
  technician: IPaymentParty;
}

export interface IAdminPaymentDetails extends ICustomerPaymentDetails {
  valId: string | null;
  customer: IPayer;
}
