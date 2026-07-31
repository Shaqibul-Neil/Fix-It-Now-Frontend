import ServiceDetailsPage from "@/src/features/public/service/pages/ServiceDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export default async function ServiceDetailsRoute({ params }: TRouteProps) {
  const { id } = await params;

  return <ServiceDetailsPage id={id} />;
}
