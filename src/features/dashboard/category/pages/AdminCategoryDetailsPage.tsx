"use client";

import { useState } from "react";
import { Pencil, RotateCcw, Trash } from "lucide-react";
import {
  AppAvatar,
  AppButton,
  AppError,
  ConfirmModal,
  DetailsHeader,
  DetailsSection,
  DetailsSkeleton,
  InfoList,
  StatusPill,
} from "@/src/components";
import { formatDateTime } from "@/src/lib/utils/format.utils";
import CategoryFormPanel from "../dependencies/components/CategoryFormPanel";
import {
  useDeleteCategoryMutation,
  useRestoreCategoryMutation,
} from "../dependencies/hooks/useCategoryMutation";
import { useAdminCategoryDetailsQuery } from "../dependencies/hooks/useCategoryQuery";
import type { ICategoryFormTarget } from "../dependencies/types/category.types";

const AdminCategoryDetailsPage = ({ id }: { id: string }) => {
  const { data, isPending, isError, error } = useAdminCategoryDetailsQuery(id);
  const [formTarget, setFormTarget] = useState<ICategoryFormTarget | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const deleteCategory = useDeleteCategoryMutation(() => setIsDeleting(false));
  const restoreCategory = useRestoreCategoryMutation(() =>
    setIsRestoring(false),
  );

  if (isPending) return <DetailsSkeleton />;
  if (isError || !data) return <AppError message={error?.message} />;

  return (
    <section className="flex flex-col gap-4">
      <DetailsHeader
        title="Category"
        name={data.name}
        status={
          <StatusPill
            status={
              data.isDeleted ? "DELETED" : data.isActive ? "ACTIVE" : "PAUSED"
            }
          />
        }
        metaItems={[
          { label: "Slug", value: data.slug },
          { label: "Services", value: data.totalServices },
          { label: "Created", value: formatDateTime(data.createdAt) },
        ]}
        renderActions={
          data.isDeleted ? (
            <AppButton
              text="Restore category"
              leftIcon={RotateCcw}
              onClick={() => setIsRestoring(true)}
            />
          ) : (
            <>
              <AppButton
                text="Edit"
                variant="outline"
                leftIcon={Pencil}
                onClick={() => setFormTarget(data)}
              />

              <AppButton
                text="Delete"
                variant="destructiveOutline"
                leftIcon={Trash}
                onClick={() => setIsDeleting(true)}
              />
            </>
          )
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <DetailsSection title="About" className="lg:col-span-2">
          <InfoList
            columns={2}
            items={[
              {
                label: "Description",
                value: data.description,
                className: "sm:col-span-2",
              },
              { label: "Image URL", value: data.image },
              { label: "Category id", value: data.id },
              { label: "Last updated", value: formatDateTime(data.updatedAt) },
              {
                label: "Removed at",
                value: data.deletedAt ? formatDateTime(data.deletedAt) : null,
              },
            ]}
          />
        </DetailsSection>

        <DetailsSection title="Image" className="h-fit">
          <AppAvatar
            src={data.image}
            name={data.name}
            className="aspect-video size-full rounded-none border-0"
          />
        </DetailsSection>
      </div>

      <CategoryFormPanel
        target={formTarget}
        onClose={() => setFormTarget(null)}
      />

      <ConfirmModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        mode="cancel"
        title="Delete this category?"
        description="Its services stay untouched, but they stop showing to customers until the category is restored."
        entityName={data.name}
        confirmText="Yes, delete it"
        isPending={deleteCategory.isPending}
        onConfirm={() => deleteCategory.mutate(data.id)}
      />

      <ConfirmModal
        isOpen={isRestoring}
        onClose={() => setIsRestoring(false)}
        mode="approve"
        title="Restore this category?"
        description="Everything filed under it becomes visible again."
        entityName={data.name}
        confirmText="Yes, restore it"
        isPending={restoreCategory.isPending}
        onConfirm={() => restoreCategory.mutate(data.id)}
      />
    </section>
  );
};

export default AdminCategoryDetailsPage;
