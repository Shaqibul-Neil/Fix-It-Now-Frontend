"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wrench } from "lucide-react";
import {
  AppButton,
  AppCheckbox,
  AppInput,
  AppSelect,
  AppTextArea,
  ResultState,
  SidePanel,
} from "@/src/components";
import { useCategoryOptions } from "@/src/hooks/useCategoryOptions";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "../hooks/useServiceMutation";
import {
  serviceFormSchema,
  type TServiceForm,
} from "../schema/service.schema";
import type { IServiceFormTarget } from "../types/service.types";

interface IServiceFormPanelProps {
  target: IServiceFormTarget | null;
  onClose: () => void;
}

const EMPTY_FORM: TServiceForm = {
  categoryId: "",
  title: "",
  description: "",
  price: 0,
  estimatedDuration: 30,
  isActive: true,
};

const ServiceFormPanel = ({ target, onClose }: IServiceFormPanelProps) => {
  const [isDone, setIsDone] = useState(false);
  const isEditing = Boolean(target?.id);
  // Forms create/update need the category id, unlike the filter dropdown
  // which keys off the slug.
  const categoryOptions = useCategoryOptions("id");

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TServiceForm>({
    resolver: zodResolver(serviceFormSchema),
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
        categoryId: target.categoryId ?? "",
        title: target.title ?? "",
        description: target.description ?? "",
        price: target.price ? Number(target.price) : 0,
        estimatedDuration: target.estimatedDuration ?? 30,
        isActive: target.isActive ?? true,
      });
    }
  }

  const createService = useCreateServiceMutation(() => setIsDone(true));
  const updateService = useUpdateServiceMutation(() => setIsDone(true));

  const isPending = createService.isPending || updateService.isPending;

  const submit = handleSubmit((values) => {
    if (!target) return;

    if (target.id) {
      updateService.mutate({ id: target.id, payload: values });
      return;
    }

    createService.mutate(values);
  });

  return (
    <SidePanel
      isOpen={Boolean(target)}
      onOpenChange={(open) => !open && onClose()}
      title={
        isDone
          ? "All set"
          : isEditing
            ? "Update service"
            : "Add a new service"
      }
      description={isEditing ? target?.title : "List a service you offer"}
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
              form="service-form"
              text={isEditing ? "Save changes" : "Create service"}
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
          icon={Wrench}
          title={isEditing ? "Service updated" : "Service created"}
          description="Customers can find and book this service right away."
          className="border-0 p-0 sm:p-0"
        />
      ) : (
        <form id="service-form" className="space-y-5" onSubmit={submit}>
          <AppInput
            label="Title"
            placeholder="AC gas refill and service"
            error={errors.title?.message}
            {...register("title")}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <AppSelect
                label="Category"
                placeholder="Pick a category"
                options={categoryOptions}
                value={field.value}
                onChange={field.onChange}
                infiniteScroll
                error={errors.categoryId?.message}
              />
            )}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <AppInput
              label="Price (৳)"
              type="number"
              step="0.01"
              placeholder="500"
              error={errors.price?.message}
              {...register("price", { valueAsNumber: true })}
            />

            <AppInput
              label="Duration (minutes)"
              type="number"
              placeholder="60"
              error={errors.estimatedDuration?.message}
              {...register("estimatedDuration", { valueAsNumber: true })}
            />
          </div>

          <AppTextArea
            label="Description"
            placeholder="What is included in this service"
            error={errors.description?.message}
            {...register("description")}
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

export default ServiceFormPanel;
