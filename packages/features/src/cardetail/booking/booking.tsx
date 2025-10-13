import { Card, CardContent, CardHeader } from "@icat/ui/components/card";
import { CarBookingForm } from "@icat/features/forms/carbooking";
import { BookingRequestDto } from "@icat/contracts";
import { CarBookingProps } from "./booking.types";
import { getSessionUser } from "@icat/web/actions";

export async function CarBooking({ cars }: CarBookingProps) {
  const sessionUser = await getSessionUser();

  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <h1 className="text-start text-2xl font-bold">Make Car Booking</h1>
      </CardHeader>
      <CardContent>
        <CarBookingForm
          defaultValue={{ ...sessionUser, cars } as BookingRequestDto}
        />
      </CardContent>
    </Card>
  );
}
