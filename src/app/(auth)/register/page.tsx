import type { Metadata } from "next";
import RegisterPage from "@/src/features/auth/pages/RegisterPage";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Join FixItNow as a customer to book trusted home repairs, or as a technician to receive paid jobs in your service area.",
};

export default async function Register({ searchParams }: PageProps<"/register">) {
  const { role } = await searchParams;

  return <RegisterPage role={typeof role === "string" ? role : undefined} />;
}
