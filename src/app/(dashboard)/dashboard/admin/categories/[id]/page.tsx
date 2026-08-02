import AdminCategoryDetailsPage from "@/src/features/dashboard/category/pages/AdminCategoryDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export default async function AdminCategoryDetailsRoute({
  params,
}: TRouteProps) {
  const { id } = await params;

  return <AdminCategoryDetailsPage id={id} />;
}
