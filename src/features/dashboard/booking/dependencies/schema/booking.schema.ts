import { z } from "zod";

export const createBookingSchema = z.object({
  serviceId: z.uuid("Pick a service"),

  scheduledAt: z
    .string()
    .min(1, "Pick a date and time")
    .refine(
      (value) => new Date(value).getTime() > Date.now(),
      "Scheduled time must be in the future",
    ),

  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(500, "Address cannot exceed 500 characters"),

  city: z.string().trim().max(100, "City cannot exceed 100 characters"),

  area: z.string().trim().max(100, "Area cannot exceed 100 characters"),

  notes: z.string().trim().max(2000, "Notes cannot exceed 2000 characters"),
});

export type TCreateBookingForm = z.infer<typeof createBookingSchema>;
