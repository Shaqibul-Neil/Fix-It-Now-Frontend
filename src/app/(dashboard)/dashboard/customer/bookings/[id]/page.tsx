import CustomerBookingDetailsPage from "@/src/features/dashboard/booking/pages/CustomerBookingDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export default async function CustomerBookingDetailsRoute({
  params,
}: TRouteProps) {
  const { id } = await params;

  return <CustomerBookingDetailsPage id={id} />;
}
