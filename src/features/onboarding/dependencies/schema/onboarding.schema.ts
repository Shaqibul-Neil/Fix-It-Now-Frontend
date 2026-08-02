import { z } from "zod";

const MIN_AGE_YEARS = 18;

const isAdult = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - MIN_AGE_YEARS);
  return date <= cutoff;
};

// An untouched optional field submits as "", and every optional rule on the
// backend rejects an empty string — so a blank is dropped from the payload
// rather than sent.
const optional = <TSchema extends z.ZodType>(schema: TSchema) =>
  z
    .union([z.literal(""), schema])
    .optional()
    .transform((value) => value || undefined);

const optionalUrl = optional(z.url("Must be a valid URL"));

const basicInfoSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(6, "Phone number is too short")
    .max(11, "Phone number is too long"),
  avatar: optionalUrl,
  coverImage: optionalUrl,
  bio: z
    .string()
    .trim()
    .min(10, "Bio must be at least 10 characters")
    .max(1000, "Bio cannot exceed 1000 characters"),
  experienceYears: z
    .number({ error: "Years of experience is required" })
    .int("Experience must be a whole number")
    .min(0, "Experience cannot be negative")
    .max(60, "Experience years seems too high"),
});

const identitySchema = z.object({
  nationalId: z
    .string()
    .trim()
    .regex(
      /^(\d{10}|\d{13}|\d{17})$/,
      "National ID must be 10, 13 or 17 digits",
    ),
  nidDocument: optionalUrl,
  passportNumber: optional(
    z
      .string()
      .trim()
      .min(6, "Passport number is too short")
      .max(20, "Passport number is too long"),
  ),
  dateOfBirth: optional(
    z.string().refine(isAdult, `You must be at least ${MIN_AGE_YEARS} years old`),
  ),
  emergencyContactName: optional(
    z.string().trim().min(2, "Contact name is too short").max(100),
  ),
  emergencyContactPhone: optional(
    z.string().trim().min(6, "Contact phone is too short").max(20),
  ),
});

const profileDetailsSchema = z.object({
  professionalTitle: optional(
    z.string().trim().min(2, "Title is too short").max(120),
  ),
  tagline: optional(z.string().trim().max(300, "Tagline is too long")),
  skills: z
    .array(z.string().trim().min(1).max(60))
    .max(20, "Twenty skills is the limit")
    .optional(),
  workHighlights: z
    .array(z.string().trim().min(1).max(100))
    .max(10, "Ten highlights is the limit")
    .optional(),
});

const pricingSchema = z.object({
  hourlyRate: z
    .number({ error: "Hourly rate is required" })
    .positive("Hourly rate must be greater than 0"),
  serviceRadius: z
    .number()
    .int("Service radius must be a whole number")
    .positive("Service radius must be greater than 0")
    .optional(),
  offersEmergencyService: z.boolean().optional(),
});

const locationSchema = z.object({
  address: z
    .string()
    .trim()
    .min(5, "Address is too short")
    .max(255, "Address is too long"),
  city: z
    .string()
    .trim()
    .min(2, "City is required")
    .max(100, "City name is too long"),
  area: z
    .string()
    .trim()
    .min(2, "Area is required")
    .max(100, "Area name is too long"),
});

// One schema for the whole wizard
export const technicianProfileSchema = z.object({
  basicInfo: basicInfoSchema,
  identity: identitySchema,
  profileDetails: profileDetailsSchema,
  pricing: pricingSchema,
  location: locationSchema,
});

// What the form holds while it is being filled — blanks included.
export type TTechnicianProfileInput = z.input<typeof technicianProfileSchema>;

// What survives validation and goes to the API — blanks dropped.
export type TTechnicianProfilePayload = z.output<typeof technicianProfileSchema>;
