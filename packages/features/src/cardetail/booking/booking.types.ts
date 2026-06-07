import { BookingRequestDto, TourBookingBodyDto } from "@icat/contracts";

export type CarBookingProps = Pick<BookingRequestDto, "cars"> & {
  tours?: TourBookingBodyDto["tours"];
};
