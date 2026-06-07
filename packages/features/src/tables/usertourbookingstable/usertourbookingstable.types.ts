import { TourBookingListResponseDto } from "@icat/contracts";

export type UserTourBookingsTableProps = {
  bookings: TourBookingListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};
