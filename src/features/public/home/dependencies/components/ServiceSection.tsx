import { ArrowRight } from "lucide-react";
import { AppButton, ScrollReveal, Text } from "@/src/components";
import type { IPublicServiceRow } from "@/src/features/public/service/dependencies/types/service.types";
import type { TUserRole } from "@/src/lib/auth/auth.roles";
import ServiceMasonry from "./ServiceMasonry";

const ServiceSection = ({
  services,
  userRole,
}: {
  services: IPublicServiceRow[];
  userRole?: TUserRole;
}) => {
  if (!services.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 xl:px-8">
      <ScrollReveal className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-3">
          <Text
            variant="medium-xs"
            as="span"
            className="uppercase tracking-[0.28em] text-project-primary"
          >
            Featured work
          </Text>
          <Text
            variant="semibold-2xl"
            as="h2"
            className="tracking-tight text-project-accent"
          >
            Services people book most
          </Text>
        </div>

        <AppButton
          text="View all services"
          href="/services"
          rightIcon={ArrowRight}
          variant="outline"
          className="w-fit"
        />
      </ScrollReveal>

      <ServiceMasonry services={services} userRole={userRole} />
    </section>
  );
};

export default ServiceSection;
