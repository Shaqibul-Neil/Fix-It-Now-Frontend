import { Text } from "../components";

// Crop marks, one per corner — the L is drawn with two borders each.
const CORNER = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
];

// Server component on purpose: this has to paint before any JS arrives, so the
// whole thing is CSS keyframes and no gsap.
const Loading = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-svh flex-1 items-center justify-center bg-project-background px-4"
    >
      <div className="relative px-10 py-12">
        {CORNER.map((corner) => (
          <span
            key={corner}
            aria-hidden
            className={`absolute size-6 border-project-primary animate-tick ${corner}`}
          />
        ))}

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center bg-project-primary text-sm font-bold text-project-primary-foreground">
              F
            </span>

            <Text
              variant="semibold-base"
              as="span"
              className="whitespace-nowrap tracking-tight text-project-accent"
            >
              FixItNow
            </Text>
          </div>

          <div
            aria-hidden
            className="relative h-px w-48 overflow-hidden bg-project-border sm:w-64"
          >
            <span className="absolute inset-y-0 left-0 w-1/5 bg-project-primary animate-shuttle" />
          </div>

          <Text
            variant="medium-xs"
            as="span"
            className="uppercase tracking-[0.28em] text-project-muted-foreground"
          >
            Checking the board
          </Text>
        </div>
      </div>

      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Loading;
