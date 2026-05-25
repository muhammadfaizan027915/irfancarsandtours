"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DetailedUserResponseDto } from "@icat/contracts";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { getNameInitials } from "@icat/lib/utils";
import { FormattedDate } from "@icat/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@icat/ui/components/avatar";

export const customersColumns: ColumnDef<DetailedUserResponseDto>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      const name = row.original.name;
      const nameInitials = getNameInitials(name);

      return (
        <Avatar className="h-10 w-10">
          <AvatarImage
            className="object-cover"
            src={imageUrl || ""}
            alt={name}
          />
          <AvatarFallback className="bg-primary/10 text-primary">
            {nameInitials}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`${DashboardNavigationUrls.CUSTOMERS}/${row.original.id}`}
        className="font-medium hover:underline text-primary"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <Link
        href={`mailto:${row.original.email}`}
        className="text-secondary-foreground underline"
      >
        {row.original.email}
      </Link>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <Link
        href={`tel:${row.original.phone}`}
        className="text-secondary-foreground underline"
      >
        {row.original.phone || "—"}
      </Link>
    ),
  },
  {
    accessorKey: "cnic",
    header: "CNIC",
    cell: ({ row }) => row.original.cnic || "—",
  },
  {
    accessorKey: "createdAt",
    header: "Joined On",
    cell: ({ row }) => (
      <FormattedDate
        date={row.original.createdAt}
        formatStr="dd MMM yyyy, hh:mm a"
      />
    ),
  },
];
