import React from "react";
import type { ElementType } from "react";
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

interface PageHeaderProps {
  title: string;
  textVariant?:
    | "semibold-3xl"
    | "semibold-2xl"
    | "medium-base"
    | "semibold-xl"
    | "semibold-base";
  textClassName?: string;
  divClassName?: string;
  description?: string;
  action?: HeaderActionProps;
}

const PageHeader = ({
  title,
  description,
  action,
  textVariant = "semibold-3xl",
  textClassName,
  divClassName,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        `flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8`,
        divClassName,
      )}
    >
      {/* Left Column: Title & Description */}
      <div className="space-y-2 overflow-hidden">
        <Text
          variant={textVariant}
          as="h1"
          className={cn("text-project-accent leading-none", textClassName)}
        >
          {title}
        </Text>

        {description && (
          <Text
            variant="normal-sm"
            as="p"
            className="text-project-muted-foreground"
          >
            {description}
          </Text>
        )}
      </div>

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

export default React.memo(PageHeader);
