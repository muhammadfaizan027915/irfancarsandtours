"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@icat/ui/components/dropdown-menu";
import { Button } from "@icat/ui/components/button";
import { toast } from "@icat/ui/components/sonner";
import { ComplaintCellProps } from "../columns.types";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { deleteComplaint } from "@icat/web/actions";

export function ComplaintActionsCell({ row }: ComplaintCellProps) {
  const complaintId = row.original.id;

  const handleDeleteComplaint = async () => {
    const result = await deleteComplaint(complaintId);

    if (result && result.error) {
      return toast.error("Failed to delete complaint, try again later.", {
        position: "top-center",
      });
    }

    return toast.success("Complaint deleted successfully.", {
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
        <DropdownMenuItem variant="destructive" onClick={handleDeleteComplaint}>
          <Trash2 size={18} className="inline mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
