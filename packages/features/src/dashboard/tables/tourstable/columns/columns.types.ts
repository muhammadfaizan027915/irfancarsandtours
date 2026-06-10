import { CellContext } from "@tanstack/react-table";

import { TourListItemResponseDto } from "@icat/contracts";

export type TourCellProps = CellContext<TourListItemResponseDto, unknown>;
