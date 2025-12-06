import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@icat/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@icat/ui/components/avatar";
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
        <Avatar className="cursor-pointer transition-all mx-auto">
          <AvatarImage
            className="object-cover"
            src={bookedBy?.image || ""}
            alt={bookedBy?.name}
          />
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
            <AvatarImage
              className="object-cover"
              src={bookedBy?.image || ""}
              alt={bookedBy?.name}
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {nameInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold truncate">
              {bookedBy?.name ?? "Unknown"}
            </h3>
            <p className="text-sm text-muted-foreground">Customer Profile</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href={`mailto:${bookedBy?.email}`}
            className="truncate max-w-52"
          >
            <Mail size={18} className="inline" />{" "}
            {bookedBy?.email ?? "No email"}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href={`tel:${bookedBy?.phone}`} className="truncate max-w-52">
            <Phone size={18} className="inline" />{" "}
            {bookedBy?.phone ?? "No phone"}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <span className="truncate max-w-52">
            <IdCard size={18} className="inline" />{" "}
            {bookedBy?.cnic ?? "No CNIC"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
