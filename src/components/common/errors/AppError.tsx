import { TriangleAlert } from "lucide-react";
import { Text } from "@/src/components";

// The one error card for the whole app — every failed request renders this.
interface IAppErrorProps {
  title?: string;
  message?: string;
}

const AppError = ({
  title = "Something went wrong",
  message = "The request failed. Reload the page or try a different filter.",
}: IAppErrorProps) => {
  return (
    <div className="flex flex-col items-center gap-4 border border-project-destructive/30 bg-project-destructive/5 p-10 text-center">
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
    </div>
  );
};

export default AppError;
