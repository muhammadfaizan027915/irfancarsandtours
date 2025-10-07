import { auth } from "@icat/lib";
import { CarBookingForm } from "../../forms";
import { Card, CardContent, CardHeader } from "@icat/ui";
import { BookingRequestDto } from "@icat/contracts";

export async function CarBooking() {
  const session = await auth();
  const sessionUser = session?.user;

  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <h1 className="text-start text-2xl font-bold">Make Car Booking</h1>
      </CardHeader>
      <CardContent>
        <CarBookingForm defaultValue={sessionUser as BookingRequestDto} />
      </CardContent>
    </Card>
  );
}
