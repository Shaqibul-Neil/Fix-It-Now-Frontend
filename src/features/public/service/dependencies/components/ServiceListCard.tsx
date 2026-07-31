"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppButton, AppRating, Text } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import {
  getCategoryPhoto,
  toCategorySlug,
} from "@/src/features/public/category/dependencies/constants/category.photos";
import LoginPromptModal from "@/src/features/public/home/dependencies/components/LoginPromptModal";
import type { IServiceRow } from "@/src/features/dashboard/service/dependencies/types/service.types";

const ServiceListCard = ({ service }: { service: IServiceRow }) => {
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col overflow-hidden border border-project-border bg-project-card">
        <Link href={`/services/${service.id}`} className="flex flex-col">
          <div className="relative aspect-video w-full">
            <Image
              src={getCategoryPhoto(toCategorySlug(service.category), 600)}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 p-4">
            <Text
              variant="medium-xs"
              as="span"
              className="uppercase tracking-[0.18em] text-project-primary"
            >
              {service.category}
            </Text>

            <Text variant="semibold-base" as="h3" truncate>
              {service.title}
            </Text>

            <Text variant="normal-xs" as="span" className="text-project-muted-foreground">
              {service.technicianName}
            </Text>

            <AppRating
              value={Math.round(Number(service.technicianRating))}
              readOnly
              size={13}
              caption={service.technicianRating}
            />

            <div className="flex items-center justify-between pt-2">
              <Text variant="semibold-sm-2" as="span" className="text-project-accent">
                {formatMoney(service.price)}
              </Text>
              {service.estimatedDuration && (
                <Text variant="normal-xs" as="span" className="text-project-muted-foreground">
                  {service.estimatedDuration} min
                </Text>
              )}
            </div>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-2 px-4 pb-4">
          <AppButton
            text="View details"
            href={`/services/${service.id}`}
            rightIcon={ArrowRight}
            variant="outline"
            className="h-8 px-3 text-xs"
          />
          <AppButton
            text="Book this service"
            type="button"
            onClick={() => setIsLoginPromptOpen(true)}
            className="h-8 px-3 text-xs"
          />
        </div>
      </div>

      <LoginPromptModal
        isOpen={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
      />
    </>
  );
};

export default ServiceListCard;
