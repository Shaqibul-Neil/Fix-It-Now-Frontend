"use client";

import { useState, type ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, RotateCcw, Trash } from "lucide-react";
import {
  ActionColumn,
  AppAvatar,
  ConfirmModal,
  StatusPill,
  Text,
  buildColumn,
} from "@/src/components";
import { formatDate } from "@/src/lib/utils/format.utils";
import CategoryFormPanel from "../components/CategoryFormPanel";
import {
  useDeleteCategoryMutation,
  useRestoreCategoryMutation,
} from "../hooks/useCategoryMutation";
import type {
  IAdminCategoryRow,
  ICategoryFormTarget,
} from "../types/category.types";

export const useAdminCategoriesColumns = (): {
  columns: ColumnDef<IAdminCategoryRow>[];
  modals: ReactNode;
  openCreate: () => void;
} => {
  const [formTarget, setFormTarget] = useState<ICategoryFormTarget | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<IAdminCategoryRow | null>(
    null,
  );
  const [restoreTarget, setRestoreTarget] = useState<IAdminCategoryRow | null>(
    null,
  );

  const deleteCategory = useDeleteCategoryMutation(() => setDeleteTarget(null));
  const restoreCategory = useRestoreCategoryMutation(() =>
    setRestoreTarget(null),
  );

  return {
    columns: [
      ...buildColumn<IAdminCategoryRow>([
        {
          id: "category",
          label: "Category",
          size: 280,
          render: (row: IAdminCategoryRow) => (
            <div className="flex min-w-0 items-center gap-3">
              <AppAvatar
                src={row.image}
                name={row.name}
                className="size-10 shrink-0"
              />

              <div className="min-w-0 leading-tight">
                <span className="block truncate font-medium">{row.name}</span>

                <Text
                  variant="normal-xs"
                  as="span"
                  className="block truncate text-project-muted-foreground"
                >
                  {row.slug}
                </Text>
              </div>
            </div>
          ),
        },

        {
          id: "description",
          label: "About",
          size: 320,
          render: (row: IAdminCategoryRow) => (
            <span className="line-clamp-2 text-project-muted-foreground truncate">
              {row.description ?? "—"}
            </span>
          ),
        },

        {
          id: "totalServices",
          label: "Services",
          size: 110,
          render: (row: IAdminCategoryRow) => (
            <span className="font-semibold tabular-nums">
              {row.totalServices}
            </span>
          ),
        },

        {
          id: "status",
          label: "Status",
          size: 140,
          render: (row: IAdminCategoryRow) => (
            <StatusPill
              status={
                row.isDeleted ? "DELETED" : row.isActive ? "ACTIVE" : "INACTIVE"
              }
            />
          ),
        },

        {
          id: "createdAt",
          label: "Created",
          size: 150,
          render: (row: IAdminCategoryRow) => (
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
      ]),

      ActionColumn<IAdminCategoryRow>(
        [
          {
            icon: Pencil,
            label: "Edit category",
            variant: "noOutline",
            hidden: (row) => row.isDeleted,
            onClick: (row) => setFormTarget(row),
          },
          {
            icon: RotateCcw,
            label: "Restore category",
            variant: "primary",
            hidden: (row) => !row.isDeleted,
            onClick: (row) => setRestoreTarget(row),
          },
          {
            icon: Trash,
            label: "Delete category",
            variant: "destructive",
            hidden: (row) => row.isDeleted,
            onClick: (row) => setDeleteTarget(row),
          },
        ],
        {
          asDropdown: true,
          size: 90,
        },
      ),
    ],

    modals: (
      <>
        <CategoryFormPanel
          target={formTarget}
          onClose={() => setFormTarget(null)}
        />

        <ConfirmModal
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          mode="cancel"
          title="Delete this category?"
          description="Its services stay untouched, but they stop showing to customers until the category is restored."
          entityName={deleteTarget?.name}
          confirmText="Yes, delete it"
          isPending={deleteCategory.isPending}
          onConfirm={() =>
            deleteTarget && deleteCategory.mutate(deleteTarget.id)
          }
        />

        <ConfirmModal
          isOpen={Boolean(restoreTarget)}
          onClose={() => setRestoreTarget(null)}
          mode="approve"
          title="Restore this category?"
          description="Everything filed under it becomes visible again."
          entityName={restoreTarget?.name}
          confirmText="Yes, restore it"
          isPending={restoreCategory.isPending}
          onConfirm={() =>
            restoreTarget && restoreCategory.mutate(restoreTarget.id)
          }
        />
      </>
    ),

    openCreate: () => setFormTarget({}),
  };
};
