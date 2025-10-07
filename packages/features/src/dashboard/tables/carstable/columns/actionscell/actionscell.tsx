import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@icat/ui";
import { CarCellPorps } from "../columns.types";
import { NavigationUrls } from "@icat/features/header";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export function CarActionsCell({ row }: CarCellPorps) {
  const carId = row.original.id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`${NavigationUrls.CARS}/${carId}`} target="_blank">
            <Eye size={18} className="inline" /> View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`${DashboardNavigationUrls.CARS}/${carId}/edit`}>
            <Pencil size={18} className="inline" /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 size={18} className="inline" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
