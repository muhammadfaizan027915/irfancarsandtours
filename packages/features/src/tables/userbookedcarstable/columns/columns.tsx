"use client";

import { BookedCarWithCarResponseDto } from "@icat/contracts";
import { SmallImage } from "@icat/ui/components/small-image";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const userBookedCarsColumns: ColumnDef<BookedCarWithCarResponseDto>[] = [
  {
    id: "imageUrl",
    cell: ({ row }) => {
      const car = row.original.car;
      const imageUrl = car?.imageUrls?.[0];

      return <SmallImage src={imageUrl} alt={car?.name} />;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "bookedWithDriver",
    header: "Booked With Driver",
    cell: ({ row }) => (row.original.bookedWithDriver ? "Yes" : "No"),
  },
  {
    accessorKey: "quotedPrice",
    header: "Quoted Price",
    cell: ({ row }) => {
      const qoutedPrice = row.original?.quotedPrice;
      return qoutedPrice ? `${qoutedPrice} Rs` : "N/A";
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      const quotedPrice = row.original?.quotedPrice;
      return quotedPrice ? `${quantity * quotedPrice} Rs` : "N/A";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Booked On",
    cell: ({ row }) =>
      format(new Date(row.original.createdAt!), "dd MMM yyyy, hh:mm a"),
  },
];
