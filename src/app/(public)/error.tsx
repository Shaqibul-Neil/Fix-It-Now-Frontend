"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { AppButton, AppError } from "@/src/components";

interface IErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

// Same segment as the public layout, so the navbar and footer stay put and the
// visitor still has a way out of the page that broke.
const PublicError = ({ error, unstable_retry }: IErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[70svh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 xl:px-8">
      <AppError
        title="This page could not load"
        message="Something broke on our side while putting this page together."
        digest={error.digest}
        action={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <AppButton
              text="Try again"
              leftIcon={RotateCcw}
              onClick={() => unstable_retry()}
            />

            <AppButton href="/" text="Go home" variant="outline" />
          </div>
        }
        className="w-full max-w-lg"
      />
    </section>
  );
};

export default PublicError;
