"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { AppButton, AppError } from "@/src/components";

interface IErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

// Sits in the same segment as the dashboard layout, so a crash inside a page
// keeps the sidebar and the navbar — only the panel is replaced.
const DashboardError = ({ error, unstable_retry }: IErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60svh] items-center justify-center">
      <AppError
        title="This panel could not load"
        message="Something broke while building this view. Your data is untouched."
        digest={error.digest}
        action={
          <AppButton
            text="Try again"
            leftIcon={RotateCcw}
            onClick={() => unstable_retry()}
          />
        }
        className="w-full max-w-lg"
      />
    </section>
  );
};

export default DashboardError;
