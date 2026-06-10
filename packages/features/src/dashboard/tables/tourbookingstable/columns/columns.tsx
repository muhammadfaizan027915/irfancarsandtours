"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { TourBookingWithUserListItemResponseDto } from "@icat/contracts";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { FormattedDate } from "@icat/ui";

import { BookedByCell } from "./bookedbycell/bookedbycell";
import { StatusCell } from "./statuscell/statuscell";

export const tourBookingColumns: ColumnDef<TourBookingWithUserListItemResponseDto>[] =
  [
    {
      accessorKey: "id",
      header: "Booking ID",
      size: 120,
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      size: 140,
      cell: ({ row }) => (
        <span className="font-bold text-primary">
          Rs. {row.original.totalPrice.toLocaleString()}
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
          date={row.original.createdAt}
          formatStr="dd MMM yyyy hh:mm a"
        />
      ),
    },
    {
      id: "actions",
      size: 80,
      cell: ({ row }) => (
        <Link
          href={`${DashboardNavigationUrls.BOOKINGS_TOURS}/${row.original.id}`}
          className="text-primary flex justify-center"
        >
          <ExternalLink size={18} />
        </Link>
      ),
    },
  ];
