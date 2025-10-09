import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@icat/ui";
import { Calendar, MapPin, User, Mail, Phone, IdCard } from "lucide-react";
import { BookingDetailProps } from "./detail.types";
import { format } from "date-fns";

export function BookingDetail({ booking }: BookingDetailProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
      <Card className="xl:col-span-4 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Booking Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <p className="text-muted-foreground">Booking ID</p>
            <p className="text-primary">{booking.id}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Booked At</p>
            <p className="font-medium">
              {format(new Date(booking.createdAt!), "PPPp")}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Pickup Date</p>
                <p className="font-medium">
                  {format(new Date(booking.pickupDate), "PPp")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Drop-off Date</p>
                <p className="font-medium">
                  {format(new Date(booking.dropoffDate), "PPp")}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Pickup Address</p>
                <p className="font-medium">{booking.pickupAddress}</p>
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
        </CardContent>
      </Card>

      <Card className="xl:col-span-2 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Booked By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage src={booking.bookedBy?.image || ""} />
            <AvatarFallback>
              {booking.bookedBy?.name?.[0] ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <p className="font-medium">{booking.bookedBy?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <p>{booking.bookedBy?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              <p>{booking.bookedBy?.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <IdCard className="w-5 h-5 text-primary" />
              <p>{booking.bookedBy?.cnic}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
