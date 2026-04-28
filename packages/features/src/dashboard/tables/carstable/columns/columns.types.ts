import { CellContext } from "@tanstack/react-table";

import { CarListItemResponseDto } from "@icat/contracts";

export type CarCellPorps = CellContext<CarListItemResponseDto, unknown>;
