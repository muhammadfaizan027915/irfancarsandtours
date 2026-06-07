"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { BookedTourWithTourResponseDto } from "@icat/contracts";
import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { SmallImage } from "@icat/ui/components/small-image";

export const userBookedToursColumns: ColumnDef<BookedTourWithTourResponseDto>[] = [
  {
    id: "tour",
    header: "Tour",
    cell: ({ row }) => {
      const tour = row.original.tour;
      const imageUrl = tour?.imageUrls?.[0];

      return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <SmallImage src={imageUrl} alt={tour?.name} />

          <Link
            href={`${NavigationUrls.TOURS}/${tour?.id}`}
            target="_blank"
            className="hover:text-primary hover:underline"
          >
            <strong>{tour?.name}</strong>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "adultsNumber",
    header: "Adults",
  },
  {
    accessorKey: "childrenNumber",
    header: "Children",
  },
  {
    accessorKey: "quotedPricePerAdult",
    header: "Price/Adult",
    cell: ({ row }) => `Rs. ${row.original.quotedPricePerAdult.toLocaleString()}`,
  },
  {
    accessorKey: "quotedPricePerChild",
    header: "Price/Child",
    cell: ({ row }) => `Rs. ${row.original.quotedPricePerChild.toLocaleString()}`,
  },
  {
    id: "total",
    header: "Subtotal",
    cell: ({ row }) => {
      const total = 
        (row.original.quotedPricePerAdult * row.original.adultsNumber) + 
        (row.original.quotedPricePerChild * row.original.childrenNumber);
      return `Rs. ${total.toLocaleString()}`;
    },
  },
];
