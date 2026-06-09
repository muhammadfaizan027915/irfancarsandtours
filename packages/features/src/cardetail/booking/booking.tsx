"use client";

import { useSession } from "next-auth/react";

import { CarBookingForm } from "@icat/features/forms/carbooking";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@icat/ui/components/card";
import { CarCartItem, useCarCart } from "@icat/web/store";

import { CarBookingProps } from "./booking.types";

export function CarBooking({ cars = [] }: CarBookingProps) {
  const { data } = useSession();
  const { carsList } = useCarCart();

  const sessionUser = data?.user;
  const _cars = carsList?.map((car: CarCartItem) => ({
    carId: car?.id,
    quantity: car?.quantity,
    bookedWithDriver: car?.bookedWithDriver ?? false,
  }));

  return (
    <Card className="shadow-none rounded-xl overflow-hidden p-0">
      <CardHeader className="border-b bg-muted/50 py-6">
        <CardTitle className="text-2xl font-bold">Make Booking</CardTitle>
        <p className="text-muted-foreground text-sm">
          Please provide your details and logistics information to confirm your
          booking.
        </p>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <CarBookingForm
          defaultValue={{
            ...sessionUser,
            name: sessionUser?.email ?? "",
            email: sessionUser?.email ?? "",
            cars: [...cars, ..._cars],
          }}
        />
      </CardContent>
    </Card>
  );
}
