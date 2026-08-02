import { z } from "zod";

// Left blank the field submits "", which no phone rule should ever run on.
const optionalPhone = z
  .union([
    z.literal(""),
    z
      .string()
      .trim()
      .min(6, "Phone number is too short")
      .max(15, "Phone number is too long"),
  ])
  .optional()
  .transform((value) => value || undefined);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(80, "Name cannot exceed 80 characters"),
  email: z.email("Must be a valid email address"),
  phone: optionalPhone,
  topic: z.string().min(1, "Pick what this is about"),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least 20 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

export type TContactInput = z.input<typeof contactSchema>;

export type TContactPayload = z.output<typeof contactSchema>;
