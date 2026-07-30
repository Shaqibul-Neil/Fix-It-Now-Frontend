import type { Metadata } from "next";
import PaymentResultPage from "@/src/features/public/payment/pages/PaymentResultPage";

export const metadata: Metadata = { title: "Payment received" };

type TRouteProps = { searchParams: Promise<{ tran_id?: string }> };

export default async function PaymentSuccessRoute({
  searchParams,
}: TRouteProps) {
  const { tran_id } = await searchParams;

  return <PaymentResultPage variant="success" transactionId={tran_id} />;
}
