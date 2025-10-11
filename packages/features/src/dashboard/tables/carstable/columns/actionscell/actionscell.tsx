import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@icat/ui/components/dropdown-menu";
import { Button } from "@icat/ui/components/button";
import { toast } from "@icat/ui/components/sonner";
import { CarCellPorps } from "../columns.types";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { deleteCar } from "@icat/web/actions";
import Link from "next/link";

export function CarActionsCell({ row }: CarCellPorps) {
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
        <DropdownMenuItem variant="destructive" onClick={handleDeleteCar}>
          <Trash2 size={18} className="inline" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
