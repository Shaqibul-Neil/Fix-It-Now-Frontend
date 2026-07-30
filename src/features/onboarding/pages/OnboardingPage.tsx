"use client";

import { ShieldAlert } from "lucide-react";
import type { KeyboardEvent } from "react";
import { FormProvider } from "react-hook-form";
import {
  FormNavigation,
  OnboardingSidebar,
  PageHeader,
  Reveal,
  Text,
  ThemeToggle,
} from "@/src/components";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";
import BasicInfoStep from "../dependencies/components/BasicInfoStep";
import LocationStep from "../dependencies/components/LocationStep";
import PricingStep from "../dependencies/components/PricingStep";
import ReviewStep from "../dependencies/components/ReviewStep";
import {
  ONBOARDING_LAST_STEP,
  ONBOARDING_STEPPER,
} from "../dependencies/constants/onboarding.content";
import { useSaveTechnicianProfileMutation } from "../dependencies/hooks/useOnboarding";
import { useOnboardingForm } from "../dependencies/hooks/useOnboardingForm";
import type { TTechnicianProfileInput } from "../dependencies/schema/onboarding.schema";

interface IOnboardingPageProps {
  firstName: string;
  rejectionReason?: string | null;
  initialValues?: TTechnicianProfileInput;
}

const OnboardingPage = ({
  firstName,
  rejectionReason,
  initialValues,
}: IOnboardingPageProps) => {
  const {
    methods,
    currentStep,
    isEditing,
    nextStep,
    prevStep,
    goToStep,
    clearDraft,
  } = useOnboardingForm({ initialValues });

  const { mutate: saveProfile, isPending } = useSaveTechnicianProfileMutation({
    isEditing,
    onSaved: clearDraft,
  });

  const activeStep = ONBOARDING_STEPPER[currentStep - 1];

  const blockEarlyEnter = (event: KeyboardEvent<HTMLFormElement>) => {
    const isTextArea = (event.target as HTMLElement).tagName === "TEXTAREA";
    if (
      event.key === "Enter" &&
      !isTextArea &&
      currentStep < ONBOARDING_LAST_STEP
    ) {
      event.preventDefault();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep />;
      case 2:
        return <PricingStep />;
      case 3:
        return <LocationStep />;
      default:
        return <ReviewStep onEdit={goToStep} />;
    }
  };

  return (
    <FormProvider {...methods}>
      <SidebarProvider>
        <OnboardingSidebar
          steps={ONBOARDING_STEPPER}
          currentStep={currentStep}
          onStepSelect={goToStep}
        />

        <SidebarInset>
          <header className="flex h-18 shrink-0 items-center justify-between gap-3 border-b border-project-border px-4 sm:px-8">
            <div className="flex min-w-0 items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Text
                variant="medium-xs"
                as="span"
                className="truncate uppercase tracking-[0.28em] text-project-primary"
              >
                {currentStep} of {ONBOARDING_LAST_STEP} — {activeStep.label}
              </Text>
            </div>

            <ThemeToggle />
          </header>

          <div className="flex-1 px-4 py-8 sm:px-8">
            <div className="mx-auto w-full max-w-2xl">
              {rejectionReason && (
                <div className="mb-8 flex gap-3 border border-project-destructive/30 bg-project-destructive/10 p-4">
                  <ShieldAlert className="mt-0.5 size-4 shrink-0 text-project-destructive" />
                  <div className="space-y-1">
                    <Text
                      variant="semibold-sm-2"
                      as="span"
                      className="block text-project-accent"
                    >
                      Why your profile was rejected
                    </Text>
                    <Text
                      variant="normal-sm"
                      as="p"
                      className="text-project-muted-foreground"
                    >
                      {rejectionReason}
                    </Text>
                  </div>
                </div>
              )}

              <form
                onSubmit={methods.handleSubmit((values) => saveProfile(values))}
                onKeyDown={blockEarlyEnter}
                noValidate
              >
                {/* Keyed on the step so the reveal replays on every transition. */}
                <Reveal key={currentStep} className="flex flex-col gap-6">
                  {currentStep === 1 && !isEditing && (
                    <Text
                      variant="medium-xs"
                      as="span"
                      className="uppercase tracking-[0.28em] text-project-muted-foreground"
                    >
                      Welcome, {firstName}
                    </Text>
                  )}

                  <PageHeader
                    title={activeStep.title}
                    description={activeStep.description}
                    textVariant="semibold-2xl"
                    divClassName="mb-0"
                  />

                  {renderStep()}
                </Reveal>

                <FormNavigation
                  currentStep={currentStep}
                  lastStep={ONBOARDING_LAST_STEP}
                  onNext={nextStep}
                  onPrev={prevStep}
                  isPending={isPending}
                  submitText={
                    isEditing ? "Send for review again" : "Submit for review"
                  }
                />
              </form>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </FormProvider>
  );
};

export default OnboardingPage;
