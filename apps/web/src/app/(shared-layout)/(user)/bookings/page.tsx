import { getUserBookings } from "@icat/web/data/bookings";

import dynamic from "next/dynamic";

const UserBookingsTable = dynamic(() =>
  import("@icat/features/tables/userbookingstable").then(
    (m) => m.UserBookingsTable
  )
);

export default async function UserBookingsPage() {
  const result = await getUserBookings();
  return <UserBookingsTable bookings={result.data} />;
}
