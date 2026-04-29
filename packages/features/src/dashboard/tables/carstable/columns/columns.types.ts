import { CellContext } from "@tanstack/react-table";

import { CarListItemResponseDto } from "@icat/contracts";

export type CarCellProps = CellContext<CarListItemResponseDto, unknown>;
