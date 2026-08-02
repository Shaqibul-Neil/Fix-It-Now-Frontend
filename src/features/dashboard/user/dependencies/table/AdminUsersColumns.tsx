"use client";

import type { ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionColumn,
  ContactColumn,
  StatusPill,
  Text,
  buildColumn,
} from "@/src/components";
import { formatDate } from "@/src/lib/utils/format.utils";
import type { IAdminUserRow } from "../types/user.types";
import { useAccountActions } from "./useAccountActions";

export const useAdminUsersColumns = (): {
  columns: ColumnDef<IAdminUserRow>[];
  modals: ReactNode;
} => {
  const account = useAccountActions<IAdminUserRow>((row) => ({
    userId: row.id,
    name: `${row.firstName} ${row.lastName}`,
    status: row.status,
    isDeleted: row.isDeleted,
  }));

  return {
    columns: [
      ContactColumn<IAdminUserRow>("user", "User", (row) => ({
        name: `${row.firstName} ${row.lastName}`,
        email: row.email,
        avatar: row.avatar,
      })),

      ...buildColumn<IAdminUserRow>([
        {
          key: "role",
          label: "Role",
          size: 130,
          render: (value: IAdminUserRow["role"]) => (
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-project-muted-foreground">
              {value.toLowerCase()}
            </span>
          ),
        },

        {
          key: "totalBookings",
          label: "Bookings",
          size: 110,
          render: (value: IAdminUserRow["totalBookings"]) => (
            <span className="font-semibold tabular-nums">{value}</span>
          ),
        },

        {
          id: "joined",
          label: "Joined",
          size: 160,
          render: (row: IAdminUserRow) => (
            <div className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap">
                {formatDate(row.createdAt)}
              </span>

              <Text
                variant="normal-xs"
                as="span"
                className="block whitespace-nowrap text-project-muted-foreground"
              >
                {row.lastLoginAt
                  ? `Seen ${formatDate(row.lastLoginAt)}`
                  : "Never signed in"}
              </Text>
            </div>
          ),
        },

        {
          id: "status",
          label: "Account",
          size: 140,
          render: (row: IAdminUserRow) => (
            <StatusPill status={row.isDeleted ? "DELETED" : row.status} />
          ),
        },
      ]),

      ActionColumn<IAdminUserRow>(
        // An admin account is managed nowhere on the platform — the backend
        // answers 403, so the row offers nothing.
        account.actions.map((action) => ({
          ...action,
          hidden: (row) =>
            row.role === "ADMIN" || Boolean(action.hidden?.(row)),
        })),
        { asDropdown: true, size: 90 },
      ),
    ],

    modals: account.modals,
  };
};
