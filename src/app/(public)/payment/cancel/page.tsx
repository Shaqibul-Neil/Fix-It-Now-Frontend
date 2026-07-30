import type { Metadata } from "next";
import PaymentResultPage from "@/src/features/public/payment/pages/PaymentResultPage";

export const metadata: Metadata = { title: "Payment cancelled" };

type TRouteProps = { searchParams: Promise<{ tran_id?: string }> };

export default async function PaymentCancelRoute({
  searchParams,
}: TRouteProps) {
  const { tran_id } = await searchParams;

  return <PaymentResultPage variant="cancel" transactionId={tran_id} />;
}
