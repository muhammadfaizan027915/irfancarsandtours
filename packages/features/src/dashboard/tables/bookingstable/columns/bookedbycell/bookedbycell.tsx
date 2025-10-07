import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@icat/ui";
import { BookingCellPorps } from "../columns.types";
import { getNameInitials } from "@icat/lib/utils";
import { Mail, IdCard, Phone } from "lucide-react";
import Link from "next/link";

export function BookedByCell({ row }: BookingCellPorps) {
  const bookedBy = row.original.bookedBy;
  const nameInitials = getNameInitials(bookedBy?.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer ring-2 ring-muted-foreground/20 hover:ring-primary transition-all">
          <AvatarImage src={bookedBy?.image || ""} alt={bookedBy?.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {nameInitials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-2xl shadow-lg p-2 border border-border/50"
      >
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={bookedBy?.image || ""} alt={bookedBy?.name} />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold truncate">{bookedBy?.name ?? "Unknown"}</h3>
            <p className="text-sm text-muted-foreground">Customer Profile</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="truncate w-inherit">
          <Link href={`mailto:${bookedBy?.email}`}>
            <Mail size={18} className="inline" />{" "}
            {bookedBy?.email ?? "No email"}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="truncate">
          <Link href={`tel:${bookedBy?.phone}`}>
            <Phone size={18} className="inline" />{" "}
            {bookedBy?.phone ?? "No phone"}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="truncate">
          <IdCard size={18} className="inline" /> {bookedBy?.cnic ?? "No CNIC"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          className={
            "text-center text-primary font-medium py-2 cursor-pointer hover:bg-primary/10 transition"
          }
        >
          <div>View Full Profile</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
