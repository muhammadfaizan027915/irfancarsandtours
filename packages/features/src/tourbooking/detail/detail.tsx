import { IdCard, Mail, Phone, User } from "lucide-react";
import Link from "next/link";

import { isUserAdmin } from "@icat/lib/auth";
import { FormattedDate } from "@icat/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@icat/ui/components/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@icat/ui/components/card";

import { TourBookingDetailProps } from "./detail.types";
import { TourBookingStatusSelector } from "@icat/features/dashboard/selectors";

export async function TourBookingDetail({ booking }: TourBookingDetailProps) {
  const isAdmin = await isUserAdmin();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
      <Card className="xl:col-span-4 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-xl">Tour Booking Information</CardTitle>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-normal">
                Status:
              </span>
              <TourBookingStatusSelector
                id={booking.id}
                status={booking.status}
                className="w-[130px] h-9 text-sm capitalize"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground text-sm">Booking ID</p>
              <p className="text-primary font-mono">{booking.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Booked At</p>
              <p className="font-medium">
                <FormattedDate date={booking.createdAt!} formatStr="PPPp" />
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground text-sm">Total Price</p>
                <p className="text-2xl font-bold text-primary">
                  Rs. {booking.totalPrice.toLocaleString()}
                </p>
              </div>
              {booking.notes && (
                <div>
                  <p className="text-muted-foreground text-sm">Notes</p>
                  <p className="text-sm italic">{booking.notes}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="xl:col-span-2 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Booked By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage
              className="object-cover"
              src={booking.bookedBy?.image || ""}
            />
            <AvatarFallback className="text-2xl">
              {(booking.name?.[0] || booking.bookedBy?.name?.[0]) ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary shrink-0" />
              <p className="font-medium truncate">
                {booking.name || booking.bookedBy?.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <Link
                href={`mailto:${booking.email || booking.bookedBy?.email}`}
                className="hover:underline truncate text-sm"
              >
                {booking.email || booking.bookedBy?.email}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <Link
                href={`tel:${booking.phone || booking.bookedBy?.phone}`}
                className="hover:underline text-sm"
              >
                {booking.phone || booking.bookedBy?.phone}
              </Link>
            </div>
            {(booking.cnic || booking.bookedBy?.cnic) && (
              <div className="flex items-center gap-3">
                <IdCard className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm">
                  {booking.cnic || booking.bookedBy?.cnic}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
