import { AdminBookingForm } from "@icat/features/dashboard/forms";

export default function NewBookingPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">New Booking</h1>
        <p className="text-muted-foreground">Create a manual booking for a customer.</p>
      </div>

      <AdminBookingForm />
    </div>
  );
}
