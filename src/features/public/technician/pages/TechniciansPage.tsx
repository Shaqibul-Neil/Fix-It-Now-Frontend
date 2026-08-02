import {
  AppButton,
  ScrollReveal,
  TechnicianCard,
  Text,
} from "@/src/components";
import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import BookNowButton from "@/src/features/public/home/dependencies/components/BookNowButton";
import {
  getTechnicianFacets,
  getTechnicians,
} from "../dependencies/api/technician.api";
import TechnicianListFilter from "../dependencies/components/TechnicianListFilter";
import TechnicianListToolbar from "../dependencies/components/TechnicianListToolbar";
import type { IPublicTechnicianQuery } from "../dependencies/types/technician.types";

interface ITechniciansPageProps {
  query: IPublicTechnicianQuery;
  searchParams: URLSearchParams;
}

const TechniciansPage = async ({
  query,
  searchParams,
}: ITechniciansPageProps) => {
  const [{ items: technicians, total }, facets, currentUser] =
    await Promise.all([
      getTechnicians(query),
      getTechnicianFacets(),
      getMeRequest(),
    ]);

  const totalPages = Math.max(1, Math.ceil(total / query.limit));

  const buildPageHref = (targetPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(targetPage));
    return `/technicians?${next.toString()}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 xl:px-8">
      <ScrollReveal className="mb-8 max-w-2xl space-y-3">
        <Text
          variant="semibold-3xl"
          as="h1"
          className="tracking-tight text-project-accent"
        >
          Find your technician.
        </Text>

        <Text
          variant="normal-base"
          as="p"
          className="text-project-muted-foreground"
        >
          Browse verified professionals near you and narrow the list down to the
          exact trade, budget and working hours you need.
        </Text>
      </ScrollReveal>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[17rem_1fr] xl:grid-cols-[19rem_1fr]">
        <aside className="hidden h-fit lg:sticky lg:top-24 lg:block">
          <TechnicianListFilter facets={facets} />
        </aside>

        <div className="min-w-0 space-y-5">
          <TechnicianListToolbar total={total} facets={facets} />

          {technicians.length === 0 ? (
            <div className="border border-project-border bg-project-card px-6 py-16 text-center">
              <Text
                variant="semibold-base"
                as="p"
                className="text-project-accent"
              >
                No technician matches this filter
              </Text>

              <Text
                variant="normal-sm"
                as="p"
                className="mt-2 text-project-muted-foreground"
              >
                Try clearing a checkbox or widening the hourly rate.
              </Text>
            </div>
          ) : (
            <div className="space-y-4">
              {technicians.map((technician) => (
                <TechnicianCard
                  key={technician.id}
                  technician={technician}
                  bookAction={<BookNowButton userRole={currentUser?.role} />}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between border border-project-border bg-project-card px-4 py-3">
              <Text
                variant="normal-sm"
                as="span"
                className="text-project-muted-foreground"
              >
                Page {query.page} of {totalPages}
              </Text>

              <div className="flex gap-2">
                {query.page > 1 ? (
                  <AppButton
                    text="Previous"
                    variant="outline"
                    href={buildPageHref(query.page - 1)}
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

                {query.page < totalPages ? (
                  <AppButton
                    text="Next"
                    variant="outline"
                    href={buildPageHref(query.page + 1)}
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
