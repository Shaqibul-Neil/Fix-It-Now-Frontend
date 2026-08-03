import { z } from "zod";
import { MAINTENANCE_TYPES } from "../types/category.types";

export const categoryFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .max(2000, "Description cannot exceed 2000 characters")
      .optional(),

    // Empty stays valid — it is how an admin clears the image on an update.
    image: z
      .union([z.url("Enter a valid image URL").max(2048), z.literal("")])
      .optional(),

    isActive: z.boolean(),

    maintenanceType: z.enum(MAINTENANCE_TYPES),

    // Typed into a text field, so it stays a string here and the panel turns it
    // into a number on submit. Empty means the category has no cycle.
    maintenanceIntervalDays: z
      .string()
      .trim()
      .refine((value) => !value || /^\d+$/.test(value), "Use whole days")
      .refine(
        (value) => !value || (Number(value) >= 1 && Number(value) <= 3650),
        "Interval must be between 1 and 3650 days",
      ),
  })
  .refine(
    (values) =>
      values.maintenanceType !== "RECURRING" ||
      Boolean(values.maintenanceIntervalDays),
    {
      message: "A repeating category needs how often it comes round, in days",
      path: ["maintenanceIntervalDays"],
    },
  );

export type TCategoryForm = z.infer<typeof categoryFormSchema>;
