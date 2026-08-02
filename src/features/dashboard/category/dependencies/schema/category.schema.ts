import { z } from "zod";

export const categoryFormSchema = z.object({
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
});

export type TCategoryForm = z.infer<typeof categoryFormSchema>;
