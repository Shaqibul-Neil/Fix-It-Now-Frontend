import Link from "next/link";
import { cn } from "@/src/lib/utils/cn";
import { Text } from "@/src/components";

interface ILogoProps {
  href?: string;
  className?: string;
  wordmarkClassName?: string;
}

const Logo = ({ href = "/", className, wordmarkClassName }: ILogoProps) => {
  return (
    <Link
      href={href}
      className={cn("group flex items-center gap-3", className)}
      aria-label="FixItNow home"
    >
      <span className="flex size-9 shrink-0 items-center justify-center bg-project-primary text-sm font-bold text-project-primary-foreground transition-transform duration-500 group-hover:-translate-y-0.5">
        F
      </span>

      <Text
        variant="semibold-base"
        as="span"
        className={cn(
          "whitespace-nowrap tracking-tight text-project-accent",
          wordmarkClassName,
        )}
      >
        FixItNow
      </Text>
    </Link>
  );
};

export default Logo;
