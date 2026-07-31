import { ArrowRight } from "lucide-react";
import { AppButton, ScrollReveal, Text } from "@/src/components";
import type { ITechnician } from "@/src/features/public/technician/dependencies/types/technician.types";
import TechnicianCard from "./TechnicianCard";

const TechnicianSection = ({ technicians }: { technicians: ITechnician[] }) => {
  if (!technicians.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 xl:px-8">
      <ScrollReveal className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-3">
          <Text
            variant="medium-xs"
            as="span"
            className="uppercase tracking-[0.28em] text-project-primary"
          >
            Verified & rated
          </Text>
          <Text
            variant="semibold-2xl"
            as="h2"
            className="tracking-tight text-project-accent"
          >
            Our top technicians
          </Text>
        </div>

        <AppButton
          text="View all technicians"
          href="/technicians"
          rightIcon={ArrowRight}
          variant="outline"
          className="w-fit"
        />
      </ScrollReveal>

      <ScrollReveal className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {technicians.map((technician, index) => (
          <TechnicianCard
            key={technician.id}
            technician={technician}
            photoIndex={index}
          />
        ))}
      </ScrollReveal>
    </section>
  );
};

export default TechnicianSection;
