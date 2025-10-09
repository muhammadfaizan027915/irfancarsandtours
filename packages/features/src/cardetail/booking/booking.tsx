import { Card, CardContent, CardHeader } from "@icat/ui";
import { BookingRequestDto } from "@icat/contracts";
import { CarBookingForm } from "@icat/features/forms";
import { getSession } from "@icat/web/data/session";
import { CarBookingProps } from "./booking.types";

export async function CarBooking({ cars }: CarBookingProps) {
  const session = await getSession();

  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <h1 className="text-start text-2xl font-bold">Make Car Booking</h1>
      </CardHeader>
      <CardContent>
        <CarBookingForm
          defaultValue={{ ...session?.user, cars } as BookingRequestDto}
        />
      </CardContent>
    </Card>
  );
}
