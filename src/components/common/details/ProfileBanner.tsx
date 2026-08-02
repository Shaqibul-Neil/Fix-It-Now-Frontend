import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils/cn";
import AppAvatar from "../cards/AppAvatar";
import Text from "../texts/Text";

export interface IProfileMetaItem {
  icon?: LucideIcon;
  label: string;
  value: ReactNode;
}

export interface IProfileStatItem {
  label: string;
  value: ReactNode;
}

interface IProfileBannerProps {
  name: string;
  title?: string | null;
  eyebrow?: string;
  avatar?: string | null;
  coverImage?: string | null;
  badges?: ReactNode;
  metaItems?: IProfileMetaItem[];
  stats?: IProfileStatItem[];
  actions?: ReactNode;
  className?: string;
}

// Cover photo, portrait and headline facts — the top of any profile page.
const ProfileBanner = ({
  name,
  title,
  eyebrow,
  avatar,
  coverImage,
  badges,
  metaItems,
  stats,
  actions,
  className,
}: IProfileBannerProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden border border-project-border bg-project-card",
        className,
      )}
    >
      <div className="relative h-36 w-full bg-project-aside sm:h-48">
        {coverImage ? (
          <Image
            src={coverImage}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[48px_48px] text-project-aside-foreground"
          />
        )}

        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent"
        />
      </div>

      <div className="px-5 pb-6 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
            <AppAvatar
              src={avatar}
              name={name}
              className="-mt-12 size-24 shrink-0 rounded-full border-4 border-project-card sm:-mt-14 sm:size-28"
            />

            <div className="min-w-0 space-y-1 sm:pb-1 mt-2">
              {eyebrow && (
                <Text
                  variant="medium-xs"
                  as="span"
                  className="block uppercase tracking-[0.24em] text-project-primary"
                >
                  {eyebrow}
                </Text>
              )}

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Text
                  variant="semibold-2xl"
                  as="h1"
                  className="wrap-break-word text-project-accent"
                >
                  {name}
                </Text>

                {badges}
              </div>

              {title && (
                <Text
                  variant="normal-sm"
                  as="p"
                  className="text-project-muted-foreground"
                >
                  {title}
                </Text>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex flex-wrap items-center gap-3 lg:shrink-0 lg:pb-1">
              {actions}
            </div>
          )}
        </div>

        {metaItems && metaItems.length > 0 && (
          <dl className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-project-border pt-5">
            {metaItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex min-w-0 items-center gap-2">
                {Icon && (
                  <Icon className="size-4 shrink-0 text-project-primary" />
                )}
                <dt className="sr-only">{label}</dt>
                <dd className="truncate text-sm font-medium text-project-foreground">
                  {value ?? "—"}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {stats && stats.length > 0 && (
        <dl className="grid grid-cols-2 border-t border-project-border md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 border-project-border px-5 py-4 not-last:border-r nth-[2n]:border-r-0 md:nth-[2n]:border-r"
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-project-muted-foreground">
                {stat.label}
              </dt>

              <dd className="mt-1.5 truncate text-lg font-semibold tabular-nums text-project-accent">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};

export default ProfileBanner;
