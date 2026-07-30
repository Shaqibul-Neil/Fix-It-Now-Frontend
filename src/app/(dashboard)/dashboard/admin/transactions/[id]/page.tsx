import AdminPaymentDetailsPage from "@/src/features/dashboard/payment/pages/AdminPaymentDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export default async function AdminPaymentDetailsRoute({
  params,
}: TRouteProps) {
  const { id } = await params;

  return <AdminPaymentDetailsPage id={id} />;
}
