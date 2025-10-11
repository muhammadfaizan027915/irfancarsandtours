import { Button } from "@icat/ui/components/button";
import { Card, CardHeader, CardContent } from "@icat/ui/components/card";
import { CheckCircle2, MapPin } from "lucide-react";
import { BookingConfirmationProps } from "./confirmation.types";
import { NavigationUrls } from "@icat/features/header/header.constants";
import Link from "next/link";

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  return (
    <Card className="max-w-md w-full space-y-6 mx-auto">
      <div className="flex justify-center">
        <CheckCircle2 className="w-16 h-16 text-primary" />
      </div>

      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">Booking Confirmed 🎉</h1>
        <p className="text-muted-foreground">
          Your booking{" "}
          <span className="font-semibold text-primary">#{booking?.id}</span> has
          been successfully confirmed.
        </p>
      </CardHeader>

      <CardContent className="space-y-4 text-left">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">
              Pickup: {booking?.pickupAddress}
            </p>
            <p className="text-sm text-muted-foreground">
              {booking?.pickupDate?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">
              Dropoff: {booking?.dropoffAddress}
            </p>
            <p className="text-sm text-muted-foreground">
              {booking?.dropoffDate?.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href={NavigationUrls.HOME}>
          <Button variant="secondary" className="w-full sm:w-auto shadow-none">
            Back to Home
          </Button>
        </Link>
        <Link href={`${NavigationUrls.BOOKINGS}/${booking?.id}`}>
          <Button className="w-full sm:w-auto shadow-none">View Booking</Button>
        </Link>
      </div>
    </Card>
  );
}
