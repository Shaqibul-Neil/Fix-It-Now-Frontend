export type TPeriod = "7" | "30" | "90";
export type TSelectOption = {
  label: string;
  value: string;
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
  rating: {
    options: TSelectOption[];
  };
}
