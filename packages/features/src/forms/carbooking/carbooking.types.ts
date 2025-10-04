import { CarBookingRequestDto } from "@icat/contracts";

export type CarBookingFormProps = {
  defaultValue?: Partial<
    Pick<CarBookingRequestDto, "name" | "email" | "cnic" | "phone">
  >;
};
