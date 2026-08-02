"use client";

import Image from "next/image";
import { AppRating, Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";
import { formatMoney } from "@/src/lib/utils/format.utils";
import type { IPublicServiceRow } from "@/src/features/public/service/dependencies/types/service.types";
import {
  getCategoryPhoto,
  toCategorySlug,
} from "@/src/features/dashboard/category/dependencies/constants/category.photos";
import type { TUserRole } from "@/src/lib/auth/auth.roles";
import BookNowButton from "./BookNowButton";

const formatDuration = (minutes: number | null) => {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
};

interface IServiceCardProps {
  service: IPublicServiceRow;
  variant?: "hero" | "compact";
  className?: string;
  onMouseEnter?: () => void;
  userRole?: TUserRole;
}

const ServiceCard = ({
  service,
  variant = "compact",
  className,
  onMouseEnter,
  userRole,
}: IServiceCardProps) => {
  const isHero = variant === "hero";
  const duration = formatDuration(service.estimatedDuration);

  return (
    <article
      data-flip-id={service.id}
      onMouseEnter={onMouseEnter}
      className={cn(
        "group relative isolate flex overflow-hidden border border-project-border bg-project-aside",
        isHero
          ? "aspect-4/5 sm:aspect-16/11 lg:aspect-auto"
          : "aspect-4/5 sm:aspect-16/10",
        className,
      )}
    >
      <Image
        src={getCategoryPhoto(
          toCategorySlug(service.category),
          isHero ? 1600 : 900,
        )}
        alt={service.title}
        fill
        sizes={
          isHero
            ? "(min-width: 1024px) 50vw, 100vw"
            : "(min-width: 1024px) 25vw, 50vw"
        }
        quality={90}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent"
      />

      <div
        className={cn(
          "relative z-10 flex h-full w-full flex-col justify-end gap-2.5 text-white",
          isHero ? "p-6 sm:p-8" : "p-4 sm:p-5",
        )}
      >
        <Text
          variant="medium-xs"
          as="span"
          className="w-fit uppercase tracking-[0.22em] text-project-aside-primary"
        >
          {service.category}
        </Text>

        <Text
          variant={isHero ? "semibold-xl" : "semibold-base"}
          as="h3"
          truncate
          className="leading-tight"
        >
          {service.title}
        </Text>

        <div className="flex items-center gap-2 opacity-85">
          <Text variant="normal-xs" as="span" truncate>
            {service.technicianName}
          </Text>
          <span
            aria-hidden
            className="h-1 w-1 shrink-0 rounded-full bg-current"
          />
          <AppRating
            value={Number(service.technicianRating)}
            readOnly
            size={12}
            caption={service.technicianRating}
            tone="inverted"
            className="shrink-0"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <Text variant={isHero ? "semibold-lg" : "semibold-sm-2"} as="span">
            {formatMoney(service.price)}
          </Text>
          {duration && (
            <Text variant="normal-xs" as="span" className="opacity-75">
              {duration}
            </Text>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <BookNowButton userRole={userRole} className="h-8 px-3 text-xs" />
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
