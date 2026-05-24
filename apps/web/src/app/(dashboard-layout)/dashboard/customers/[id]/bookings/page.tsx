import { getCustomerById } from "@icat/web/data/users";
import { getBookingsByUserId } from "@icat/web/data/bookings";
import { BookingsTable } from "@icat/features/dashboard/tables/bookingstable";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";

type CustomerBookingsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerBookingsPage({
  params,
}: CustomerBookingsPageProps) {
  const { id } = await params;

  const [user, bookings] = await Promise.all([
    getCustomerById(id),
    getBookingsByUserId(id),
  ]);

  if (!user) {
    return notFound();
  }

  const bookingsWithUser = {
    ...bookings,
    data: bookings.data.map((booking) => ({
      ...booking,
      bookedBy: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cnic: user.cnic,
        image: user.image,
      },
    })),
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <Link href={`${DashboardNavigationUrls.CUSTOMERS}/${id}`} className="flex items-center text-sm text-primary hover:underline gap-1">
          <ArrowLeft size={16} />
          Back to Profile
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">Booking History</h1>
        <p className="text-muted-foreground">All bookings made by {user.name}</p>
      </div>

      <div className="flex flex-col gap-4">
          <BookingsTable bookings={bookingsWithUser.data} pagination={bookingsWithUser.pagination} />
      </div>
    </div>
  );
}
