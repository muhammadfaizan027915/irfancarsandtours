"use client";

import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { BookingWithUserListItemResponseDto } from "@icat/contracts";
import { ColumnDef } from "@tanstack/react-table";
import { BookedByCell } from "./bookedbycell";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

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
      cell: ({ row }) =>
        format(new Date(row.original.pickupDate), "dd MMM yyyy"),
    },
    {
      accessorKey: "dropoffDate",
      header: "Dropoff Date",
      size: 140,
      cell: ({ row }) =>
        format(new Date(row.original.dropoffDate), "dd MMM yyyy"),
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
      accessorKey: "createdAt",
      header: "Created",
      size: 180,
      cell: ({ row }) =>
        format(new Date(row.original.createdAt!), "dd MMM yyyy hh:mm a"),
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
