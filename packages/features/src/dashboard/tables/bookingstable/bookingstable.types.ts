import { BookingWithUserListResponseDto } from "@icat/contracts";

export type BookingsTableProps = {
  bookings: BookingWithUserListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};
