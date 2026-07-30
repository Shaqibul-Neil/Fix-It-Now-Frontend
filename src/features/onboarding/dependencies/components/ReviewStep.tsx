"use client";

import { Pencil } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { AppButton, SummaryRow, Text } from "@/src/components";
import type { TTechnicianProfileInput } from "../schema/onboarding.schema";

const ReviewStep = ({ onEdit }: { onEdit: (step: number) => void }) => {
  const { basicInfo, pricing, location } =
    useFormContext<TTechnicianProfileInput>().getValues();

  const sections = [
    {
      step: 1,
      title: "Basic Information",
      rows: [
        { label: "Phone", value: basicInfo.phone },
        { label: "Years of experience", value: basicInfo.experienceYears },
        { label: "Profile photo", value: basicInfo.avatar },
        { label: "Bio", value: basicInfo.bio },
      ],
    },
    {
      step: 2,
      title: "Pricing",
      rows: [
        {
          label: "Hourly rate",
          value: pricing.hourlyRate && `${pricing.hourlyRate} tk / hour`,
        },
        {
          label: "Service radius",
          value: pricing.serviceRadius && `${pricing.serviceRadius} km`,
        },
      ],
    },
    {
      step: 3,
      title: "Service Area",
      rows: [
        { label: "City", value: location.city },
        { label: "Area", value: location.area },
        { label: "Address", value: location.address },
      ],
    },
  ];

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.step}
          className="border border-project-border bg-project-card"
        >
          <header className="flex items-center justify-between gap-4 border-b border-project-border px-5 py-3.5">
            <Text
              variant="semibold-sm-2"
              as="span"
              className="uppercase tracking-[0.14em] text-project-accent"
            >
              {section.title}
            </Text>

            <AppButton
              type="button"
              variant="ghost"
              text="Edit"
              leftIcon={Pencil}
              onClick={() => onEdit(section.step)}
            />
          </header>

          <div className="px-5 py-2">
            {section.rows.map((row) => (
              <SummaryRow key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
        </section>
      ))}

      <div className="border border-project-border bg-project-muted-primary/60 p-4">
        <Text variant="normal-sm" as="p" className="text-project-accent">
          Submitting sends your profile to an admin for review. Your dashboard
          opens right away, but publishing services unlocks after approval.
        </Text>
      </div>
    </>
  );
};

export default ReviewStep;
