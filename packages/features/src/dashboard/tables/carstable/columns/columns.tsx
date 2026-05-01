"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CarListItemResponseDto } from "@icat/contracts";

import { CarActionsCell } from "./actionscell";
import { CarImageCell } from "./imagecell";

export const carsColumns: ColumnDef<CarListItemResponseDto>[] = [
  {
    accessorKey: "imageUrls",
    header: "Image",
    cell: CarImageCell,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "carType",
    header: "Type",
  },
  {
    accessorKey: "fuelType",
    header: "Fuel Type",
  },
  {
    id: "actions",
    cell: CarActionsCell,
  },
];
