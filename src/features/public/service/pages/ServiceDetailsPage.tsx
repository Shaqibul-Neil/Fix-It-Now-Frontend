import { notFound } from "next/navigation";
import Image from "next/image";
import { AppRating, DetailsHeader, DetailsSection, InfoList, Text } from "@/src/components";
import { getServiceById } from "@/src/features/public/service/dependencies/api/service.api";
import { getTechnicianById } from "@/src/features/public/technician/dependencies/api/technician.api";
import {
  getCategoryPhoto,
  toCategorySlug,
} from "@/src/features/public/category/dependencies/constants/category.photos";
import { formatDate, formatMoney } from "@/src/lib/utils/format.utils";

const ServiceDetailsPage = async ({ id }: { id: string }) => {
  const service = await getServiceById(id);
  if (!service) notFound();

  const technician = await getTechnicianById(service.technicianId);

  return (
    <section className="mx-auto max-w-7xl space-y-4 px-4 py-12 sm:px-6 xl:px-8">
      <DetailsHeader
        title={service.category}
        name={service.title}
        metaItems={[
          { label: "Price", value: formatMoney(service.price) },
          {
            label: "Duration",
            value: service.estimatedDuration ? `${service.estimatedDuration} min` : null,
          },
          { label: "Listed", value: formatDate(service.createdAt) },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-3">
          <div className="relative aspect-video w-full overflow-hidden border border-project-border">
            <Image
              src={getCategoryPhoto(toCategorySlug(service.category), 1200)}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 75vw, 100vw"
              className="object-cover"
            />
          </div>

          <DetailsSection title="Details">
            <InfoList
              items={[
                {
                  label: "Description",
                  value: service.description,
                  className: "sm:col-span-2 lg:col-span-3",
                },
                { label: "Category", value: service.category },
                { label: "Price", value: formatMoney(service.price) },
                {
                  label: "Duration",
                  value: service.estimatedDuration ? `${service.estimatedDuration} min` : null,
                },
              ]}
              columns={3}
            />
          </DetailsSection>
        </div>

        <DetailsSection title="Technician" className="h-fit">
          <div className="space-y-3">
            <Text variant="semibold-base" as="p">
              {service.technicianName}
            </Text>

            <AppRating
              value={Math.round(Number(service.technicianRating))}
              readOnly
              size={14}
              caption={service.technicianRating}
            />

            {technician && (
              <InfoList
                items={[
                  { label: "Location", value: `${technician.city}, ${technician.area}` },
                  { label: "Experience", value: `${technician.experienceYears} yrs` },
                  { label: "Rate", value: `${formatMoney(technician.hourlyRate)}/hr` },
                ]}
                columns={1}
              />
            )}
          </div>
        </DetailsSection>
      </div>
    </section>
  );
};

export default ServiceDetailsPage;
