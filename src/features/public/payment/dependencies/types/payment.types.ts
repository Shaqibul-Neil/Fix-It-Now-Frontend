import type { LucideIcon } from "lucide-react";

// The three pages the gateway redirects a customer back to.
export type TPaymentResult = "success" | "fail" | "cancel";

export interface IPaymentResultContent {
  tone: "success" | "warning" | "danger";
  icon: LucideIcon;
  title: string;
  description: string;
}
