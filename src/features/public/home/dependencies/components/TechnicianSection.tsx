import { ArrowRight } from "lucide-react";
import {
  AppButton,
  AppSlider,
  PageHeader,
  ScrollReveal,
  TechnicianCard,
} from "@/src/components";
import type { ITechnician } from "@/src/features/public/technician/dependencies/types/technician.types";
import type { TUserRole } from "@/src/lib/auth/auth.roles";
import BookNowButton from "./BookNowButton";

interface ITechnicianSectionProps {
  technicians: ITechnician[];
  userRole?: TUserRole;
}

const TechnicianSection = ({
  technicians,
  userRole,
}: ITechnicianSectionProps) => {
  if (!technicians.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <ScrollReveal>
        <PageHeader
          as="h2"
          textVariant="display"
          align="center"
          eyebrow="Verified & rated"
          title="Trusted technicians, ready to work"
          description="Browse our hand-picked featured technicians — each one ID-checked, admin-approved and rated by the customers they worked for."
          divClassName="mx-auto mb-10 max-w-2xl sm:mb-14"
        />
      </ScrollReveal>

      <AppSlider
        label="Featured technicians"
        controlsAlign="center"
        autoplayDelay={7000}
      >
        {technicians.map((technician) => (
          <TechnicianCard
            key={technician.id}
            technician={technician}
            tone="panel"
            className="sm:grid-cols-[1.35fr_0.65fr] sm:items-stretch sm:gap-8"
            bookAction={
              <BookNowButton
                userRole={userRole}
                className="border-project-panel-primary bg-project-panel-primary text-project-card hover:bg-transparent hover:text-project-panel-primary"
              />
            }
          />
        ))}
      </AppSlider>

      <div className="mt-10 flex justify-center">
        <AppButton
          text="View all technicians"
          href="/technicians"
          rightIcon={ArrowRight}
          variant="outline"
        />
      </div>
    </section>
  );
};

export default TechnicianSection;
