import { TourBookingWithUserListResponseDto } from "@icat/contracts";

export type TourBookingsTableProps = {
  tourBookings: TourBookingWithUserListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};