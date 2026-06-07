import { getCustomerById } from "@icat/web/data/users";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BookingsHeader, BookingsHeaderTab } from "@icat/features/common/bookings-header";

type CustomerBookingsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export default async function CustomerBookingsLayout({
  children,
  params,
}: CustomerBookingsLayoutProps) {
  const { id } = await params;

  const user = await getCustomerById(id);

  if (!user) {
    return notFound();
  }

  const tabs: BookingsHeaderTab[] = [
    {
      label: "Car Bookings",
      href: `${DashboardNavigationUrls.CUSTOMERS}/${id}/bookings/cars`,
    },
    {
      label: "Tour Bookings",
      href: `${DashboardNavigationUrls.CUSTOMERS}/${id}/bookings/tours`,
    },
  ];

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
      
      <BookingsHeader tabs={tabs} />

      <div className="flex flex-col gap-4">
          {children}
      </div>
    </div>
  );
}
