import { ComplaintResponseDto } from "@icat/contracts";
import { Row } from "@tanstack/react-table";

export interface ComplaintCellProps {
  row: Row<ComplaintResponseDto>;
}
