import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils/cn";
import Text from "../texts/Text";

type TTone = "success" | "warning" | "danger";

const ICON_STYLE: Record<TTone, string> = {
  success: "border-project-success/30 bg-project-success/10 text-project-success",
  warning: "border-project-yellow/35 bg-project-yellow/10 text-project-yellow",
  danger:
    "border-project-destructive/30 bg-project-destructive/10 text-project-destructive",
};

const RAIL_STYLE: Record<TTone, string> = {
  success: "bg-project-success",
  warning: "bg-project-yellow",
  danger: "bg-project-destructive",
};

interface IResultStateProps {
  tone: TTone;
  icon: LucideIcon;
  title: string;
  titleAs?: "h1" | "h2" | "h3";
  description?: string;
  meta?: { label: string; value: ReactNode }[];
  actions?: ReactNode;
  className?: string;
}

const ResultState = ({
  tone,
  icon: Icon,
  title,
  titleAs = "h1",
  description,
  meta,
  actions,
  className,
}: IResultStateProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-project-border bg-project-card p-8 text-center sm:p-10",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-0.5", RAIL_STYLE[tone])}
      />

      <div
        className={cn(
          "mx-auto flex size-14 items-center justify-center border",
          ICON_STYLE[tone],
        )}
      >
        <Icon size={26} />
      </div>

      <Text
        variant="semibold-2xl"
        as={titleAs}
        className="mt-6 text-project-accent"
      >
        {title}
      </Text>

      {description && (
        <Text
          variant="normal-sm"
          as="p"
          className="mx-auto mt-3 max-w-prose text-project-muted-foreground"
        >
          {description}
        </Text>
      )}

      {meta && meta.length > 0 && (
        <dl className="mt-6 flex flex-col items-center gap-2">
          {meta.map((item) => (
            <div
              key={item.label}
              className="flex max-w-full flex-wrap items-baseline justify-center gap-2"
            >
              <dt className="text-xs uppercase tracking-[0.14em] text-project-muted-foreground">
                {item.label}
              </dt>
              <dd className="wrap-break-word text-sm font-medium text-project-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {actions && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default ResultState;
