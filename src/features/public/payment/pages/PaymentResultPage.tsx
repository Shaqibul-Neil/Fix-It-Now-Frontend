import { AppButton, ResultState } from "@/src/components";
import { PAYMENT_RESULT } from "../dependencies/constants/payment.content";
import type { TPaymentResult } from "../dependencies/types/payment.types";

interface IPaymentResultPageProps {
  variant: TPaymentResult;
  transactionId?: string;
}

const PaymentResultPage = ({
  variant,
  transactionId,
}: IPaymentResultPageProps) => {
  const { tone, icon, title, description } = PAYMENT_RESULT[variant];

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <ResultState
        tone={tone}
        icon={icon}
        title={title}
        description={description}
        meta={
          transactionId
            ? [{ label: "Reference", value: transactionId }]
            : undefined
        }
        actions={
          <>
            <AppButton
              text="Go to my bookings"
              href="/dashboard/customer/bookings"
            />

            {variant === "success" && (
              <AppButton
                variant="outline"
                text="View my payments"
                href="/dashboard/customer/payments"
              />
            )}
          </>
        }
      />
    </section>
  );
};

export default PaymentResultPage;
