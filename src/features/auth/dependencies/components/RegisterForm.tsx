"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AppButton, AppInput, AppPasswordInput, Text } from "@/src/components";
import { USER_ROLES } from "@/src/lib/auth/auth.roles";
import type { TRegisterRole } from "../constants/auth.content";
import { registerSchema, type TRegisterInput } from "../schema/auth.schema";

const PASSWORD_RULES = [
  "At least 6 characters",
  "One uppercase and one lowercase letter",
  "At least one number",
];

interface IRegisterFormProps {
  role: TRegisterRole;
  submitLabel: string;
}

const RegisterForm = ({ role, submitLabel }: IRegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role,
    },
  });

  const handleRegister = (payload: TRegisterInput) => console.log(payload);

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="space-y-5"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <AppInput
          label="First name"
          autoComplete="given-name"
          placeholder="Rahim"
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <AppInput
          label="Last name"
          autoComplete="family-name"
          placeholder="Uddin"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <AppInput
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        leftElement={<Mail size={16} />}
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="space-y-3">
        <AppPasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="Create a strong password"
          error={errors.password?.message}
          {...register("password")}
        />

        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {PASSWORD_RULES.map((rule) => (
            <li key={rule} className="flex items-center gap-1.5">
              <span className="size-1 bg-project-primary" aria-hidden />
              <Text
                variant="normal-xs"
                as="span"
                className="text-project-muted-foreground"
              >
                {rule}
              </Text>
            </li>
          ))}
        </ul>
      </div>

      {role === USER_ROLES.TECHNICIAN && (
        <div className="flex gap-3 border border-project-border bg-project-muted-primary/60 p-4">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-project-primary" />
          <Text variant="normal-sm" as="p" className="text-project-accent">
            After this step you will add your skills, service area and ID
            documents. Jobs unlock once our team verifies your profile.
          </Text>
        </div>
      )}

      <AppButton
        type="submit"
        text={submitLabel}
        rightIcon={ArrowRight}
        className="h-11 w-full"
      />

      <Text
        variant="normal-xs"
        as="p"
        className="text-project-muted-foreground"
      >
        By continuing you agree to our{" "}
        <Link
          href="/terms"
          className="text-project-primary underline underline-offset-4"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-project-primary underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </Text>
    </form>
  );
};

export default RegisterForm;
