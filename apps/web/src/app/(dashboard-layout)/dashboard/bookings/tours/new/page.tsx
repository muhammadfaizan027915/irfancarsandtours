import { AdminTourBookingForm } from "@icat/features/dashboard/forms/tourbooking";

export default function NewTourBookingPage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold tracking-tight">Create Tour Booking</h1>
        <p className="text-muted-foreground">Manual booking creation for a customer.</p>
      </div>

      <AdminTourBookingForm />
    </div>
  );
}
