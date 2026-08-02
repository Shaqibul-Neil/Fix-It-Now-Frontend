import Image from "next/image";
import Link from "next/link";
import { MapPin, Zap } from "lucide-react";
import type { ReactNode } from "react";
import type { ITechnician } from "@/src/features/public/technician/dependencies/types/technician.types";
import { formatMoney } from "@/src/lib/utils/format.utils";
import { cn } from "@/src/lib/utils/cn";
import AppButton from "../buttons/AppButton";
import AppRating from "../inputs/AppRating";
import Text from "../texts/Text";

const MAX_SKILLS = 3;

const TONE = {
  card: "border-project-border bg-project-card hover:border-project-primary",
  panel: "border-transparent bg-project-panel text-project-panel-foreground",
} as const;

// The photo always leads; only a wide card moves it beside the copy.
const LAYOUT = {
  split: {
    article: "sm:grid-cols-[1fr_13rem] sm:gap-7",
    media: "order-first h-52 sm:order-last sm:h-auto",
  },
  stacked: { article: "sm:gap-5", media: "order-first h-44" },
} as const;

interface ITechnicianCardProps {
  technician: ITechnician;
  // The booking button is wired to auth state, so the caller supplies it.
  bookAction?: ReactNode;
  tone?: keyof typeof TONE;
  layout?: keyof typeof LAYOUT;
  className?: string;
  mediaClassName?: string;
}

const TechnicianCard = ({
  technician,
  bookAction,
  tone = "card",
  layout = "split",
  className,
  mediaClassName,
}: ITechnicianCardProps) => {
  const fullName = `${technician.firstName} ${technician.lastName}`;
  const isPanel = tone === "panel";

  return (
    <article
      className={cn(
        "grid gap-5 border p-5 transition-colors duration-300 sm:p-6",
        LAYOUT[layout].article,
        TONE[tone],
        className,
      )}
    >
      <div className="flex min-w-0 flex-col justify-center gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Link href={`/technicians/${technician.id}`} className="min-w-0">
              <Text
                variant="semibold-xl"
                as="h3"
                className={cn(
                  "wrap-break-word hover:text-project-primary",
                  isPanel ? "text-current" : "text-project-accent",
                )}
              >
                {fullName}
              </Text>
            </Link>

            {technician.offersEmergencyService && (
              <span className="flex items-center gap-1 border border-project-yellow/35 bg-project-yellow/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-project-yellow">
                <Zap className="size-3" />
                Emergency
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {technician.professionalTitle && (
              <Text
                variant="normal-sm"
                as="span"
                className={
                  isPanel ? "text-project-panel-primary" : "text-project-primary"
                }
              >
                {technician.professionalTitle}
              </Text>
            )}

            <Text
              variant="normal-sm"
              as="span"
              className={cn(
                "flex items-center gap-1.5",
                isPanel ? "opacity-70" : "text-project-muted-foreground",
              )}
            >
              <MapPin className="size-3.5 shrink-0" />
              {technician.area}, {technician.city}
            </Text>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <AppRating
            value={Number(technician.averageRating)}
            readOnly
            size={14}
            caption={`${technician.averageRating} (${technician.totalReviews} reviews)`}
            className={isPanel ? "w-fit bg-project-card px-2.5 py-1.5" : ""}
          />

          <Text
            variant="normal-sm"
            as="span"
            className={
              isPanel ? "opacity-70" : "text-project-muted-foreground"
            }
          >
            {technician.experienceYears} yrs experience
          </Text>

          <Text
            variant="semibold-sm-2"
            as="span"
            className={isPanel ? "text-current" : "text-project-accent"}
          >
            {formatMoney(technician.hourlyRate)}/hr
          </Text>
        </div>

        <Text
          variant="normal-sm"
          as="p"
          className={cn(
            "line-clamp-2 leading-relaxed",
            isPanel ? "opacity-80" : "text-project-muted-foreground",
          )}
        >
          {technician.bio}
        </Text>

        {technician.skills.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {technician.skills.slice(0, MAX_SKILLS).map((skill) => (
              <li
                key={skill}
                className={cn(
                  "border px-2.5 py-1 text-xs font-medium",
                  isPanel
                    ? "border-current/15 bg-current/5"
                    : "border-project-border bg-project-muted/50 text-project-muted-foreground",
                )}
              >
                {skill}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-0.5">
          <AppButton
            text="View profile"
            href={`/technicians/${technician.id}`}
            variant={isPanel ? "outline" : "primary"}
            className={
              isPanel
                ? "border-current/25 bg-transparent text-current hover:border-current hover:bg-current/10"
                : ""
            }
          />

          {bookAction}
        </div>
      </div>

      <Link
        href={`/technicians/${technician.id}`}
        className={cn(
          "relative w-full overflow-hidden",
          LAYOUT[layout].media,
          mediaClassName,
        )}
      >
        {technician.avatar ? (
          <Image
            src={technician.avatar}
            alt={fullName}
            fill
            unoptimized
            sizes="(min-width: 640px) 20rem, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <span className="flex h-full items-center justify-center bg-project-muted-primary text-2xl font-semibold text-project-primary">
            {technician.firstName[0]}
            {technician.lastName[0]}
          </span>
        )}

        {technician.isFeatured && (
          <span className="absolute right-0 top-0 bg-project-primary px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-project-primary-foreground">
            Featured
          </span>
        )}
      </Link>
    </article>
  );
};

export default TechnicianCard;
