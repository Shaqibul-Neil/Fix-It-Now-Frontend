"use client";

import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import AppButton from "./AppButton";

interface IFormNavigationProps {
  currentStep: number;
  lastStep: number;
  onNext: () => void;
  onPrev: () => void;
  isPending?: boolean;
  submitText?: string;
}

const FormNavigation = ({
  currentStep,
  lastStep,
  onNext,
  onPrev,
  isPending = false,
  submitText = "Submit",
}: IFormNavigationProps) => {
  const isLastStep = currentStep === lastStep;

  return (
    <div
      className={`mt-8 flex items-center gap-3 border-t border-project-border pt-6 ${
        currentStep > 1 ? "justify-between" : "justify-end"
      }`}
    >
      {currentStep > 1 && (
        <AppButton
          type="button"
          variant="outline"
          text="Back"
          leftIcon={ArrowLeft}
          onClick={onPrev}
          disabled={isPending}
        />
      )}

      {isLastStep ? (
        <AppButton
          type="submit"
          text={isPending ? "Submitting..." : submitText}
          rightIcon={Send}
          disabled={isPending}
          className="sm:min-w-44"
        />
      ) : (
        <AppButton
          type="button"
          text="Next"
          rightIcon={ArrowRight}
          onClick={onNext}
          className="sm:min-w-44"
        />
      )}
    </div>
  );
};

export default FormNavigation;
