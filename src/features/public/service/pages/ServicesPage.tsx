import { AppButton, DetailsSection, PageHeader, Text } from "@/src/components";
import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import { getCategories } from "@/src/features/public/category/dependencies/api/category.api";
import { getServices } from "@/src/features/public/service/dependencies/api/service.api";
import ServiceListCard from "@/src/features/public/service/dependencies/components/ServiceListCard";
import ServiceListFilter from "@/src/features/public/service/dependencies/components/ServiceListFilter";
import { DEFAULT_PAGE_SIZE } from "@/src/lib/constant/constant";

interface IServicesPageProps {
  page: number;
  search?: string;
  category?: string;
  city?: string;
  minRating?: string;
}

const ServicesPage = async ({
  page,
  search,
  category,
  city,
  minRating,
}: IServicesPageProps) => {
  const [categories, { items: services, total }, currentUser] = await Promise.all([
    getCategories(),
    getServices({
      page,
      limit: DEFAULT_PAGE_SIZE,
      search,
      category,
      city,
      minRating,
    }),
    getMeRequest(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / DEFAULT_PAGE_SIZE));
  const categoryOptions = categories.map((item) => ({
    label: item.name,
    value: item.slug,
  }));

  const buildPageHref = (targetPage: number) => {
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (category) next.set("category", category);
    if (city) next.set("city", city);
    if (minRating) next.set("minRating", minRating);
    next.set("page", String(targetPage));
    return `/services?${next.toString()}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 xl:px-8">
      <PageHeader
        title="Browse services"
        description={`${total} service${total === 1 ? "" : "s"} available`}
        divClassName="mb-6"
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <DetailsSection title="Filters" className="h-fit">
          <ServiceListFilter categoryOptions={categoryOptions} />
        </DetailsSection>

        <div className="space-y-6 lg:col-span-3">
          {services.length === 0 ? (
            <Text
              variant="normal-sm"
              as="p"
              className="text-project-muted-foreground"
            >
              No services match this filter.
            </Text>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceListCard
                  key={service.id}
                  service={service}
                  userRole={currentUser?.role}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <Text
                variant="normal-sm"
                as="span"
                className="text-project-muted-foreground"
              >
                Page {page} of {totalPages}
              </Text>

              <div className="flex gap-2">
                {page > 1 ? (
                  <AppButton
                    text="Previous"
                    variant="outline"
                    href={buildPageHref(page - 1)}
                    className="h-9 px-3 text-xs"
                  />
                ) : (
                  <AppButton
                    text="Previous"
                    variant="outline"
                    disabled
                    className="h-9 px-3 text-xs"
                  />
                )}

                {page < totalPages ? (
                  <AppButton
                    text="Next"
                    variant="outline"
                    href={buildPageHref(page + 1)}
                    className="h-9 px-3 text-xs"
                  />
                ) : (
                  <AppButton
                    text="Next"
                    variant="outline"
                    disabled
                    className="h-9 px-3 text-xs"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
