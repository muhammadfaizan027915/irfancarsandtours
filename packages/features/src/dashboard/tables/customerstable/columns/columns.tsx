"use client";

import { format } from "date-fns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@icat/ui/components/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { DetailedUserResponseDto } from "@icat/contracts";
import { getNameInitials } from "@icat/lib/utils";
import Link from "next/link";

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
    cell: ({ row }) => row.original.phone || "—",
  },
  {
    accessorKey: "cnic",
    header: "CNIC",
    cell: ({ row }) => row.original.cnic || "—",
  },
  {
    accessorKey: "createdAt",
    header: "Joined On",
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), "dd MMM yyyy, hh:mm a"),
  },
];
