import { Row } from "@tanstack/react-table";

import { ComplaintResponseDto } from "@icat/contracts";

export type ComplaintCellProps = {
  row: Row<ComplaintResponseDto>;
}
