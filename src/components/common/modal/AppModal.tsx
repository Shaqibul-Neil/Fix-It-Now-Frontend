import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hasHeaderBorder?: boolean;
}

const AppModal = React.memo(
  ({
    isOpen,
    onClose,
    title,
    children,
    className,
    hasHeaderBorder,
  }: AppModalProps) => {
    return (
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <AnimatePresence>
          {isOpen && (
            <Dialog.Portal forceMount>
              {/* Optimized Backdrop Overlay */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-200 bg-black/40 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              {/*  Modal Wrapper Positioning */}
              <div className="fixed inset-0 z-210 flex items-center justify-center p-4">
                <Dialog.Content asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 15 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className={cn(
                      "relative bg-white shadow-2xl rounded-xl outline-none py-4",
                      "overflow-hidden",

                      className,
                    )}
                  >
                    <div
                      className={cn(
                        "flex justify-between items-center w-full md:px-6 px-0",
                        hasHeaderBorder &&
                          "border-b border-project-border pb-2 px-4",
                      )}
                    >
                      {/* Title Part */}
                      <div className="flex-1 text-left flex items-center h-8 capitalize">
                        {title &&
                          (typeof title === "string" ? (
                            <Dialog.Title className="text-xl font-semibold text-project-foreground">
                              {title}
                            </Dialog.Title>
                          ) : (
                            <Dialog.Title asChild>
                              <div>{title}</div>
                            </Dialog.Title>
                          ))}
                      </div>
                      {/* Close Icon */}
                      <Dialog.Close asChild>
                        <IconButton variant="noOutline" className="shrink-0">
                          <X className="size-6" />
                        </IconButton>
                      </Dialog.Close>
                    </div>

                    {/* Dynamic Content (Buttons, Text, etc.) */}
                    <div className="flex flex-col items-center justify-center text-center w-full h-full">
                      {children}
                    </div>
                  </motion.div>
                </Dialog.Content>
              </div>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    );
  },
);

export default AppModal;
