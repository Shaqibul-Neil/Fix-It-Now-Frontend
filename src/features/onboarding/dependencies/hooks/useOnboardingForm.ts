"use client";
import { DefaultValues, useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  technicianProfileSchema,
  TTechnicianProfileInput,
} from "../schema/onboarding.schema";
import {
  ONBOARDING_DRAFT_KEY,
  ONBOARDING_INITIAL_VALUES,
} from "../constants/onboarding.content";
import { AppToast } from "@/src/lib/utils/toast.utils";

// Each step controls only its own part of the form.
const FIELDS_BY_STEP: Record<number, Path<TTechnicianProfileInput>[]> = {
  1: ["basicInfo"],
  2: ["identity"],
  3: ["profileDetails"],
  4: ["pricing"],
  5: ["location"],
};

// Restore unfinished onboarding data from browser storage.
// During SSR window does not exist, so return null.
const readDraft = (): DefaultValues<TTechnicianProfileInput | undefined> => {
  if (typeof window === "undefined") return undefined;

  try {
    const saved = window.localStorage.getItem(ONBOARDING_DRAFT_KEY);
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    // Remove corrupted localStorage data.
    window.localStorage.removeItem(ONBOARDING_DRAFT_KEY);
    return undefined;
  }
};

interface IUseOnboardingFormOptions {
  // Used when technician edits an existing profile.
  initialValues?: DefaultValues<TTechnicianProfileInput> | null;
}

export const useOnboardingForm = ({
  initialValues,
}: IUseOnboardingFormOptions = {}) => {
  // If initialValues exist, this is edit mode.
  // Otherwise it is a new onboarding flow.
  const isEditing = Boolean(initialValues);

  const methods = useForm<TTechnicianProfileInput>({
    resolver: zodResolver(technicianProfileSchema),
    mode: "onChange",
    // Priority:
    // 1. Existing server data (edit mode)
    // 2. Saved draft from localStorage
    // 3. Empty initial form
    defaultValues: initialValues ?? readDraft() ?? ONBOARDING_INITIAL_VALUES,
  });

  // Always start from first step.
  // Prevents SSR and client hydration mismatch.
  const [currentStep, setCurrentStep] = useState(1);

  // Remove saved draft after successful submit.
  const clearDraft = () => {
    try {
      window.localStorage.removeItem(ONBOARDING_DRAFT_KEY);
    } catch {}
  };

  const nextStep = async () => {
    // Validate only current step fields.
    const isStepValid = await methods.trigger(FIELDS_BY_STEP[currentStep]);
    if (!isStepValid) {
      AppToast.error("Please fix the highlighted fields before continuing.");
      return;
    }
    // Save progress after clicking Next.
    // If user closes browser, previous data can be restored.
    // Skip in edit mode because we already have server data.
    if (!isEditing) {
      try {
        window.localStorage.setItem(
          ONBOARDING_DRAFT_KEY,
          JSON.stringify(methods.getValues()),
        );
      } catch {}
    }

    // Move user to next onboarding step.
    setCurrentStep(currentStep + 1);
  };

  // Move back without validation.
  const prevStep = () => setCurrentStep(currentStep - 1);

  // User can go back to completed steps only.
  // Cannot jump from step 1 directly to step 3.
  const goToStep = (step: number) => {
    if (step < currentStep) setCurrentStep(step);
  };

  return {
    methods,
    currentStep,
    isEditing,
    nextStep,
    prevStep,
    goToStep,
    clearDraft,
  };
};
