import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { AppRating, Text } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import { getTechnicianPhoto } from "../constants/technician.photos";
import type { ITechnician } from "../types/technician.types";

const TechnicianListCard = ({
  technician,
  photoIndex,
}: {
  technician: ITechnician;
  photoIndex: number;
}) => {
  const fullName = `${technician.firstName} ${technician.lastName}`;

  return (
    <Link
      href={`/technicians/${technician.id}`}
      className="flex flex-col overflow-hidden border border-project-border bg-project-card"
    >
      <div className="relative aspect-square w-full">
        <Image
          src={getTechnicianPhoto(photoIndex)}
          alt={fullName}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Text variant="semibold-base" as="h3" truncate>
          {fullName}
        </Text>

        <Text
          variant="normal-xs"
          as="span"
          className="flex items-center gap-1 text-project-muted-foreground"
        >
          <MapPin className="size-3.5 shrink-0" />
          {technician.city}, {technician.area}
        </Text>

        <AppRating
          value={Math.round(Number(technician.averageRating))}
          readOnly
          size={13}
          caption={`${technician.averageRating} (${technician.totalReviews})`}
        />

        <div className="mt-auto flex items-center justify-between pt-2">
          <Text variant="semibold-sm-2" as="span" className="text-project-accent">
            {formatMoney(technician.hourlyRate)}/hr
          </Text>
          <Text variant="normal-xs" as="span" className="text-project-muted-foreground">
            {technician.experienceYears} yrs
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default TechnicianListCard;
