import { BookingDetail, UserBookedCarsTable } from "@icat/features";
import { BookingService } from "@icat/services";
import { notFound } from "next/navigation";
import { auth } from "@icat/lib";

type UserBookingDetailPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function UserBookingDetailPage({
  params,
}: UserBookingDetailPageProps) {
  const { bookingId } = await params;
  const session = await auth();

  if (!session?.user?.email) return <p>Not authenticated</p>;

  const bookingService = new BookingService();
  const booking = await bookingService.getBookingByIdWithUser(bookingId);

  if (!booking) return notFound();

  return (
    <div className="grid gap-6">
      <BookingDetail booking={booking} />
      <UserBookedCarsTable bookingId={bookingId} />
    </div>
  );
}
