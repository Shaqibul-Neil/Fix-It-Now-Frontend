"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AppButton, AppInput, AppPasswordInput, Text } from "@/src/components";
import type { TRegisterRole } from "../constants/auth.content";
import { registerSchema, type TRegisterInput } from "../schema/auth.schema";
import { useRegisterMutation } from "../hooks/useAuth";

interface IRegisterFormProps {
  role: TRegisterRole;
}

const RegisterForm = ({ role }: IRegisterFormProps) => {
  const { mutate: registerUser, isPending } = useRegisterMutation();

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

  const handleRegister = (payload: TRegisterInput) => registerUser(payload);

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="space-y-4"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
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

      {/* Email and password pair up the same way the names do — four fields in
          two rows instead of four, which is what keeps this off a scroll. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <AppInput
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          leftElement={<Mail size={16} />}
          error={errors.email?.message}
          {...register("email")}
        />

        <AppPasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      {/* All three password rules on one line — same requirements as the schema
          enforces, just written to fit a single row. */}
      <Text
        variant="normal-xs"
        as="p"
        className="text-project-muted-foreground"
      >
        Password should be at least 6 characters · one uppercase, one lowercase ·
        one number
      </Text>

      <AppButton
        type="submit"
        text={isPending ? "Creating account..." : "Create Account"}
        rightIcon={ArrowRight}
        disabled={isPending}
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
