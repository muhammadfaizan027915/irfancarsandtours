import { BookingListResponseDto } from "@icat/contracts";

export type UserBookingsTableProps = {
  bookings: BookingListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};
