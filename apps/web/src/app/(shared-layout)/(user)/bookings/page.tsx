import { GetBookingsBodyDto } from "@icat/contracts";
import { getUserBookings } from "@icat/web/data/bookings";

import dynamic from "next/dynamic";

const UserBookingsTable = dynamic(() =>
  import("@icat/features/tables/userbookingstable").then(
    (m) => m.UserBookingsTable
  )
);

type UserBookingsPageProps = {
  searchParams: Promise<GetBookingsBodyDto>;
};

export default async function UserBookingsPage({
  searchParams,
}: UserBookingsPageProps) {
  const result = await getUserBookings(await searchParams);
  const bookings = result?.data;
  const pagination = result?.pagination;

  return <UserBookingsTable bookings={bookings} pagination={pagination} />;
}
