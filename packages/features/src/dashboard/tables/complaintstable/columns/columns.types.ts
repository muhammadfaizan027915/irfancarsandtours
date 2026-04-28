import { Row } from "@tanstack/react-table";

import { ComplaintResponseDto } from "@icat/contracts";

export interface ComplaintCellProps {
  row: Row<ComplaintResponseDto>;
}
