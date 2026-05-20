import { CellContext } from "@tanstack/react-table";

import { BookingWithUserListItemResponseDto } from "@icat/contracts";

export type BookingCellProps = CellContext<BookingWithUserListItemResponseDto, unknown>;
