"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { AppButton, AppError } from "@/src/components";

interface IErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

// The catch-all under the root layout. Anything without a closer boundary —
// the auth screens, for one — lands here instead of a blank page.
const RootError = ({ error, unstable_retry }: IErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <AppError
        title="Something went wrong"
        message="We hit an unexpected error. Trying again usually clears it."
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
    </main>
  );
};

export default RootError;
