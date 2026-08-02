import Image from "next/image";
import { AppRating, Text } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import {
  getCategoryPhoto,
  toCategorySlug,
} from "@/src/features/dashboard/category/dependencies/constants/category.photos";
import BookNowButton from "@/src/features/public/home/dependencies/components/BookNowButton";
import type { IPublicServiceRow } from "@/src/features/public/service/dependencies/types/service.types";
import type { TUserRole } from "@/src/lib/auth/auth.roles";

const ServiceListCard = ({
  service,
  userRole,
}: {
  service: IPublicServiceRow;
  userRole?: TUserRole;
}) => {
  return (
    <div className="flex flex-col overflow-hidden border border-project-border bg-project-card">
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

        <Text
          variant="normal-xs"
          as="span"
          className="text-project-muted-foreground"
        >
          {service.technicianName}
        </Text>

        <AppRating
          value={Number(service.technicianRating)}
          readOnly
          size={13}
          caption={service.technicianRating}
        />

        <div className="flex items-center justify-between pt-2">
          <Text
            variant="semibold-sm-2"
            as="span"
            className="text-project-accent"
          >
            {formatMoney(service.price)}
          </Text>
          {service.estimatedDuration && (
            <Text
              variant="normal-xs"
              as="span"
              className="text-project-muted-foreground"
            >
              {service.estimatedDuration} min
            </Text>
          )}
        </div>
      </div>

      <div className="px-4 pb-4">
        <BookNowButton
          userRole={userRole}
          text="Book this service"
          className="h-8 w-full px-3 text-xs"
        />
      </div>
    </div>
  );
};

export default ServiceListCard;
