import { USER_ROLES } from "@/src/lib/auth/auth.roles";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum([USER_ROLES.CUSTOMER, USER_ROLES.TECHNICIAN]),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
});

export type TLoginInput = z.infer<typeof loginSchema>;
export type TRegisterInput = z.infer<typeof registerSchema>;
export type TForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
