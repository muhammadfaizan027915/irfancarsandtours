import { BookedTourListResponseDto } from "@icat/contracts";

export type BookedToursTableProps = {
  bookedTours: BookedTourListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};