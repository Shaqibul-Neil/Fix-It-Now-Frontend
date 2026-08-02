"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, ShieldCheck, Star, StarOff } from "lucide-react";
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
import { useUpdateFeaturedMutation } from "../hooks/useTechnicianMutation";
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
  const { mutate: updateFeatured, isPending: isFeaturing } =
    useUpdateFeaturedMutation();

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
        badge: row.isFeatured ? (
          <Star
            aria-label="Featured"
            className="size-3.5 shrink-0 fill-project-primary text-project-primary"
          />
        ) : null,
      })),

      ...buildColumn<IAdminTechnicianRow>([
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
            // Only an approved technician may lead the public list.
            icon: Star,
            label: "Feature on home",
            variant: "primary",
            disabled: isFeaturing,
            hidden: (row) =>
              row.isDeleted ||
              row.isFeatured ||
              row.approvalStatus !== "APPROVED",
            onClick: (row) => updateFeatured({ id: row.id, isFeatured: true }),
          },
          {
            icon: StarOff,
            label: "Remove from home",
            disabled: isFeaturing,
            hidden: (row) => row.isDeleted || !row.isFeatured,
            onClick: (row) => updateFeatured({ id: row.id, isFeatured: false }),
          },
          {
            // An approved application is closed — the account is banned instead.
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
