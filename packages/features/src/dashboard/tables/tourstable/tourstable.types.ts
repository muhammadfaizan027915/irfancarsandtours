import { ToursListResponseDto } from "@icat/contracts";

export type ToursTableProps = {
  tours: ToursListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};
