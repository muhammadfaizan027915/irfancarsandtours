import { BookingRequestDto, TourBookingBodyDto } from "@icat/contracts";

export type CarBookingProps = Pick<Partial<BookingRequestDto>, "cars">
