import { AppButton, DetailsSection, PageHeader, Text } from "@/src/components";
import { getTechnicians } from "@/src/features/public/technician/dependencies/api/technician.api";
import TechnicianListCard from "@/src/features/public/technician/dependencies/components/TechnicianListCard";
import TechnicianListFilter from "@/src/features/public/technician/dependencies/components/TechnicianListFilter";
import { DEFAULT_PAGE_SIZE } from "@/src/lib/constant/constant";

interface ITechniciansPageProps {
  page: number;
  search?: string;
  city?: string;
  minRating?: string;
}

const TechniciansPage = async ({
  page,
  search,
  city,
  minRating,
}: ITechniciansPageProps) => {
  const { items: technicians, total } = await getTechnicians({
    page,
    limit: DEFAULT_PAGE_SIZE,
    search,
    city,
    minRating,
  });

  const totalPages = Math.max(1, Math.ceil(total / DEFAULT_PAGE_SIZE));

  const buildPageHref = (targetPage: number) => {
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (city) next.set("city", city);
    if (minRating) next.set("minRating", minRating);
    next.set("page", String(targetPage));
    return `/technicians?${next.toString()}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 xl:px-8">
      <PageHeader
        title="Browse technicians"
        description={`${total} technician${total === 1 ? "" : "s"} available`}
        divClassName="mb-6"
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <DetailsSection title="Filters" className="h-fit">
          <TechnicianListFilter />
        </DetailsSection>

        <div className="space-y-6 lg:col-span-3">
          {technicians.length === 0 ? (
            <Text
              variant="normal-sm"
              as="p"
              className="text-project-muted-foreground"
            >
              No technicians match this filter.
            </Text>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {technicians.map((technician, index) => (
                <TechnicianListCard
                  key={technician.id}
                  technician={technician}
                  photoIndex={index}
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

export default TechniciansPage;
