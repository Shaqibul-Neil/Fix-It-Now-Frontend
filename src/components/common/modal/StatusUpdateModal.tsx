"use client";

import { useState } from "react";
import { AppButton, AppModal, AppSelect, AppTextArea } from "@/src/components";
import type { TSelectOption } from "@/src/types/filter.types";

interface IStatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  label?: string;
  options: TSelectOption[];
  noteLabel?: string;
  // Off where the endpoint takes no note, so the field cannot promise one.
  showNote?: boolean;
  isPending?: boolean;
  onSubmit: (status: string, note?: string) => void;
}

const StatusUpdateModal = ({
  isOpen,
  onClose,
  title,
  description,
  label = "New status",
  options,
  noteLabel = "Note",
  showNote = true,
  isPending,
  onSubmit,
}: IStatusUpdateModalProps) => {
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const close = () => {
    setStatus("");
    setNote("");
    onClose();
  };

  const submit = () => {
    if (!status) return;
    onSubmit(status, showNote ? note.trim() || undefined : undefined);
    setStatus("");
    setNote("");
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={close}
      title={title}
      description={description}
      footer={
        <>
          <AppButton
            variant="outline"
            text="Cancel"
            onClick={close}
            disabled={isPending}
          />
          <AppButton
            variant="primary"
            text="Update status"
            onClick={submit}
            disabled={isPending || !status}
          />
        </>
      }
    >
      <div className="space-y-4">
        <AppSelect
          label={label}
          placeholder="Select a status"
          options={options}
          value={status || undefined}
          onChange={setStatus}
          disabled={isPending}
          className="w-full"
        />

        {showNote && (
          <AppTextArea
            label={noteLabel}
            name="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Optional — shared with the customer"
            maxLength={500}
            disabled={isPending}
          />
        )}
      </div>
    </AppModal>
  );
};

export default StatusUpdateModal;
