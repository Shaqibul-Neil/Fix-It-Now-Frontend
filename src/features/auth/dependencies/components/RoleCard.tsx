import { ArrowRight, Minus } from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";
import { Text } from "@/src/components";

interface IRoleCardProps {
  index: string;
  href: string;
  icon: ElementType;
  title: string;
  tagline: string;
  points: readonly string[];
}

const RoleCard = ({
  index,
  href,
  icon: RoleIcon,
  title,
  tagline,
  points,
}: IRoleCardProps) => {
  return (
    // A flex column with mt-auto on the CTA, so both cards in the grid end
    // their "Continue" on the same line however long the copy runs.
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden border border-project-border bg-project-card p-5 transition-colors duration-500 hover:border-project-primary"
    >
      <span
        aria-hidden
        className="absolute right-5 top-5 font-mono text-xs tracking-[0.2em] text-project-muted-foreground/50 transition-colors duration-500 group-hover:text-project-primary"
      >
        {index}
      </span>

      <span className="flex size-10 items-center justify-center border border-project-border text-project-primary transition-all duration-500 group-hover:border-project-primary group-hover:bg-project-primary group-hover:text-project-primary-foreground">
        <RoleIcon className="size-4.5" />
      </span>

      <Text
        variant="semibold-base"
        as="h2"
        className="mt-4 text-project-accent"
      >
        {title}
      </Text>

      <Text
        variant="normal-xs"
        as="p"
        className="mt-1 text-project-muted-foreground"
      >
        {tagline}
      </Text>

      <ul className="mt-4 space-y-1.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <Minus className="mt-1 size-3 shrink-0 text-project-primary" />
            <Text
              variant="normal-xs"
              as="span"
              className="text-project-muted-foreground"
            >
              {point}
            </Text>
          </li>
        ))}
      </ul>

      <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-project-accent">
        Continue
        <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
      </span>

      {/* Brass sweep on hover — the only motion this card needs. */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-project-primary transition-all duration-500 group-hover:w-full"
      />
    </Link>
  );
};

export default RoleCard;
