"use client";

import { useState, type ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import {
  ActionColumn,
  ConfirmModal,
  StatusPill,
  Text,
  buildColumn,
} from "@/src/components";
import { formatDate } from "@/src/lib/utils/format.utils";
import CategoryFormPanel from "../components/CategoryFormPanel";
import { useDeleteCategoryMutation } from "../hooks/useCategoryMutation";
import type {
  ICategory,
  ICategoryFormTarget,
} from "../types/category.types";

export const useAdminCategoriesColumns = (): {
  columns: ColumnDef<ICategory>[];
  modals: ReactNode;
  openCreate: () => void;
} => {
  const [formTarget, setFormTarget] = useState<ICategoryFormTarget | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<ICategory | null>(null);
  const deleteCategory = useDeleteCategoryMutation(() => setDeleteTarget(null));

  return {
    columns: [
      ...buildColumn<ICategory>([
        {
          id: "category",
          label: "Category",
          size: 260,
          render: (row: ICategory) => (
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
          ),
        },

        {
          id: "description",
          label: "About",
          size: 360,
          render: (row: ICategory) => (
            <span className="line-clamp-2 truncate text-project-muted-foreground">
              {row.description ?? "—"}
            </span>
          ),
        },

        {
          id: "status",
          label: "Status",
          size: 130,
          render: (row: ICategory) => (
            <StatusPill status={row.isActive ? "ACTIVE" : "INACTIVE"} />
          ),
        },

        {
          id: "createdAt",
          label: "Created At",
          size: 130,
          render: (row: ICategory) => (
            <span className="whitespace-nowrap">{formatDate(row.createdAt)}</span>
          ),
        },

        {
          id: "updatedAt",
          label: "Updated At",
          size: 130,
          render: (row: ICategory) => (
            <span className="whitespace-nowrap">{formatDate(row.updatedAt)}</span>
          ),
        },
      ]),

      ActionColumn<ICategory>(
        [
          {
            icon: Pencil,
            label: "Edit category",
            variant: "noOutline",
            onClick: (row) => setFormTarget(row),
          },
          {
            icon: Trash,
            label: "Delete category",
            variant: "destructive",
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
          description="This cannot be undone. Categories with services attached cannot be deleted."
          entityName={deleteTarget?.name}
          confirmText="Yes, delete it"
          isPending={deleteCategory.isPending}
          onConfirm={() =>
            deleteTarget && deleteCategory.mutate(deleteTarget.id)
          }
        />
      </>
    ),

    openCreate: () => setFormTarget({}),
  };
};
