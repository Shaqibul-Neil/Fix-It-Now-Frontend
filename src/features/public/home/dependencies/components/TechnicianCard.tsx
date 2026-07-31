import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { AppRating, Text } from "@/src/components";
import { formatMoney } from "@/src/lib/utils/format.utils";
import { getTechnicianPhoto } from "@/src/features/public/technician/dependencies/constants/technician.photos";
import type { ITechnician } from "@/src/features/public/technician/dependencies/types/technician.types";

const TechnicianCard = ({
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
      className="group block aspect-3/4 perspective-[1400px]"
    >
      <div className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front — photo + name only */}
        <div className="absolute inset-0 overflow-hidden border border-project-border [backface-visibility:hidden]">
          <Image
            src={getTechnicianPhoto(photoIndex)}
            alt={fullName}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            quality={90}
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <Text variant="semibold-base" as="p" className="text-white">
              {fullName}
            </Text>
            <Text variant="normal-xs" as="span" className="text-white/70">
              {technician.city}, {technician.area}
            </Text>
          </div>
        </div>

        {/* Back — the rest of the info */}
        <div className="absolute inset-0 flex flex-col justify-center gap-2 border border-project-border bg-project-card p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Text variant="semibold-base" as="p" className="text-project-accent">
            {fullName}
          </Text>

          <AppRating
            value={Math.round(Number(technician.averageRating))}
            readOnly
            size={13}
            caption={`${technician.averageRating} (${technician.totalReviews})`}
          />

          <div className="space-y-1">
            <Text
              variant="normal-xs"
              as="p"
              className="flex items-center gap-1.5 text-project-muted-foreground"
            >
              <MapPin className="size-3.5 shrink-0" />
              {technician.city}, {technician.area}
            </Text>

            <Text variant="normal-xs" as="p" className="text-project-muted-foreground">
              {technician.experienceYears} yrs experience
            </Text>

            <Text variant="semibold-sm-2" as="p" className="text-project-primary">
              {formatMoney(technician.hourlyRate)}/hr
            </Text>
          </div>

          <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-project-primary">
            View profile
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TechnicianCard;
