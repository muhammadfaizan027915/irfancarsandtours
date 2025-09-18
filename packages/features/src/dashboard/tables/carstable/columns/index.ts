"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CarSelect } from "@icat/database";

export const columns: ColumnDef<CarSelect>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
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
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "fuelType",
    header: "Fuel Type",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
