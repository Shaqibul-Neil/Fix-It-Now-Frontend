"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppToast } from "@/src/lib/utils/toast.utils";
import { categoryKeys } from "../api/category.key";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../api/category.mutation.client";
import type {
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "../types/category.types";

// A category also fills every category dropdown in the app, so a write drops
// the admin list and the options cache together.
const useInvalidateCategory = () => {
  const queryClient = useQueryClient();

  return () =>
    Promise.all(
      [categoryKeys.admin.lists, categoryKeys.options].map((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      ),
    );
};

//-----------------Admin---------------
export const useCreateCategoryMutation = (onDone?: () => void) => {
  const invalidateCategory = useInvalidateCategory();

  return useMutation({
    mutationFn: (payload: ICreateCategoryPayload) => createCategory(payload),

    onSuccess: async ({ message }) => {
      await invalidateCategory();
      AppToast.success(message ?? "Category created");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

export const useUpdateCategoryMutation = (onDone?: () => void) => {
  const invalidateCategory = useInvalidateCategory();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateCategoryPayload;
    }) => updateCategory(id, payload),

    onSuccess: async ({ message }) => {
      await invalidateCategory();
      AppToast.success(message ?? "Category updated");
      onDone?.();
    },
    onError: AppToast.error,
  });
};

export const useDeleteCategoryMutation = (onDone?: () => void) => {
  const invalidateCategory = useInvalidateCategory();

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: async ({ message }) => {
      await invalidateCategory();
      AppToast.success(message ?? "Category deleted");
      onDone?.();
    },
    onError: AppToast.error,
  });
};
