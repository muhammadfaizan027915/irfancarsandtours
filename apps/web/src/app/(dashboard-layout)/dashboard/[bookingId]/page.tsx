import { auth } from "@icat/lib";
import { BookingDetail } from "@icat/features";
import { BookingService } from "@icat/services";
import { notFound } from "next/navigation";

type BookingDetailPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { bookingId } = await params;
  const session = await auth();

  if (!session?.user?.email) return <p>Not authenticated</p>;

  const bookingService = new BookingService();
  const booking = await bookingService.getBookingByIdWithUser(bookingId);

  if (!booking) return notFound();

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-semibold tracking-tight">Booking Details</h1>
      <BookingDetail booking={booking} />
    </div>
  );
}
