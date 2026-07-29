import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/src/lib/utils/cn";

const buttonVariants = {
  primary:
    "bg-project-primary border-project-primary text-project-primary-foreground hover:bg-project-card hover:text-project-primary",
  outline:
    "bg-project-card border-project-border text-project-accent hover:bg-project-muted hover:border-project-accent",
  destructive:
    "bg-project-destructive border-project-destructive text-white hover:bg-project-card hover:text-project-destructive",
  destructiveOutline:
    "bg-project-card border-project-destructive text-project-destructive hover:bg-project-destructive hover:text-white",
  ghost:
    "bg-transparent border-none border-transparent text-project-muted-foreground hover:text-project-primary px-0 py-0 hover:gap-4 h-2",
  noOutline:
    "border-project-primary text-project-primary bg-project-muted-primary hover:bg-project-primary hover:text-project-primary-foreground",
  info: "bg-project-blue border-project-blue text-white hover:bg-project-card hover:text-project-blue",
  success:
    "bg-project-success border-project-success text-white hover:bg-project-card hover:text-project-success",
  warning:
    "bg-project-yellow border-project-yellow text-white hover:bg-project-card hover:text-project-yellow",
};

interface BaseButtonProps {
  text: string;
  leftIcon?: ElementType;
  rightIcon?: ElementType;
  className?: string;
  variant?: keyof typeof buttonVariants;
}

interface LinkButtonProps
  extends BaseButtonProps, Omit<ComponentPropsWithoutRef<typeof Link>, "href"> {
  href: string;
}

// href stays undefined here so the union above stays discriminated.
interface RegularButtonProps
  extends BaseButtonProps, ComponentPropsWithoutRef<"button"> {
  href?: undefined;
  type?: "submit" | "button" | "reset";
}

type TAppButtonProps = LinkButtonProps | RegularButtonProps;

const AppButton = (allProps: TAppButtonProps) => {
  const {
    text,
    leftIcon: IconLeft,
    rightIcon: IconRight,
    className,
    variant = "primary",
    ...restProps
  } = allProps;

  const combinedClasses = cn(
    "px-4 h-9 flex items-center justify-center rounded-md gap-2 font-medium text-sm transition-all active:scale-95 duration-500 cursor-pointer border",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100",
    buttonVariants[variant],
    className,
  );

  const innerContent = (
    <>
      {IconLeft && <IconLeft className="size-4 shrink-0" />}
      <span className="leading-none capitalize tracking-wide text-center">
        {text}
      </span>
      {IconRight && <IconRight className="size-4 shrink-0" />}
    </>
  );

  // Renders a real anchor so Next can prefetch the route.
  if ("href" in restProps && restProps.href !== undefined) {
    const { href, ...linkProps } = restProps as LinkButtonProps;
    return (
      <Link href={href} className={combinedClasses} {...linkProps}>
        {innerContent}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = restProps as RegularButtonProps;
  return (
    <button type={type} className={combinedClasses} {...buttonProps}>
      {innerContent}
    </button>
  );
};

export default AppButton;
