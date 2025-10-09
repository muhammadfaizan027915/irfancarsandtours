import { UsersListResponseDto } from "@icat/contracts";

export type CustomersTableProps = {
  customers: UsersListResponseDto;
  pagination?: { total: number; page: number; pages: number; limit: number };
};
