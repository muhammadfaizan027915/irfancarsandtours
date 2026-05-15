"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { Button } from "@icat/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@icat/ui/components/dropdown-menu";
import { toast } from "@icat/ui/components/sonner";
import { deleteCar } from "@icat/web/actions";

import { CarCellProps } from "../columns.types";

export function CarActionsCell({ row }: CarCellProps) {
  const carId = row.original.id;

  const handleDeleteCar = async () => {
    const result = await deleteCar(carId);

    if (result.error) {
      return toast.error("Failed to delete car, try again later.", {
        position: "top-center",
      });
    }

    return toast.success("Car deleted successfully.", {
      position: "top-center",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`${NavigationUrls.CARS}/${carId}`} target="_blank">
              <Eye size={18} className="inline mr-2" /> View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${DashboardNavigationUrls.CARS}/${carId}/edit`}>
              <Pencil size={18} className="inline mr-2" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleDeleteCar}>
            <Trash2 size={18} className="inline mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
