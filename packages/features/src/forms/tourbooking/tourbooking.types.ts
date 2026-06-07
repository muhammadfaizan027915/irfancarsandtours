import { TourBookingBodyDto } from "@icat/contracts";

export type TourBookingFormProps = {
  defaultValue?: Partial<
    Pick<TourBookingBodyDto, "name" | "email" | "cnic" | "phone" | "tours">
  >;
  hideNumberOfAdultsAndChildren?: boolean;
};
