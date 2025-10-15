import { Card, CardContent, CardHeader } from "@icat/ui/components/card";
import { CarBookingForm } from "@icat/features/forms/carbooking";
import { getSessionUser } from "@icat/web/data/uesrs";
import { CarBookingProps } from "./booking.types";

export async function CarBooking({ cars }: CarBookingProps) {
  const sessionUser = await getSessionUser();

  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <h1 className="text-start text-2xl font-bold">Make Car Booking</h1>
      </CardHeader>
      <CardContent>
        <CarBookingForm
          defaultValue={{ ...sessionUser, cars }}
        />
      </CardContent>
    </Card>
  );
}
