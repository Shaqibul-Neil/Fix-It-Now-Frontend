"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppButton,
  AppModal,
  AppSelect,
  AppTextArea,
} from "@/src/components";
import { TECHNICIAN_DECISION_OPTIONS } from "@/src/lib/options/filter.options";
import { TECHNICIAN_APPROVAL_STATUS } from "@/src/types/types";
import { useReviewTechnicianMutation } from "../hooks/useTechnicianMutation";
import {
  technicianApprovalSchema,
  type TTechnicianApprovalForm,
} from "../schema/technician.schema";
import type { ITechnicianApprovalTarget } from "../types/technician.types";

interface ITechnicianApprovalModalProps {
  target: ITechnicianApprovalTarget | null;
  onClose: () => void;
}

const TechnicianApprovalModal = ({
  target,
  onClose,
}: ITechnicianApprovalModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTechnicianApprovalForm>({
    resolver: zodResolver(technicianApprovalSchema),
    defaultValues: { rejectionReason: "" },
  });

  // Every control starts over for whichever row opened the modal.
  const [lastTarget, setLastTarget] = useState(target);
  if (target !== lastTarget) {
    setLastTarget(target);
    if (target) reset({ rejectionReason: "" });
  }

  const reviewTechnician = useReviewTechnicianMutation(onClose);

  // Re-sending the decision a technician already carries is a 409 on the
  // backend, so that option is not offered.
  const options = TECHNICIAN_DECISION_OPTIONS.filter(
    (option) => option.value !== target?.approvalStatus,
  );

  const status = useWatch({ control, name: "status" });
  const isRejecting = status === TECHNICIAN_APPROVAL_STATUS.REJECTED;

  const submit = handleSubmit((values) => {
    if (!target) return;

    reviewTechnician.mutate({
      id: target.id,
      payload: {
        status: values.status,
        rejectionReason: isRejecting ? values.rejectionReason : undefined,
      },
    });
  });

  return (
    <AppModal
      isOpen={Boolean(target)}
      onClose={onClose}
      title="Review this application"
      description={target?.name}
      footer={
        <>
          <AppButton
            variant="outline"
            text="Cancel"
            onClick={onClose}
            disabled={reviewTechnician.isPending}
          />
          <AppButton
            type="submit"
            form="technician-approval-form"
            text="Submit decision"
            disabled={reviewTechnician.isPending}
          />
        </>
      }
    >
      <form
        id="technician-approval-form"
        className="space-y-4"
        onSubmit={submit}
      >
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <AppSelect
              label="Decision"
              placeholder="Select a decision"
              options={options}
              value={field.value}
              onChange={field.onChange}
              error={errors.status?.message}
              disabled={reviewTechnician.isPending}
            />
          )}
        />

        {isRejecting && (
          <AppTextArea
            label="Reason"
            placeholder="What the technician has to fix before re-applying"
            maxLength={500}
            disabled={reviewTechnician.isPending}
            error={errors.rejectionReason?.message}
            {...register("rejectionReason")}
          />
        )}
      </form>
    </AppModal>
  );
};

export default TechnicianApprovalModal;
