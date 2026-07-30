import type { ReactNode } from "react";
import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

export interface IDetailsMetaItem {
  label: string;
  value: ReactNode;
}

interface IDetailsHeaderProps {
  title?: string;
  name: string;
  status?: ReactNode;
  metaItems?: IDetailsMetaItem[];
  renderActions?: ReactNode;
  className?: string;
}

const DetailsHeader = ({
  title,
  name,
  status,
  metaItems,
  renderActions,
  className,
}: IDetailsHeaderProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-project-border bg-project-card p-6 pl-7",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-0.5 bg-project-primary"
      />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-3">
          {title && (
            <Text
              variant="medium-xs"
              as="span"
              className="block uppercase tracking-[0.16em] text-project-muted-foreground"
            >
              {title}
            </Text>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Text
              variant="semibold-2xl"
              as="h1"
              className="wrap-break-word text-project-accent"
            >
              {name}
            </Text>

            {status}
          </div>

          {metaItems && metaItems.length > 0 && (
            <dl className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {metaItems.map((item) => (
                <div key={item.label} className="flex items-baseline gap-2">
                  <dt className="text-xs uppercase tracking-[0.14em] text-project-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-medium text-project-foreground">
                    {item.value ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {renderActions && (
          <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
            {renderActions}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsHeader;
