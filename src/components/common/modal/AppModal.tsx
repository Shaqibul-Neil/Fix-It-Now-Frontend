"use client";

import type { ReactNode } from "react";
import { Dialog, VisuallyHidden } from "radix-ui";
import { X } from "lucide-react";
import { IconButton, Text } from "@/src/components";
import { OVERLAY_MOTION } from "@/src/lib/animation/animation.tokens";
import { cn } from "@/src/lib/utils/cn";

const SIZE = {
  sm: "sm:max-w-md",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
};

interface IAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: keyof typeof SIZE;
  className?: string;
}

const AppModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "sm",
  className,
}: IAppModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-200 bg-black/50 backdrop-blur-sm",
            OVERLAY_MOTION.overlay,
          )}
        />

        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-210 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
            "border border-project-border bg-project-card shadow-2xl outline-none",
            OVERLAY_MOTION.center,
            SIZE[size],
            className,
          )}
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-0.5 bg-project-primary"
          />

          <div className="flex items-start justify-between gap-4 border-b border-project-border px-5 py-4">
            <div className="min-w-0">
              <Dialog.Title asChild>
                <Text
                  variant="semibold-lg"
                  as="h2"
                  className="text-project-accent"
                >
                  {title}
                </Text>
              </Dialog.Title>

              {description ? (
                <Dialog.Description asChild>
                  <Text
                    variant="normal-sm"
                    className="mt-2 text-project-muted-foreground"
                  >
                    {description}
                  </Text>
                </Dialog.Description>
              ) : (
                <VisuallyHidden.Root>
                  <Dialog.Description>{title}</Dialog.Description>
                </VisuallyHidden.Root>
              )}
            </div>

            <Dialog.Close asChild>
              <IconButton variant="ghost" className="shrink-0" aria-label="Close">
                <X className="size-5" />
              </IconButton>
            </Dialog.Close>
          </div>

          {children && <div className="px-5 py-5">{children}</div>}

          {footer && (
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-project-border bg-project-muted/40 px-5 py-4">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AppModal;
