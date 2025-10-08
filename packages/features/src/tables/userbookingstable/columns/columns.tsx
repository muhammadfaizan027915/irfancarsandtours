"use client";

import { BookingListItemResponseDto } from "@icat/contracts";
import { ColumnDef } from "@tanstack/react-table";
import { NavigationUrls } from "@icat/features/header";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export const userBookingsColumns: ColumnDef<BookingListItemResponseDto>[] = [
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
    accessorKey: "dropoffDate",
    header: "Dropoff Date",
    cell: ({ row }) =>
      row.original.dropoffDate
        ? format(new Date(row.original.dropoffDate), "dd MMM yyyy")
        : "—",
  },
  {
    accessorKey: "pickupAddress",
    header: "Pickup Address",
  },
  {
    accessorKey: "dropoffAddress",
    header: "Dropoff Address",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) =>
      format(new Date(row.original.createdAt!), "dd MMM yyyy hh:mm a"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link
          href={`${NavigationUrls.BOOKINGS}/${row.original.id}`}
          className="text-primary"
        >
          <ExternalLink size={18} />
        </Link>
      );
    },
  },
];
