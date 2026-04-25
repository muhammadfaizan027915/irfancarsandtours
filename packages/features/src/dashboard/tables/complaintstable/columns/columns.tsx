"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ComplaintResponseDto } from "@icat/contracts";
import { ComplaintActionsCell } from "./actionscell";
import { format } from "date-fns";

export const complaintColumns: ColumnDef<ComplaintResponseDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.original.message;
      return (
        <div className="max-w-[300px] truncate" title={message}>
          {message}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt), "PPP");
    },
  },
  {
    id: "actions",
    cell: ComplaintActionsCell,
  },
];
