"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Send } from "lucide-react";
import {
  AppButton,
  AppInput,
  AppSelect,
  AppTextArea,
  Text,
} from "@/src/components";
import { cn } from "@/src/lib/utils/cn";
import { CONTACT_TOPICS } from "../constants/contact.content";
import {
  contactSchema,
  type TContactInput,
  type TContactPayload,
} from "../schema/contact.schema";

const ContactForm = ({ className }: { className?: string }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TContactInput, unknown, TContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
    },
  });

  // No endpoint yet — the payload is what the send route will receive.
  const onSubmit = (payload: TContactPayload) => {
    console.log("contact enquiry", payload);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        "grid gap-5 border border-project-border bg-project-card p-6 sm:grid-cols-2 sm:p-8",
        className,
      )}
    >
      <AppInput
        label="Your name"
        placeholder="Nusrat Jahan"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />

      <AppInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <AppInput
        label="Phone (optional)"
        type="tel"
        placeholder="01700000000"
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Controller
        control={control}
        name="topic"
        render={({ field }) => (
          <AppSelect
            label="What is this about"
            placeholder="Pick a topic"
            options={CONTACT_TOPICS}
            value={field.value}
            onChange={field.onChange}
            error={errors.topic?.message}
          />
        )}
      />

      <div className="sm:col-span-2">
        <AppTextArea
          label="Message"
          placeholder="Tell us what happened, and include a booking reference if you have one."
          rows={6}
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <Text
          variant="normal-xs"
          as="p"
          className="max-w-xs text-project-muted-foreground"
        >
          We reply from a real inbox, usually within one working day.
        </Text>

        <AppButton
          type="submit"
          text={isSubmitting ? "Sending" : "Send message"}
          rightIcon={Send}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ContactForm;
