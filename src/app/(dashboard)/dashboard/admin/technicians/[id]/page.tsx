import AdminTechnicianDetailsPage from "@/src/features/dashboard/technician/pages/AdminTechnicianDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export default async function AdminTechnicianDetailsRoute({
  params,
}: TRouteProps) {
  const { id } = await params;

  return <AdminTechnicianDetailsPage id={id} />;
}
