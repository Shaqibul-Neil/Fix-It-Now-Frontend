import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils/cn";

// Variant system
const textVariants = cva("", {
  variants: {
    variant: {
      // Body
      "normal-xs": "text-xs font-normal leading-normal",
      "normal-xs-2": "text-xs font-normal leading-4.5",
      "normal-sm": "text-sm font-normal leading-5",
      "normal-base": "text-base font-normal leading-normal",
      "normal-2xl": "text-2xl font-normal leading-normal",

      // Medium
      "medium-xs": "text-xs font-medium leading-normal",
      "medium-sm": "text-sm font-medium leading-3.5",
      "medium-base": "text-base font-medium leading-normal",
      "medium-xl": "text-xl font-medium leading-4.5",

      // Semibold
      "semibold-xs": "text-xs font-semibold leading-3",
      "semibold-sm": "text-sm font-semibold leading-3.5",
      "semibold-sm-2": "text-sm font-semibold leading-4.5",
      "semibold-base": "text-base font-semibold leading-4",
      "semibold-lg": "text-lg font-semibold leading-5.5",
      "semibold-xl": "text-xl font-semibold leading-6.5",
      "semibold-2xl": "text-2xl font-semibold leading-7.5",
      "semibold-3xl": "text-[28px] font-semibold leading-9",

      // Bold
      "bold-xs": "text-xs font-bold leading-normal",
      "bold-sm": "text-sm font-bold leading-normal",
      "bold-lg": "text-lg font-bold leading-5.5",
      "bold-xl": "text-xl font-bold leading-normal",
      "bold-2xl": "text-2xl font-bold leading-7.5",
      "bold-3xl": "text-[32px] font-bold leading-9.5",

      //label
      "label-sm": "text-sm font-semibold leading-tight text-project-foreground",

      //progress bar
      "progress-md": "text-sm md:text-base font-medium leading-normal",
      "progress-sm": "text-xs md:text-sm font-medium leading-normal",
    },

    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },

    truncate: {
      true: "truncate",
    },
  },

  defaultVariants: {
    variant: "normal-base",
  },
});

// First, extract the Variant Type clearly
// This gets all the variant names like "bold-3xl", "normal-sm", etc.
type TextVariantNames = NonNullable<
  VariantProps<typeof textVariants>["variant"]
>;

// Define the Mapping Type structure separately
// All variants mapped to an optional React Element (h1, p, span)
type TagMapping = Partial<Record<TextVariantNames, React.ElementType>>;

// Semantic tag defaults
const DEFAULT_TAG: TagMapping = {
  // Headings — largest → smallest
  "semibold-3xl": "h1",
  "bold-3xl": "h1",
  "semibold-2xl": "h2",
  "bold-2xl": "h2",
  "semibold-xl": "h3",
  "bold-xl": "h3",
  "semibold-lg": "h4",
  "bold-lg": "h4",
  "semibold-base": "h5",
  "bold-xs": "h5",
  "semibold-sm": "h6",
  "bold-sm": "h6",

  // Inline text
  "semibold-sm-2": "span",
  "semibold-xs": "span",
  "medium-xl": "span",
  "medium-base": "span",
  "medium-sm": "span",
  "medium-xs": "span",

  // Paragraphs
  "normal-base": "p",
  "normal-sm": "p",
  "normal-xs": "p",
  "normal-xs-2": "p",

  //label
  "label-sm": "label",
};

// Props
interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: React.ElementType;
  color?: string;
  // Needed for as="label"; HTMLAttributes does not carry it.
  htmlFor?: string;
}

// Component
const Text = ({
  variant,
  align,
  truncate,
  as,
  className,
  style,
  children,
  ...props
}: TextProps) => {
  // Pre-determining the semantic tag mapping based on variant
  const defaultTag = (variant && DEFAULT_TAG[variant]) || "p";

  //Selecting the final tag: "as" user input has top priority.
  const Tag = (as || defaultTag) as React.ElementType;

  return (
    <Tag
      className={cn(
        textVariants({
          variant,
          align,
          truncate: truncate ? true : undefined,
        }),
        className,
      )}
      style={{ ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Text;
