"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { Button } from "@icat/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@icat/ui/components/dropdown-menu";
import { toast } from "@icat/ui/components/sonner";
import { deleteTour } from "@icat/web/actions";

import { TourCellProps } from "../columns.types";

export function TourActionsCell({ row }: TourCellProps) {
  const tourId = row.original.id;

  const handleDeleteTour = async () => {
    const result = await deleteTour(tourId);

    if (result.error) {
      return toast.error("Failed to delete tour, try again later.", {
        position: "top-center",
      });
    }

    return toast.success("Tour deleted successfully.", {
      position: "top-center",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="default">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`${NavigationUrls.TOURS}/${tourId}`} target="_blank">
              <Eye size={18} className="inline mr-2" /> View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${DashboardNavigationUrls.TOURS}/${tourId}/edit`}>
              <Pencil size={18} className="inline mr-2" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleDeleteTour}>
            <Trash2 size={18} className="inline mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
