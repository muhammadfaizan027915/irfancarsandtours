"use client";

import { ColumnDef } from "@tanstack/react-table";

import { BookedTourListItemResponseDto } from "@icat/contracts";
import { userBookedToursColumns } from "@icat/features/tables";

import { QuotePriceCell } from "./quotepricecell";

export const bookedToursColumns: ColumnDef<BookedTourListItemResponseDto>[] = [
  ...userBookedToursColumns,
  {
    id: "quotePrice",
    header: "Quote Price",
    cell: QuotePriceCell,
  },
];
