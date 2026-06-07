import { CheckCircle2, Receipt } from "lucide-react";
import Link from "next/link";

import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { FormattedDate } from "@icat/ui";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent, CardHeader } from "@icat/ui/components/card";

import { TourBookingConfirmationProps } from "./confirmation.types";

export function TourBookingConfirmation({ booking }: TourBookingConfirmationProps) {
  return (
    <Card className="max-w-md w-full space-y-6 mx-auto">
      <div className="flex justify-center mt-6">
        <CheckCircle2 className="w-16 h-16 text-primary" />
      </div>

      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">Tour Booking Confirmed 🎉</h1>
        <p className="text-muted-foreground">
          Your booking{" "}
          <span className="font-semibold text-primary">#{booking?.id}</span> has
          been successfully confirmed.
        </p>
      </CardHeader>

      <CardContent className="space-y-4 text-left">
        <div className="flex items-center gap-3">
          <Receipt className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">
              Total Price: Rs. {booking?.totalPrice?.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Booked on: <FormattedDate date={booking?.createdAt!} formatStr="PPp" />
            </p>
          </div>
        </div>

        {booking?.notes && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
             <p className="text-sm font-medium mb-1">Notes</p>
             <p className="text-sm text-muted-foreground">{booking.notes}</p>
          </div>
        )}
      </CardContent>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pb-6 px-6">
        <Link href={NavigationUrls.HOME}>
          <Button variant="secondary" className="w-full sm:w-auto">
            Back to Home
          </Button>
        </Link>
        <Link href={`${NavigationUrls.BOOKINGS_TOURS}/${booking?.id}`}>
          <Button className="w-full sm:w-auto">View Booking</Button>
        </Link>
      </div>
    </Card>
  );
}
