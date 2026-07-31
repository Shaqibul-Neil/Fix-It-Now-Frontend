import TechniciansPage from "@/src/features/public/technician/pages/TechniciansPage";

type TRouteProps = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function TechniciansRoute({ searchParams }: TRouteProps) {
  const { page, search } = await searchParams;

  return <TechniciansPage page={Number(page) || 1} search={search} />;
}
