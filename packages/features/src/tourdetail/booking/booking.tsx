"use client";

import { useSession } from "next-auth/react";

import { TourBookingForm } from "@icat/features/forms/tourbooking";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@icat/ui/components/card";
import { TourCartItem, useTourCart } from "@icat/web/store";

import { TourBookingProps } from "./booking.types";

export function TourBooking({
  tours = [],
  hideNumberOfAdultsAndChildren,
}: TourBookingProps) {
  const { data } = useSession();
  const { toursList } = useTourCart();
  const sessionUser = data?.user;

  const _tours = toursList?.map((tour: TourCartItem) => ({
    tourId: tour?.id,
    adultsNumber: tour?.adults,
    childrenNumber: tour?.children,
  }));

  return (
    <Card className="shadow-none rounded-xl overflow-hidden p-0">
      <CardHeader className="border-b bg-muted/50 py-6">
        <CardTitle className="text-2xl font-bold">Make Tour Booking</CardTitle>
        <p className="text-muted-foreground text-sm">
          Please provide your details to confirm your tour booking.
        </p>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <TourBookingForm
          defaultValue={{
            ...sessionUser,
            name: sessionUser?.email ?? "",
            email: sessionUser?.email ?? "",
            tours: [...tours, ..._tours],
          }}
          hideNumberOfAdultsAndChildren={hideNumberOfAdultsAndChildren}
        />
      </CardContent>
    </Card>
  );
}
