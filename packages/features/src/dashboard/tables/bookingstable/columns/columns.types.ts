import { CellContext } from "@tanstack/react-table";

import { BookingWithUserListItemResponseDto } from "@icat/contracts";

export type BookingCellPorps = CellContext<BookingWithUserListItemResponseDto, unknown>;
