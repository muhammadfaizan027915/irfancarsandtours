"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { BookingListItemResponseDto } from "@icat/contracts";
import { NavigationUrls } from "@icat/features/header/header.constants";

export const userBookingsColumns: ColumnDef<BookingListItemResponseDto>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
    size: 120,
  },
  {
    accessorKey: "pickupDate",
    header: "Pickup Date",
    size: 140,
    cell: ({ row }) => format(new Date(row.original.pickupDate), "dd MMM yyyy"),
  },
  {
    accessorKey: "dropoffDate",
    header: "Dropoff Date",
    size: 140,
    cell: ({ row }) =>
      row.original.dropoffDate
        ? format(new Date(row.original.dropoffDate), "dd MMM yyyy")
        : "—",
  },
  {
    accessorKey: "pickupAddress",
    header: "Pickup Address",
    size: 220,
    cell: ({ row }) => (
      <span
        className="block max-w-[200px] truncate"
        title={row.original.pickupAddress}
      >
        {row.original.pickupAddress}
      </span>
    ),
  },
  {
    accessorKey: "dropoffAddress",
    header: "Dropoff Address",
    size: 220,
    cell: ({ row }) => (
      <span
        className="block max-w-[200px] truncate"
        title={row.original.dropoffAddress}
      >
        {row.original.dropoffAddress}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    size: 180,
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
