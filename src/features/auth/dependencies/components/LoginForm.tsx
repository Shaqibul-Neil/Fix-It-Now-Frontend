"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  AppButton,
  AppCheckbox,
  AppInput,
  AppPasswordInput,
} from "@/src/components";
import { loginSchema, type TLoginInput } from "../schema/auth.schema";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = (credentials: TLoginInput) => console.log(credentials);

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-5" noValidate>
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
        autoComplete="current-password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between gap-4">
       
        <AppCheckbox id="rememberMe" label="Keep me signed in" />

        <Link
          href="/forgot-password"
          className="text-sm font-medium text-project-muted-foreground transition-colors duration-300 hover:text-project-primary"
        >
          Forgot password?
        </Link>
      </div>

      <AppButton
        type="submit"
        text="Sign in"
        rightIcon={ArrowRight}
        className="h-11 w-full"
      />
    </form>
  );
};

export default LoginForm;
