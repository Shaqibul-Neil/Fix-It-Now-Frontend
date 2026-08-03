import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

// The one error card for the whole app — every failed request renders this,
// and so does every error.tsx boundary.
interface IAppErrorProps {
  title?: string;
  message?: string;
  digest?: string;
  action?: ReactNode;
  className?: string;
}

const AppError = ({
  title = "Something went wrong",
  message = "The request failed. Reload the page or try a different filter.",
  digest,
  action,
  className,
}: IAppErrorProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 border border-project-destructive/30 bg-project-destructive/5 p-10 text-center",
        className,
      )}
    >
      <TriangleAlert className="size-6 shrink-0 text-project-destructive" />

      <div className="space-y-1">
        <Text variant="semibold-base" as="h2" className="text-project-accent">
          {title}
        </Text>

        <Text
          variant="normal-sm"
          as="p"
          className="text-project-muted-foreground"
        >
          {message}
        </Text>
      </div>

      {/* The hash that matches this crash to a server log — the only thing
          worth quoting when someone reports it. */}
      {digest && (
        <Text
          variant="normal-xs"
          as="span"
          className="wrap-break-word font-mono text-project-muted-foreground"
        >
          {`Reference ${digest}`}
        </Text>
      )}

      {action}
    </div>
  );
};

export default AppError;
