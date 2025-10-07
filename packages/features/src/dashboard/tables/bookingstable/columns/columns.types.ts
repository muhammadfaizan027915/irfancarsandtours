import { BookingWithUserListItemDto } from "@icat/contracts";
import { CellContext } from "@tanstack/react-table";

export type BookingCellPorps = CellContext<BookingWithUserListItemDto, unknown>;
