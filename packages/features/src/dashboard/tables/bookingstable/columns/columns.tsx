"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { BookingWithUserListItemResponseDto } from "@icat/contracts";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { FormattedDate } from "@icat/ui";

import { BookedByCell } from "./bookedbycell";
import { StatusCell } from "./statuscell";

export const bookingsColumns: ColumnDef<BookingWithUserListItemResponseDto>[] =
  [
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
      cell: ({ row }) => (
        <FormattedDate
          date={row.original.dropoffDate}
          formatStr="dd MMM yyyy"
        />
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
      accessorKey: "bookedBy",
      header: "Booked By",
      size: 180,
      cell: BookedByCell,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 140,
      cell: StatusCell,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
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
      size: 80,
      cell: ({ row }) => (
        <Link
          href={`${DashboardNavigationUrls.BOOKINGS}/${row.original.id}`}
          className="text-primary flex justify-center"
        >
          <ExternalLink size={18} />
        </Link>
      ),
    },
  ];
