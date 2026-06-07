"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { TourBookingListItemResponseDto } from "@icat/contracts";
import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { FormattedDate } from "@icat/ui";

export const userTourBookingsColumns: ColumnDef<TourBookingListItemResponseDto>[] = [
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
      <span>Rs. {row.original.totalPrice.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 140,
    cell: ({ row }) => (
      <span className="capitalize">{row.original.status}</span>
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
          href={`${NavigationUrls.BOOKINGS_TOURS}/${row.original.id}`}
          className="text-primary"
        >
          <ExternalLink size={18} />
        </Link>
      );
    },
  },
];
