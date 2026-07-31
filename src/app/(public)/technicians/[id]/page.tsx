import TechnicianDetailsPage from "@/src/features/public/technician/pages/TechnicianDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export default async function TechnicianDetailsRoute({ params }: TRouteProps) {
  const { id } = await params;

  return <TechnicianDetailsPage id={id} />;
}
