import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils/cn";
import AppAvatar from "../cards/AppAvatar";
import Text from "../texts/Text";

export interface IProfileStat {
  label: string;
  value: ReactNode;
}

interface IProfileHeroProps {
  eyebrow?: string;
  name: string;
  subtitle?: ReactNode;
  avatar?: string | null;
  badges?: ReactNode;
  stats?: IProfileStat[];
  actions?: ReactNode;
  className?: string;
}

// The opening block of a profile page — a person, not a record, so the portrait
// leads and the numbers run along the bottom edge.
const ProfileHero = ({
  eyebrow,
  name,
  subtitle,
  avatar,
  badges,
  stats,
  actions,
  className,
}: IProfileHeroProps) => {
  return (
    <div
      className={cn(
        "relative border border-project-border bg-project-card",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-project-primary"
      />

      <div className="flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <AppAvatar
              src={avatar}
              name={name}
              className="size-28 md:size-32"
            />

            {/* Offset frame — the portrait reads as placed, not pasted in. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -bottom-2 size-28 border border-project-primary md:size-32"
            />
          </div>

          <div className="min-w-0 space-y-3">
            {eyebrow && (
              <Text
                variant="medium-xs"
                as="span"
                className="block uppercase tracking-[0.24em] text-project-primary"
              >
                {eyebrow}
              </Text>
            )}

            <Text
              variant="semibold-2xl"
              as="h1"
              className="wrap-break-word text-3xl leading-tight text-project-accent md:text-4xl"
            >
              {name}
            </Text>

            {subtitle && (
              <div className="text-sm text-project-muted-foreground">
                {subtitle}
              </div>
            )}

            {badges && (
              <div className="flex flex-wrap items-center gap-2">{badges}</div>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
            {actions}
          </div>
        )}
      </div>

      {stats && stats.length > 0 && (
        <dl className="grid grid-cols-2 border-t border-project-border md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 border-project-border px-6 py-5 not-last:border-r [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r"
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-project-muted-foreground">
                {stat.label}
              </dt>

              <dd className="mt-2 truncate text-xl font-semibold tabular-nums text-project-accent">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};

export default ProfileHero;
