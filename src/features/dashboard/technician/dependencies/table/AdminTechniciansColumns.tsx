"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, ShieldCheck } from "lucide-react";
import {
  ActionColumn,
  AppRating,
  ContactColumn,
  StatusPill,
  Text,
  buildColumn,
} from "@/src/components";
import { useAccountActions } from "@/src/features/dashboard/user/dependencies/table/useAccountActions";
import { formatMoney } from "@/src/lib/utils/format.utils";
import TechnicianApprovalModal from "../components/TechnicianApprovalModal";
import type {
  IAdminTechnicianRow,
  ITechnicianApprovalTarget,
} from "../types/technician.types";

export const useAdminTechniciansColumns = (): {
  columns: ColumnDef<IAdminTechnicianRow>[];
  modals: ReactNode;
} => {
  const router = useRouter();
  const [reviewTarget, setReviewTarget] =
    useState<ITechnicianApprovalTarget | null>(null);

  const account = useAccountActions<IAdminTechnicianRow>(
    (row) => ({
      userId: row.userId,
      name: `${row.firstName} ${row.lastName}`,
      status: row.accountStatus,
      isDeleted: row.isDeleted,
    }),
    "technician",
  );

  return {
    columns: [
      ContactColumn<IAdminTechnicianRow>("technician", "Technician", (row) => ({
        name: `${row.firstName} ${row.lastName}`,
        email: row.email,
        avatar: row.avatar,
      })),

      ...buildColumn<IAdminTechnicianRow>([
        {
          key: "phone",
          label: "Phone",
          size: 140,
          render: (value) => (
            <span className="whitespace-nowrap">{String(value)}</span>
          ),
        },

        {
          id: "location",
          label: "Location",
          size: 160,
          render: (row: IAdminTechnicianRow) => (
            <div className="min-w-0 leading-tight">
              <span className="block truncate font-medium">{row.area}</span>

              <Text
                variant="normal-xs"
                as="span"
                className="block truncate text-project-muted-foreground"
              >
                {row.city}
              </Text>
            </div>
          ),
        },

        {
          key: "experienceYears",
          label: "Experience",
          size: 120,
          render: (value) => (
            <span className="whitespace-nowrap font-medium">{`${value} yrs`}</span>
          ),
        },

        {
          key: "hourlyRate",
          label: "Rate",
          size: 120,
          render: (value) => (
            <span className="whitespace-nowrap font-semibold tabular-nums">
              {`${formatMoney(value as string)}/hr`}
            </span>
          ),
        },

        {
          id: "rating",
          label: "Rating",
          size: 150,
          render: (row: IAdminTechnicianRow) => (
            <div className="min-w-0 leading-tight">
              <AppRating
                value={Number(row.averageRating)}
                readOnly
                size={13}
                caption={row.averageRating}
              />

              <Text
                variant="normal-xs"
                as="span"
                className="block whitespace-nowrap text-project-muted-foreground"
              >
                {`${row.totalReviews} reviews`}
              </Text>
            </div>
          ),
        },

        {
          key: "completedJobs",
          label: "Jobs",
          size: 90,
          render: (value) => (
            <span className="font-semibold tabular-nums">{String(value)}</span>
          ),
        },

        {
          // Applied and reviewed dates live on the details page — the list only
          // answers where the application stands.
          id: "approvalStatus",
          label: "Application",
          size: 140,
          render: (row: IAdminTechnicianRow) => (
            <StatusPill status={row.approvalStatus} />
          ),
        },

        {
          id: "accountStatus",
          label: "Account",
          size: 140,
          render: (row: IAdminTechnicianRow) => (
            <StatusPill
              status={row.isDeleted ? "DELETED" : row.accountStatus}
            />
          ),
        },
      ]),

      ActionColumn<IAdminTechnicianRow>(
        [
          {
            icon: Eye,
            label: "View details",
            variant: "noOutline",
            onClick: (row) =>
              router.push(`/dashboard/admin/technicians/${row.id}`),
          },
          {
            // An approved application is closed — from there the account is
            // banned, not re-decided, and the backend answers 409 either way.
            icon: ShieldCheck,
            label: "Review application",
            variant: "primary",
            hidden: (row) => row.isDeleted || row.approvalStatus === "APPROVED",
            onClick: (row) =>
              setReviewTarget({
                id: row.id,
                name: `${row.firstName} ${row.lastName}`,
                approvalStatus: row.approvalStatus,
              }),
          },
          // While an application is pending, reviewing it is the only account
          // action offered — a ban or a removal comes after the decision.
          ...account.actions.map((action) => ({
            ...action,
            hidden: (row: IAdminTechnicianRow) =>
              (row.approvalStatus === "PENDING" && !row.isDeleted) ||
              Boolean(action.hidden?.(row)),
          })),
        ],
        { asDropdown: true, size: 90 },
      ),
    ],

    modals: (
      <>
        <TechnicianApprovalModal
          target={reviewTarget}
          onClose={() => setReviewTarget(null)}
        />

        {account.modals}
      </>
    ),
  };
};
