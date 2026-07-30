import React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, X } from "lucide-react";
import { IconButton, Text } from "@/components";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface TSidePanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const SidePanel = ({
  isOpen,
  onOpenChange,
  title,
  children,
}: TSidePanelProps) => {
  return (
    <SheetPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay
          className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm 
                     data-[state=open]:animate-in data-[state=open]:fade-in-0 
                     data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
                     duration-300 ease-in-out"
        />

        <SheetPrimitive.Content
          className={cn(
            "fixed right-4 top-4 bottom-4 z-110 flex flex-col bg-white border border-project-border shadow-2xl transition-transform duration-300 outline-none",
            "rounded-xl overflow-hidden",
            "w-[95%] md:w-[75%] lg:w-145",
            "duration-300 ease-in-out transition-all",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right",
          )}
        >
          {/* Header Section  */}
          <div className="flex items-center justify-between px-2 md:px-6 py-4 border-b border-project-border shrink-0">
            <div className="flex items-center md:gap-2 gap-1 justify-between">
              <SheetPrimitive.Close asChild>
                <IconButton
                  variant="noOutline"
                  className="text-project-foreground"
                >
                  <ChevronLeft className="size-5 md:size-6" />
                </IconButton>
              </SheetPrimitive.Close>
              <SheetPrimitive.Title asChild>
                <Text
                  variant="semibold-xl"
                  as="h2"
                  className="text-project-accent leading-none text-base md:text-lg"
                >
                  {title}
                </Text>
              </SheetPrimitive.Title>
            </div>
            <SheetPrimitive.Close asChild>
              <IconButton variant="noOutline">
                <X className="size-5 md:size-6" />
              </IconButton>
            </SheetPrimitive.Close>
          </div>

          {/* ACCESSIBILITY: Description (Visually hidden but readable by screen readers) */}
          <VisuallyHidden.Root>
            <SheetPrimitive.Description>
              Side panel containing {title} information.
            </SheetPrimitive.Description>
          </VisuallyHidden.Root>

          {/* Dynamic Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-8">{children}</div>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  );
};

export default React.memo(SidePanel);
