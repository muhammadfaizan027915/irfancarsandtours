import { CarsListResponseDto } from "@icat/contracts";

export type CarsTableProps = {
  cars: CarsListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};
