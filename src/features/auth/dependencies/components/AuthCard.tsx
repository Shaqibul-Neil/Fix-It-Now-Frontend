import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHeader, Reveal, Text } from "@/src/components";

interface IAuthCardProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  backHref?: string;
  backLabel?: string;
}

// Brass corner marks — the signature detail that carries across every auth screen.
const CORNER_POSITIONS = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-b border-l",
  "right-0 bottom-0 border-b border-r",
];

const AuthCard = ({
  eyebrow,
  title,
  description,
  children,
  footer,
  backHref,
  backLabel,
}: IAuthCardProps) => {
  return (
    <section className="relative">
      {CORNER_POSITIONS.map((position) => (
        <span
          key={position}
          aria-hidden
          className={`pointer-events-none absolute size-5 border-project-primary ${position}`}
        />
      ))}

      <Reveal className="flex flex-col gap-5 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Text
            variant="medium-xs"
            as="span"
            className="uppercase tracking-[0.28em] text-project-primary"
          >
            {eyebrow}
          </Text>

          {backHref && (
            <Link
              href={backHref}
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-project-muted-foreground transition-colors duration-300 hover:text-project-accent"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              {backLabel}
            </Link>
          )}
        </div>

        <PageHeader
          title={title}
          description={description}
          textVariant="semibold-xl"
          divClassName="mb-0 gap-2"
        />

        <div>{children}</div>

        {footer && <div>{footer}</div>}
      </Reveal>
    </section>
  );
};

export default AuthCard;
