import { CarBookingForm } from "../../forms";
import { Card, CardContent, CardHeader } from "@icat/ui";

export function CarBooking() {
  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <h1 className="text-start text-2xl font-bold">Make Car Booking</h1>
      </CardHeader>
      <CardContent>
        <CarBookingForm />
      </CardContent>
    </Card>
  );
}
