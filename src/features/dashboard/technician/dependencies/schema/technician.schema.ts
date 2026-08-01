import { z } from "zod";
import { TECHNICIAN_APPROVAL_STATUS } from "@/src/types/types";

// Mirrors the backend's reviewTechnicianSchema: a rejection has to say why.
export const technicianApprovalSchema = z
  .object({
    status: z.enum(
      [
        TECHNICIAN_APPROVAL_STATUS.APPROVED,
        TECHNICIAN_APPROVAL_STATUS.REJECTED,
      ],
      { message: "Pick a decision" },
    ),

    rejectionReason: z
      .string()
      .trim()
      .max(500, "Reason cannot exceed 500 characters")
      .optional(),
  })
  .superRefine(({ status, rejectionReason }, ctx) => {
    if (status !== TECHNICIAN_APPROVAL_STATUS.REJECTED) return;

    if ((rejectionReason ?? "").length < 10) {
      ctx.addIssue({
        code: "custom",
        path: ["rejectionReason"],
        message: "A rejection needs a reason of at least 10 characters",
      });
    }
  });

export type TTechnicianApprovalForm = z.infer<typeof technicianApprovalSchema>;
