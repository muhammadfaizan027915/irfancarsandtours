import { CarBookingForm } from "@icat/features/forms/carbooking";
import { getSessionUser } from "@icat/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@icat/ui/components/card";

import { CarBookingProps } from "./booking.types";

export async function CarBooking({ cars }: CarBookingProps) {
  const sessionUser = await getSessionUser();

  return (
    <Card className="shadow-none rounded-xl overflow-hidden">
      <CardHeader className="border-b bg-muted/50">
        <CardTitle className="text-2xl font-bold">Make Car Booking</CardTitle>
        <p className="text-muted-foreground text-sm">
          Please provide your details and logistics information to confirm your booking.
        </p>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <CarBookingForm
          defaultValue={{ ...sessionUser, cars }}
        />
      </CardContent>
    </Card>
  );
}
