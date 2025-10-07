"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@icat/ui";
import { ColumnDef } from "@tanstack/react-table";
import { DetailedUserResponseDto } from "@icat/contracts";
import { getNameInitials } from "@icat/lib/utils";

export const customersColumns: ColumnDef<DetailedUserResponseDto>[] = [
  {
    accessorKey: "image",
    header: "Avatar",
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      const name = row.original.name;
      const nameInitials = getNameInitials(name);

      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={imageUrl || ""} alt={name} />
          <AvatarFallback>{nameInitials}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.email}`}
        className="text-blue-600 hover:underline"
      >
        {row.original.email}
      </a>
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
