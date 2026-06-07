"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { ComplaintResponseDto } from "@icat/contracts";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  FormattedDate,
} from "@icat/ui";

import { StatusCell } from "./statuscell";

export const complaintColumns: ColumnDef<ComplaintResponseDto>[] = [
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
    cell: ({ row }) => (
      <Link
        href={`tel:${row.original.phone}`}
        className="text-secondary-foreground underline shadow-none"
      >
        {row.original.phone || "—"}
      </Link>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.original.message;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer transition-all mx-auto">
            <Button variant="ghost" size="sm" className="gap-2">
              View Message
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full max-w-dvw wrap-break-word rounded-2xl shadow-lg m-4 p-4 border border-border/50">
            <div className="max-w-sm whitespace-pre-wrap">{message}</div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <FormattedDate date={row.original.createdAt} formatStr="PPP" />
    ),
  },
];
