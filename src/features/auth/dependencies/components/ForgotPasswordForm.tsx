"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { AppButton, AppInput } from "@/src/components";
import {
  forgotPasswordSchema,
  type TForgotPasswordInput,
} from "../schema/auth.schema";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleForgotPassword = (payload: TForgotPasswordInput) =>
    console.log(payload);

  return (
    <form
      onSubmit={handleSubmit(handleForgotPassword)}
      className="space-y-5"
      noValidate
    >
      <AppInput
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        leftElement={<Mail size={16} />}
        error={errors.email?.message}
        {...register("email")}
      />

      <AppButton
        type="submit"
        text="Send reset link"
        rightIcon={ArrowRight}
        className="h-11 w-full"
      />
    </form>
  );
};

export default ForgotPasswordForm;
