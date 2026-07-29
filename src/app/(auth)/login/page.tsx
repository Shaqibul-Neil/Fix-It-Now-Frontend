import type { Metadata } from "next";
import LoginPage from "@/src/features/auth/pages/LoginPage";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to FixItNow to book verified technicians, follow your job live, and pay only after the work is approved.",
};

export default function Login() {
  return <LoginPage />;
}
