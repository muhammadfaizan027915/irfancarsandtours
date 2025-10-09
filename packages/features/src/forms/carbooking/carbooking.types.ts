import { BookingRequestDto } from "@icat/contracts";

export type CarBookingFormProps = {
  defaultValue?: Partial<
    Pick<BookingRequestDto, "name" | "email" | "cnic" | "phone" | "cars">
  >;
};
