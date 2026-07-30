import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils/cn";

export interface IInfoItem {
  label: string;
  value: ReactNode;
  className?: string;
}

const COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

interface IInfoListProps {
  items: IInfoItem[];
  columns?: keyof typeof COLUMNS;
  className?: string;
}

const isBlank = (value: ReactNode) =>
  value === null || value === undefined || value === "";

const InfoList = ({ items, columns = 2, className }: IInfoListProps) => {
  return (
    <dl className={cn("grid gap-x-6 gap-y-5", COLUMNS[columns], className)}>
      {items.map((item) => (
        <div key={item.label} className={cn("min-w-0", item.className)}>
          <dt className="text-xs uppercase tracking-[0.14em] text-project-muted-foreground">
            {item.label}
          </dt>

          <dd className="mt-1.5 wrap-break-word text-sm font-medium text-project-foreground">
            {isBlank(item.value) ? "—" : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default InfoList;
