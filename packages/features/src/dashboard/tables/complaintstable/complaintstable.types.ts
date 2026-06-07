import {
  ComplaintsListResponseDto,
} from "@icat/contracts";

export type ComplaintsTableProps = {
  complaints: ComplaintsListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};
