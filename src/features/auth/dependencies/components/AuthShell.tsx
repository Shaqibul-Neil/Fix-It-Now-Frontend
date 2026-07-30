import type { ReactNode } from "react";
import { Logo, Text, ThemeToggle } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";
import type { IAuthAsideContent } from "../constants/auth.content";
import AuthAside from "./AuthAside";
import AuthAsideMotion from "./AuthAsideMotion";

interface IAuthShellProps {
  // Left out on the role-choice screen, which runs full width instead.
  aside?: IAuthAsideContent;
  children: ReactNode;
  contentClassName?: string;
}

const AuthShell = ({ aside, children, contentClassName }: IAuthShellProps) => {
  return (
    // h-svh + overflow-hidden from lg up: the page is sized to the viewport, so
    // the auth screens never scroll on desktop. Mobile keeps its normal flow.
    <div
      className={cn(
        "grid min-h-svh w-full lg:h-svh lg:overflow-hidden",
        aside && "lg:grid-cols-[1fr_1.1fr]",
      )}
    >
      {aside && (
        <AuthAsideMotion className="relative hidden overflow-hidden bg-project-aside text-project-aside-foreground lg:flex lg:flex-col">
          {/* Hairline grid + brass haze — the panel's whole texture. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[72px_72px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-1/4 size-128 rounded-full bg-project-primary/25 blur-[140px]"
          />

          <AuthAside {...aside} />
        </AuthAsideMotion>
      )}

      {/* min-h-0 lets <main> own the overflow instead of stretching the grid. */}
      <div className="flex min-h-0 flex-col">
        <header className="flex shrink-0 items-center justify-between px-6 py-4 sm:px-10 xl:px-14">
          {/* With no aside there is no wordmark on the left, so the mark stays. */}
          <Logo className={cn(aside && "lg:hidden")} />

          {aside && (
            <Text
              variant="medium-xs"
              as="span"
              className="hidden uppercase tracking-[0.28em] text-project-muted-foreground lg:block"
            >
              FixItNow
            </Text>
          )}

          <ThemeToggle />
        </header>

        {/* overflow-y-auto is the safety valve for very short viewports — at
            normal heights the content fits and there is nothing to scroll.
            py stays symmetric from lg up so items-center keeps the card
            optically centred; below that the top gap wins over centring. */}
        <main className="custom-scrollbar flex flex-1 items-center justify-center overflow-y-auto px-6 pb-12 pt-10 sm:px-10 lg:py-4 xl:px-14">
          <div className={cn("w-full max-w-108", contentClassName)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthShell;
