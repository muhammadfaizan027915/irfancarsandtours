"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TourListItemResponseDto } from "@icat/contracts";
import { Badge, FormattedDate } from "@icat/ui";

import { TourActionsCell } from "./actionscell/actionscell";
import { TourImageCell } from "./imagecell";

export const tourColumns: ColumnDef<TourListItemResponseDto>[] = [
  {
    accessorKey: "imageUrls",
    header: "Image",
    cell: TourImageCell,
  },
  {
    accessorKey: "name",
    header: "Tour Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <FormattedDate date={row.getValue("startDate")} formatStr="PPPp" />
    ),
  },
  {
    accessorKey: "pricePerAdult",
    header: "Price (Adult)",
    cell: ({ row }) => `Rs. ${row.getValue("pricePerAdult")}`,
  },
  {
    accessorKey: "maxCapacity",
    header: "Max Capacity",
  },
  {
    accessorKey: "isFeatured",
    header: "Status",
    cell: ({ row }) =>
      row.getValue("isFeatured") ? (
        <Badge variant="default">Featured</Badge>
      ) : (
        <Badge variant="outline">Standard</Badge>
      ),
  },
  {
    id: "actions",
    cell: TourActionsCell,
  },
];
