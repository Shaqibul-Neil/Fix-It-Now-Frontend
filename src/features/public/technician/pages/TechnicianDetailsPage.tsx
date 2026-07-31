import { notFound } from "next/navigation";
import { AppRating, DetailsHeader, DetailsSection, InfoList } from "@/src/components";
import { getServices } from "@/src/features/public/service/dependencies/api/service.api";
import {
  getTechnicianAvailability,
  getTechnicianById,
} from "@/src/features/public/technician/dependencies/api/technician.api";
import TechnicianServicesTable from "@/src/features/public/technician/dependencies/components/TechnicianServicesTable";
import AvailabilitySummary from "@/src/features/dashboard/availability/dependencies/components/AvailabilitySummary";
import {
  DAY_ORDER,
  emptyWeek,
} from "@/src/features/dashboard/availability/dependencies/utils/availability.utils";
import type {
  IPublicAvailabilitySlot,
  TWeekSchedule,
} from "@/src/features/dashboard/availability/dependencies/types/availability.types";
import { formatMoney } from "@/src/lib/utils/format.utils";

// Public slots carry no `isActive` (off days are already dropped server-side),
// so every row here turns its day on — unlike the technician's own editor.
const toPublicWeekSchedule = (slots: IPublicAvailabilitySlot[]): TWeekSchedule => {
  const week = emptyWeek();

  slots.forEach(({ dayOfWeek, startTime, endTime }) => {
    week[dayOfWeek].isActive = true;
    week[dayOfWeek].ranges.push({ startTime, endTime });
  });

  DAY_ORDER.forEach((day) => {
    week[day].ranges.sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  return week;
};

const TechnicianDetailsPage = async ({ id }: { id: string }) => {
  const technician = await getTechnicianById(id);
  if (!technician) notFound();

  const [{ items: allServices }, availabilitySlots] = await Promise.all([
    // No public "by technician" filter on the services list, so this reads a
    // generous page and narrows to this technician's rows below.
    getServices({ page: 1, limit: 100 }),
    getTechnicianAvailability(id),
  ]);

  const services = allServices.filter((service) => service.technicianId === id);
  const week = toPublicWeekSchedule(availabilitySlots);
  const fullName = `${technician.firstName} ${technician.lastName}`;

  return (
    <section className="mx-auto max-w-7xl space-y-4 px-4 py-12 sm:px-6 xl:px-8">
      <DetailsHeader
        title="Technician"
        name={fullName}
        metaItems={[
          { label: "Location", value: `${technician.city}, ${technician.area}` },
          { label: "Experience", value: `${technician.experienceYears} yrs` },
          { label: "Rate", value: `${formatMoney(technician.hourlyRate)}/hr` },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-3">
          <DetailsSection title="About">
            <div className="space-y-4">
              <AppRating
                value={Math.round(Number(technician.averageRating))}
                readOnly
                size={14}
                caption={`${technician.averageRating} (${technician.totalReviews} reviews)`}
              />

              <InfoList
                items={[
                  {
                    label: "Bio",
                    value: technician.bio,
                    className: "sm:col-span-2 lg:col-span-3",
                  },
                  { label: "Address", value: technician.address },
                  {
                    label: "Service radius",
                    value: technician.serviceRadius ? `${technician.serviceRadius} km` : null,
                  },
                ]}
                columns={3}
              />
            </div>
          </DetailsSection>

          <DetailsSection title="Services offered">
            <TechnicianServicesTable services={services} />
          </DetailsSection>
        </div>

        <DetailsSection title="Availability" className="h-fit">
          <AvailabilitySummary week={week} />
        </DetailsSection>
      </div>
    </section>
  );
};

export default TechnicianDetailsPage;
