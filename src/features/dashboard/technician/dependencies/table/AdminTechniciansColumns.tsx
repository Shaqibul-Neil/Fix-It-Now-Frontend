"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, ShieldCheck } from "lucide-react";
import {
  ActionColumn,
  ContactColumn,
  StatusPill,
  Text,
  buildColumn,
} from "@/src/components";
import { formatDate, formatMoney } from "@/src/lib/utils/format.utils";
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

  return {
    columns: [
      ContactColumn<IAdminTechnicianRow>(
        "technician",
        "Technician",
        (row) => ({
          name: `${row.firstName} ${row.lastName}`,
          email: row.email,
          phone: row.phone,
        }),
      ),

      ...buildColumn<IAdminTechnicianRow>([
        {
          id: "location",
          label: "Location",
          size: 180,
          render: (row: IAdminTechnicianRow) => (
            <div className="min-w-0 leading-tight">
              <span className="block truncate font-medium">{row.city}</span>

              <Text
                variant="normal-xs"
                as="span"
                className="block truncate text-project-muted-foreground"
              >
                {row.area}
              </Text>
            </div>
          ),
        },

        {
          id: "experience",
          label: "Experience",
          size: 150,
          render: (row: IAdminTechnicianRow) => (
            <div className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap font-medium">
                {row.experienceYears} yrs
              </span>

              <Text
                variant="normal-xs"
                as="span"
                className="block whitespace-nowrap text-project-muted-foreground"
              >
                {formatMoney(row.hourlyRate)}/hr
              </Text>
            </div>
          ),
        },

        {
          id: "rating",
          label: "Rating",
          size: 130,
          render: (row: IAdminTechnicianRow) => (
            <div className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap font-medium tabular-nums">
                ★ {row.averageRating}
              </span>

              <Text
                variant="normal-xs"
                as="span"
                className="block whitespace-nowrap text-project-muted-foreground"
              >
                {row.totalReviews} reviews
              </Text>
            </div>
          ),
        },

        {
          key: "completedJobs",
          label: "Jobs",
          size: 100,
          render: (value) => (
            <span className="font-semibold tabular-nums">{String(value)}</span>
          ),
        },

        {
          id: "approvalStatus",
          label: "Application",
          size: 150,
          render: (row: IAdminTechnicianRow) => (
            <StatusPill status={row.approvalStatus} />
          ),
        },

        {
          id: "appliedAt",
          label: "Applied",
          size: 140,
          render: (row: IAdminTechnicianRow) => (
            <div className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap">
                {formatDate(row.appliedAt)}
              </span>

              <Text
                variant="normal-xs"
                as="span"
                className="block whitespace-nowrap text-project-muted-foreground"
              >
                {row.reviewedAt
                  ? `Reviewed ${formatDate(row.reviewedAt)}`
                  : "Not reviewed"}
              </Text>
            </div>
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
            icon: ShieldCheck,
            label: "Review application",
            variant: "primary",
            onClick: (row) =>
              setReviewTarget({
                id: row.id,
                name: `${row.firstName} ${row.lastName}`,
                approvalStatus: row.approvalStatus,
              }),
          },
        ],
        { asDropdown: true, size: 90 },
      ),
    ],

    modals: (
      <TechnicianApprovalModal
        target={reviewTarget}
        onClose={() => setReviewTarget(null)}
      />
    ),
  };
};
