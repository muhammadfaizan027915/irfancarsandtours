import { CarListItemResponseDto } from "@icat/contracts";
import { CellContext } from "@tanstack/react-table";

export type CarCellPorps = CellContext<CarListItemResponseDto, unknown>;
