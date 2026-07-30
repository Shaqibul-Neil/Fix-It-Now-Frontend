import TechnicianBookingDetailsPage from "@/src/features/dashboard/booking/pages/TechnicianBookingDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export default async function TechnicianJobDetailsRoute({
  params,
}: TRouteProps) {
  const { id } = await params;

  return <TechnicianBookingDetailsPage id={id} />;
}
