export type TPeriod = "7" | "30" | "90";
export type TSelectOption = {
  label: string;
  value: string;
  // Tabs mark each status with a colored dot; selects ignore it.
  dotClassName?: string;
};

export interface IFilterConfig {
  period: {
    options: TSelectOption[];
  };
  bookingStatus: {
    options: TSelectOption[];
  };
  paymentStatus: {
    options: TSelectOption[];
  };
  reviewStatus: {
    options: TSelectOption[];
  };
  approvalStatus: {
    options: TSelectOption[];
  };
  recordStatus: {
    options: TSelectOption[];
  };
  accountStatus: {
    options: TSelectOption[];
  };
  role: {
    options: TSelectOption[];
  };
  rating: {
    options: TSelectOption[];
  };
  minRating: {
    options: TSelectOption[];
  };
  city: {
    options: TSelectOption[];
  };
}
