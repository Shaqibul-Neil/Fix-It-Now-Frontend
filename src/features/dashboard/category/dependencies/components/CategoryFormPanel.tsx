"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers } from "lucide-react";
import {
  AppButton,
  AppCheckbox,
  AppInput,
  AppTextArea,
  ResultState,
  SidePanel,
} from "@/src/components";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../hooks/useCategoryMutation";
import {
  categoryFormSchema,
  type TCategoryForm,
} from "../schema/category.schema";
import type { ICategoryFormTarget } from "../types/category.types";

interface ICategoryFormPanelProps {
  target: ICategoryFormTarget | null;
  onClose: () => void;
}

const EMPTY_FORM: TCategoryForm = {
  name: "",
  description: "",
  image: "",
  isActive: true,
};

const CategoryFormPanel = ({ target, onClose }: ICategoryFormPanelProps) => {
  const [isDone, setIsDone] = useState(false);
  const isEditing = Boolean(target?.id);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: EMPTY_FORM,
  });

  // Every control starts over for whichever row opened the panel. Closing is
  // skipped so the slide-out animation does not flash an empty form.
  const [lastTarget, setLastTarget] = useState(target);
  if (target !== lastTarget) {
    setLastTarget(target);
    if (target) {
      setIsDone(false);
      reset({
        name: target.name ?? "",
        description: target.description ?? "",
        image: target.image ?? "",
        isActive: target.isActive ?? true,
      });
    }
  }

  const createCategory = useCreateCategoryMutation(() => setIsDone(true));
  const updateCategory = useUpdateCategoryMutation(() => setIsDone(true));

  const isPending = createCategory.isPending || updateCategory.isPending;

  const submit = handleSubmit(({ image, ...values }) => {
    if (!target) return;

    // An update sends null to clear the image; a create simply omits it.
    if (target.id) {
      updateCategory.mutate({
        id: target.id,
        payload: { ...values, image: image?.trim() || null },
      });
      return;
    }

    createCategory.mutate({ ...values, image: image?.trim() || undefined });
  });

  return (
    <SidePanel
      isOpen={Boolean(target)}
      onOpenChange={(open) => !open && onClose()}
      title={
        isDone ? "All set" : isEditing ? "Update category" : "Add a new category"
      }
      description={
        isEditing ? target?.name : "Group the services customers browse"
      }
      footer={
        isDone ? (
          <AppButton text="Done" onClick={onClose} />
        ) : (
          <>
            <AppButton
              variant="outline"
              text="Cancel"
              onClick={onClose}
              disabled={isPending}
            />
            <AppButton
              type="submit"
              form="category-form"
              text={isEditing ? "Save changes" : "Create category"}
              disabled={isPending}
            />
          </>
        )
      }
    >
      {isDone ? (
        <ResultState
          tone="success"
          titleAs="h3"
          icon={Layers}
          title={isEditing ? "Category updated" : "Category created"}
          description="Technicians can list services under it right away."
          className="border-0 p-0 sm:p-0"
        />
      ) : (
        <form id="category-form" className="space-y-5" onSubmit={submit}>
          <AppInput
            label="Name"
            placeholder="AC Repair"
            error={errors.name?.message}
            {...register("name")}
          />

          <AppTextArea
            label="Description"
            placeholder="What kind of work belongs in this category"
            error={errors.description?.message}
            {...register("description")}
          />

          <AppInput
            label="Image URL"
            placeholder="https://images.unsplash.com/photo-..."
            error={errors.image?.message}
            {...register("image")}
          />

          <Controller
            control={control}
            name="isActive"
            render={({ field }) => (
              <AppCheckbox
                label="Visible to customers"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </form>
      )}
    </SidePanel>
  );
};

export default CategoryFormPanel;
