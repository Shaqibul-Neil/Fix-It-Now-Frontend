import { Ban, CheckCircle2, XCircle } from "lucide-react";
import type {
  IPaymentResultContent,
  TPaymentResult,
} from "../types/payment.types";

export const PAYMENT_RESULT: Record<TPaymentResult, IPaymentResultContent> = {
  success: {
    tone: "success",
    icon: CheckCircle2,
    title: "Payment received",
    description:
      "Your booking is marked as paid and the technician has been notified. They will start the job at the scheduled time.",
  },
  fail: {
    tone: "danger",
    icon: XCircle,
    title: "Payment failed",
    description:
      "The gateway could not complete this payment, so nothing was charged. Your booking is still waiting — you can pay again from your bookings.",
  },
  cancel: {
    tone: "warning",
    icon: Ban,
    title: "Payment cancelled",
    description:
      "You left the gateway before the payment completed, so nothing was charged. Your booking is still waiting.",
  },
};
