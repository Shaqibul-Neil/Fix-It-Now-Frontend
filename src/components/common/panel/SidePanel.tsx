"use client";

import type { ReactNode } from "react";
import { Dialog, VisuallyHidden } from "radix-ui";
import { X } from "lucide-react";
import { IconButton, Text } from "@/src/components";
import { OVERLAY_MOTION } from "@/src/lib/animation/animation.tokens";
import { cn } from "@/src/lib/utils/cn";

interface ISidePanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const SidePanel = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: ISidePanelProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-100 bg-black/50 backdrop-blur-sm",
            OVERLAY_MOTION.overlay,
          )}
        />

        <Dialog.Content
          className={cn(
            "fixed inset-y-0 right-0 z-110 flex w-full flex-col sm:max-w-lg",
            "border-l border-project-border bg-project-card shadow-2xl outline-none",
            OVERLAY_MOTION.fromRight,
            className,
          )}
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-0.5 bg-project-primary"
          />

          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-project-border px-6 py-4">
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

          <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

          {footer && (
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-project-border bg-project-muted/40 px-6 py-4">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SidePanel;
