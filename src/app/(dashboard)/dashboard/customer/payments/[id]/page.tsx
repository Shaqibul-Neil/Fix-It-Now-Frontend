import CustomerPaymentDetailsPage from "@/src/features/dashboard/payment/pages/CustomerPaymentDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export default async function CustomerPaymentDetailsRoute({
  params,
}: TRouteProps) {
  const { id } = await params;

  return <CustomerPaymentDetailsPage id={id} />;
}
