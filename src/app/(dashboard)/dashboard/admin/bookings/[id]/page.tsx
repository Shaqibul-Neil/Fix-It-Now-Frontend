import AdminBookingDetailsPage from "@/src/features/dashboard/booking/pages/AdminBookingDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export default async function AdminBookingDetailsRoute({
  params,
}: TRouteProps) {
  const { id } = await params;

  return <AdminBookingDetailsPage id={id} />;
}
