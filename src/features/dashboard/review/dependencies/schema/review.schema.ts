import { z } from "zod";

export const reviewFormSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Pick a rating first")
    .max(5, "Rating must be between 1 and 5"),

  comment: z.string().trim().max(2000, "Comment cannot exceed 2000 characters"),
});

export type TReviewForm = z.infer<typeof reviewFormSchema>;
