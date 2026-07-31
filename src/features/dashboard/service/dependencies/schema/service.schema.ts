import { z } from "zod";

export const serviceFormSchema = z.object({
  categoryId: z.uuid("Pick a category"),

  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title cannot exceed 150 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),

  price: z.number().positive("Price must be greater than 0"),

  estimatedDuration: z
    .number()
    .int("Duration must be a whole number (minutes)")
    .positive("Duration must be greater than 0"),

  isActive: z.boolean(),
});

export type TServiceForm = z.infer<typeof serviceFormSchema>;
