"use client";

import { BookingWithUserListItemDto } from "@icat/contracts";
import { ColumnDef } from "@tanstack/react-table";
import { BookedByCell } from "./bookedbycell";
import { format } from "date-fns";

export const bookingsColumns: ColumnDef<BookingWithUserListItemDto>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorKey: "pickupDate",
    header: "Pickup Date",
    cell: ({ row }) => format(new Date(row.original.pickupDate), "dd MMM yyyy"),
  },
  {
    accessorKey: "pickupAddress",
    header: "Pickup Address",
  },
  {
    accessorKey: "dropoffDate",
    header: "Dropoff Date",
    cell: ({ row }) =>
      row.original.dropoffDate
        ? format(new Date(row.original.dropoffDate), "dd MMM yyyy")
        : "—",
  },
  {
    accessorKey: "dropoffAddress",
    header: "Dropoff Address",
  },
  {
    accessorKey: "bookedBy",
    header: "Booked By",
    cell: BookedByCell,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) =>
      format(new Date(row.original.createdAt!), "dd MMM yyyy hh:mm a"),
  },
];
