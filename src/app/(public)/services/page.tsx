import ServicesPage from "@/src/features/public/service/pages/ServicesPage";

type TRouteProps = {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
};

export default async function ServicesRoute({ searchParams }: TRouteProps) {
  const { page, search, category } = await searchParams;

  return <ServicesPage page={Number(page) || 1} search={search} category={category} />;
}
