import { Calendar, IdCard, Mail, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";

import { BookingStatusSelector } from "@icat/features/dashboard/selectors";
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

import { BookingDetailProps } from "./detail.types";

export async function BookingDetail({ booking }: BookingDetailProps) {
  const isAdmin = await isUserAdmin();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
      <Card className="xl:col-span-4 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-xl">Booking Information</CardTitle>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-normal">
                Status:
              </span>
              <BookingStatusSelector
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
              <p className="text-muted-foreground">Booking ID</p>
              <p className="text-primary font-mono">{booking.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Booked At</p>
              <p className="font-medium">
                <FormattedDate date={booking.createdAt!} formatStr="PPPp" />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Date</p>
                  <p className="font-medium">
                    <FormattedDate date={booking.pickupDate} formatStr="PPp" />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pickup Address
                  </p>
                  <p className="font-medium">{booking.pickupAddress}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Drop-off Date</p>
                  <p className="font-medium">
                    <FormattedDate date={booking.dropoffDate} formatStr="PPp" />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Drop-off Address
                  </p>
                  <p className="font-medium">{booking.dropoffAddress}</p>
                </div>
              </div>
            </div>
          </div>
          

          {!isAdmin && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">Current Status</p>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize mt-1 bg-primary/10 text-primary">
                {booking.status}
              </div>
            </div>
          )}
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
              <p className="font-medium truncate">{booking.name || booking.bookedBy?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <Link
                href={`mailto:${booking.email || booking.bookedBy?.email}`}
                className="hover:underline truncate"
              >
                {booking.email || booking.bookedBy?.email}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <Link href={`tel:${booking.phone || booking.bookedBy?.phone}`} className="hover:underline">
                {booking.phone || booking.bookedBy?.phone}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <IdCard className="w-5 h-5 text-primary shrink-0" />
              <p>{booking.cnic || booking.bookedBy?.cnic}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
