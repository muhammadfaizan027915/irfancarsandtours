import { BookedTourWithTourListResponseDto } from "@icat/contracts";

export type UserBookedToursTableProps = {
  bookedTours: BookedTourWithTourListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};
