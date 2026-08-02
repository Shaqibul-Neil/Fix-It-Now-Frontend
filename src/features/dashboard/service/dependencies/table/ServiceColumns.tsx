import type { ColumnDef } from "@tanstack/react-table";
import {
  AppAvatar,
  AppRating,
  StatusPill,
  Text,
  buildColumn,
} from "@/src/components";
import { formatDate, formatMoney } from "@/src/lib/utils/format.utils";
import type {
  IBaseServiceRow,
  IServiceAbout,
  IServiceRecordState,
  ITechnicianInfo,
} from "../types/service.types";

export const serviceBaseColumns = <TRow extends IBaseServiceRow>() =>
  buildColumn<IBaseServiceRow>([
    {
      id: "service",
      label: "Service",
      size: 280,
      render: (row: IBaseServiceRow) => (
        <div className="flex min-w-0 items-center gap-3">
          <AppAvatar
            src={row.categoryImage}
            name={row.category}
            className="size-10 shrink-0"
          />

          <div className="min-w-0 leading-tight">
            <span className="block truncate font-medium">{row.title}</span>

            <Text
              variant="normal-xs"
              as="span"
              className="block truncate text-project-muted-foreground"
            >
              {row.category}
            </Text>
          </div>
        </div>
      ),
    },

    {
      id: "price",
      label: "Price",
      size: 110,
      render: (row: IBaseServiceRow) => (
        <span className="font-semibold tabular-nums">
          {formatMoney(row.price)}
        </span>
      ),
    },

    {
      id: "estimatedDuration",
      label: "Duration",
      size: 110,
      render: (row: IBaseServiceRow) => (
        <span className="whitespace-nowrap">
          {row.estimatedDuration ? `${row.estimatedDuration} min` : "—"}
        </span>
      ),
    },

    {
      id: "createdAt",
      label: "Created",
      size: 150,
      render: (row: IBaseServiceRow) => (
        <div className="min-w-0 leading-tight">
          <span className="block whitespace-nowrap">
            {formatDate(row.createdAt)}
          </span>

          <Text
            variant="normal-xs"
            as="span"
            className="block whitespace-nowrap text-project-muted-foreground"
          >
            {`Updated ${formatDate(row.updatedAt)}`}
          </Text>
        </div>
      ),
    },
  ]) as ColumnDef<TRow>[];

// Kept out of the base set: the admin list mapper drops `description`, so only
// the lists that still receive it ask for this column.
export const serviceAboutColumn = <TRow extends IServiceAbout>() =>
  buildColumn<IServiceAbout>([
    {
      id: "description",
      label: "About",
      size: 320,
      render: (row: IServiceAbout) => (
        <span className="line-clamp-2 truncate text-project-muted-foreground">
          {row.description ?? "—"}
        </span>
      ),
    },
  ])[0] as ColumnDef<TRow>;

export const technicianRatingColumn = <TRow extends ITechnicianInfo>() =>
  buildColumn<ITechnicianInfo>([
    {
      id: "technicianRating",
      label: "Rating",
      size: 140,
      render: (row: ITechnicianInfo) => (
        <AppRating
          value={Number(row.technicianRating)}
          readOnly
          size={13}
          caption={row.technicianRating}
        />
      ),
    },
  ])[0] as ColumnDef<TRow>;

// The "all" and "deleted" tabs list removed rows, so the pill names who took it down.
export const serviceStatusColumn = <TRow extends IServiceRecordState>() =>
  buildColumn<IServiceRecordState>([
    {
      id: "status",
      label: "Status",
      size: 170,
      render: (row: IServiceRecordState) => (
        <div className="flex min-w-0 flex-col items-start gap-1">
          <StatusPill
            status={
              row.isDeleted ? "DELETED" : row.isActive ? "ACTIVE" : "PAUSED"
            }
          />

          {row.removedBy && (
            <Text
              variant="normal-xs"
              as="span"
              className="block truncate text-project-muted-foreground"
            >
              {`by ${row.removedBy.name}`}
            </Text>
          )}
        </div>
      ),
    },
  ])[0] as ColumnDef<TRow>;
