import ServicesPage from "@/src/features/public/service/pages/ServicesPage";

type TRouteProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    city?: string;
    minRating?: string;
  }>;
};

export default async function ServicesRoute({ searchParams }: TRouteProps) {
  const { page, search, category, city, minRating } = await searchParams;

  return (
    <ServicesPage
      page={Number(page) || 1}
      search={search}
      category={category}
      city={city}
      minRating={minRating}
    />
  );
}
