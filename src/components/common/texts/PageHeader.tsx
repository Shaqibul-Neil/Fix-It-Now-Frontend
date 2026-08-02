import type { ElementType, ReactNode } from "react";
import { cn } from "@/src/lib/utils/cn";
import AppButton from "../buttons/AppButton";
import Text from "./Text";

// Defining Props for Header Actions (AppButton logic)
interface HeaderActionProps {
  text: string;
  onClick?: () => void;
  href?: string;
  leftIcon?: ElementType;
  rightIcon?: ElementType;
  className?: string;
  variant?:
    | "primary"
    | "outline"
    | "destructive"
    | "destructiveOutline"
    | "ghost"
    | "noOutline"
    | "info"
    | "success"
    | "warning";
}

// Fluid heading sizes the marketing pages share, largest first. Size comes
// before leading so a caller overriding the size does not lose the line height.
const HEADING_SIZE = {
  hero: "text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-tight",
  display:
    "text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-tight",
  section:
    "text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight",
} as const;

type THeadingSize = keyof typeof HEADING_SIZE;

type TTextVariant =
  | "semibold-3xl"
  | "semibold-2xl"
  | "semibold-xl"
  | "semibold-base"
  | "medium-base";

interface PageHeaderProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  textVariant?: TTextVariant | THeadingSize;
  align?: "start" | "center";
  // Moves the description out of the title stack into its own column.
  descriptionAside?: boolean;
  action?: HeaderActionProps;
  children?: ReactNode;
  divClassName?: string;
  contentClassName?: string;
  textClassName?: string;
  eyebrowClassName?: string;
  descriptionClassName?: string;
}

const PageHeader = ({
  title,
  eyebrow,
  description,
  action,
  children,
  as = "h1",
  textVariant = "semibold-3xl",
  align = "start",
  descriptionAside = false,
  textClassName,
  divClassName,
  contentClassName,
  eyebrowClassName,
  descriptionClassName,
}: PageHeaderProps) => {
  const headingSize = HEADING_SIZE[textVariant as THeadingSize];

  const descriptionNode = description && (
    <Text
      variant={headingSize ? "normal-base" : "normal-sm"}
      as="p"
      className={cn("text-project-muted-foreground", descriptionClassName)}
    >
      {description}
    </Text>
  );

  return (
    <div
      className={cn(
        descriptionAside
          ? "grid gap-6 mb-8 lg:grid-cols-2 lg:items-end lg:gap-12"
          : "flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8",
        align === "center" && "text-center md:flex-col md:items-center",
        divClassName,
      )}
    >
      {/* Left Column: Eyebrow, Title & Description */}
      <div
        className={cn(
          headingSize ? "min-w-0 space-y-4" : "overflow-hidden space-y-2",
          contentClassName,
        )}
      >
        {eyebrow && (
          <Text
            variant="medium-xs"
            as="span"
            className={cn(
              "block uppercase tracking-[0.28em] text-project-primary",
              eyebrowClassName,
            )}
          >
            {eyebrow}
          </Text>
        )}

        <Text
          variant={headingSize ? undefined : (textVariant as TTextVariant)}
          as={as}
          className={cn(
            "text-project-accent",
            headingSize || "leading-none",
            textClassName,
          )}
        >
          {title}
        </Text>

        {!descriptionAside && descriptionNode}

        {!descriptionAside && children}
      </div>

      {/* Right Column: Description pulled out of the title stack */}
      {descriptionAside && (description || children) && (
        <div className="space-y-6">
          {descriptionNode}
          {children}
        </div>
      )}

      {/* Right Column: Reusable AppButton Action */}
      {action && (
        <div className="shrink-0">
          {/* Split so AppButton resolves to its link or its button branch —
              a possibly-undefined href fits neither side of the union. */}
          {action.href ? (
            <AppButton
              text={action.text}
              href={action.href}
              leftIcon={action.leftIcon}
              rightIcon={action.rightIcon}
              className={action.className}
              variant={action.variant || "primary"}
            />
          ) : (
            <AppButton
              text={action.text}
              onClick={action.onClick}
              leftIcon={action.leftIcon}
              rightIcon={action.rightIcon}
              className={action.className}
              variant={action.variant || "primary"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
