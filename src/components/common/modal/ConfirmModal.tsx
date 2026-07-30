"use client";

import { useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  Ban,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { AppButton, AppModal, AppTextArea, Text } from "@/src/components";
import { cn } from "@/src/lib/utils/cn";

type TConfirmMode = "approve" | "reject" | "decline" | "cancel" | "info";

const MODE = {
  approve: {
    icon: BadgeCheck,
    tone: "border-project-success/30 bg-project-success/10 text-project-success",
    confirmText: "Approve",
    confirmVariant: "success",
    reasonLabel: "",
  },
  reject: {
    icon: Ban,
    tone: "border-project-destructive/30 bg-project-destructive/10 text-project-destructive",
    confirmText: "Reject",
    confirmVariant: "destructive",
    reasonLabel: "Reason for rejection",
  },
  decline: {
    icon: Ban,
    tone: "border-project-destructive/30 bg-project-destructive/10 text-project-destructive",
    confirmText: "Decline",
    confirmVariant: "destructive",
    reasonLabel: "Reason for declining",
  },
  cancel: {
    icon: AlertTriangle,
    tone: "border-project-destructive/30 bg-project-destructive/10 text-project-destructive",
    confirmText: "Yes, cancel it",
    confirmVariant: "destructive",
    reasonLabel: "",
  },
  info: {
    icon: Clock,
    tone: "border-project-primary/30 bg-project-muted-primary text-project-primary",
    confirmText: "Got it",
    confirmVariant: "primary",
    reasonLabel: "",
  },
} satisfies Record<
  TConfirmMode,
  {
    icon: LucideIcon;
    tone: string;
    confirmText: string;
    confirmVariant: "success" | "destructive" | "primary";
    reasonLabel: string;
  }
>;

interface IConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: TConfirmMode;
  title: string;
  description?: string;
  entityName?: string;
  confirmText?: string;
  isPending?: boolean;
  requireReason?: boolean;
  onConfirm?: (reason?: string) => void;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  mode,
  title,
  description,
  entityName,
  confirmText,
  isPending,
  requireReason,
  onConfirm,
}: IConfirmModalProps) => {
  const [reason, setReason] = useState("");

  const { icon: Icon, tone, reasonLabel, confirmVariant } = MODE[mode];
  const showReason = Boolean(reasonLabel);
  const isBlocked = requireReason && !reason.trim();

  const close = () => {
    setReason("");
    onClose();
  };

  const confirm = () => {
    onConfirm?.(reason.trim() || undefined);
    setReason("");
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={close}
      title={title}
      description={description}
      footer={
        <>
          {mode !== "info" && (
            <AppButton
              variant="outline"
              text="Cancel"
              onClick={close}
              disabled={isPending}
            />
          )}

          <AppButton
            variant={mode === "info" ? "primary" : confirmVariant}
            text={confirmText ?? MODE[mode].confirmText}
            onClick={mode === "info" ? close : confirm}
            disabled={isPending || isBlocked}
          />
        </>
      }
    >
      <div className="flex gap-4">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center border",
            tone,
          )}
        >
          <Icon className="size-5" />
        </span>

        <div className="min-w-0 flex-1 space-y-4">
          {entityName && (
            <Text
              variant="semibold-base"
              as="p"
              className="wrap-break-word text-project-accent"
            >
              {entityName}
            </Text>
          )}

          {showReason && (
            <AppTextArea
              label={reasonLabel}
              name="reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder={
                requireReason ? "Required" : "Optional — shared with the user"
              }
              maxLength={500}
              disabled={isPending}
            />
          )}
        </div>
      </div>
    </AppModal>
  );
};

export default ConfirmModal;
