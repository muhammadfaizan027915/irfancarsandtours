"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { BookingListItemResponseDto } from "@icat/contracts";
import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { FormattedDate } from "@icat/ui";

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
    cell: ({ row }) => (
      <FormattedDate date={row.original.pickupDate} formatStr="dd MMM yyyy" />
    ),
  },
  {
    accessorKey: "dropoffDate",
    header: "Dropoff Date",
    size: 140,
    cell: ({ row }) =>
      row.original.dropoffDate ? (
        <FormattedDate
          date={row.original.dropoffDate}
          formatStr="dd MMM yyyy"
        />
      ) : (
        "—"
      ),
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
    cell: ({ row }) => (
      <FormattedDate
        date={row.original.createdAt!}
        formatStr="dd MMM yyyy hh:mm a"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link
          href={`${NavigationUrls.BOOKINGS_CARS}/${row.original.id}`}
          className="text-primary"
        >
          <ExternalLink size={18} />
        </Link>
      );
    },
  },
];
