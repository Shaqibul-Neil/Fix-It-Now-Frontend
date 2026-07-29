import type { Metadata } from "next";
import ForgotPasswordPage from "@/src/features/auth/pages/ForgotPasswordPage";

export const metadata: Metadata = {
  title: "Reset your password",
  description:
    "Enter the email linked to your FixItNow account and we will send you a secure link to set a new password.",
};

export default function ForgotPassword() {
  return <ForgotPasswordPage />;
}
