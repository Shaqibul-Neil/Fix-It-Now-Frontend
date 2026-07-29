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
    <Link
      href={href}
      className="group relative block overflow-hidden border border-project-border bg-project-card p-6 transition-colors duration-500 hover:border-project-primary"
    >
      <span
        aria-hidden
        className="absolute right-6 top-6 font-mono text-xs tracking-[0.2em] text-project-muted-foreground/50 transition-colors duration-500 group-hover:text-project-primary"
      >
        {index}
      </span>

      <span className="flex size-11 items-center justify-center border border-project-border text-project-primary transition-all duration-500 group-hover:border-project-primary group-hover:bg-project-primary group-hover:text-project-primary-foreground">
        <RoleIcon className="size-5" />
      </span>

      <Text variant="semibold-lg" as="h2" className="mt-5 text-project-accent">
        {title}
      </Text>

      <Text
        variant="normal-sm"
        as="p"
        className="mt-1 text-project-muted-foreground"
      >
        {tagline}
      </Text>

      <ul className="mt-5 space-y-2">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <Minus className="mt-1 size-3 shrink-0 text-project-primary" />
            <Text
              variant="normal-sm"
              as="span"
              className="text-project-muted-foreground"
            >
              {point}
            </Text>
          </li>
        ))}
      </ul>

      <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-project-accent">
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
