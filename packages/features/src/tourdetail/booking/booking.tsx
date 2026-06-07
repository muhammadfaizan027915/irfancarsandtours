import { TourBookingForm } from "@icat/features/forms/tourbooking";
import { getSessionUser } from "@icat/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@icat/ui/components/card";

import { TourBookingProps } from "./booking.types";

export async function TourBooking({ tours, hideNumberOfAdultsAndChildren }: TourBookingProps) {
  const sessionUser = await getSessionUser();

  return (
    <Card className="shadow-none rounded-xl overflow-hidden p-0">
      <CardHeader className="border-b bg-muted/50 py-6">
        <CardTitle className="text-2xl font-bold">Make Tour Booking</CardTitle>
        <p className="text-muted-foreground text-sm">
          Please provide your details to confirm your tour booking.
        </p>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <TourBookingForm
          defaultValue={{ ...sessionUser, tours }}
          hideNumberOfAdultsAndChildren={hideNumberOfAdultsAndChildren}
        />
      </CardContent>
    </Card>
  );
}
