import { BellOff } from "lucide-react";
import { Text } from "@/src/components";

const NotificationEmpty = () => {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span className="flex size-11 items-center justify-center border border-project-border text-project-primary">
        <BellOff className="size-5" />
      </span>

      <Text variant="semibold-sm-2" as="span" className="text-project-accent">
        Nothing new right now
      </Text>

      <Text
        variant="normal-sm"
        as="p"
        className="max-w-56 text-project-muted-foreground"
      >
        Booking updates, payouts and reviews will land here as they happen.
      </Text>
    </div>
  );
};

export default NotificationEmpty;
