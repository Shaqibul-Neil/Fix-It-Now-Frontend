import type { ReactNode } from "react";
import { Logo, Text, ThemeToggle } from "@/src/components";
import type { IAuthAsideContent } from "../constants/auth.content";
import AuthAside from "./AuthAside";
import AuthAsideMotion from "./AuthAsideMotion";

interface IAuthShellProps {
  aside: IAuthAsideContent;
  children: ReactNode;
}

// Split screen: dark editorial panel on the left, form column on the right.
const AuthShell = ({ aside, children }: IAuthShellProps) => {
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-[1.05fr_1fr]">
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

      <div className="flex flex-col">
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 xl:px-16">
          <Logo className="lg:hidden" />

          <Text
            variant="medium-xs"
            as="span"
            className="hidden uppercase tracking-[0.28em] text-project-muted-foreground lg:block"
          >
            FixItNow
          </Text>

          <ThemeToggle />
        </header>

        <main className="flex flex-1 items-center justify-center px-6 pb-16 pt-4 sm:px-10 xl:px-16">
          <div className="w-full max-w-108">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AuthShell;
