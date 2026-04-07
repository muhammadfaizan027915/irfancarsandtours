"use server";

import { cookies } from "next/headers";
import { CarBookingRequestSchema, BookingRequestDto } from "@icat/contracts";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { handlerFormActionWithError } from "@icat/lib";
import { carCartKey } from "@icat/web/store";
import { BookingService } from "@icat/services";
import { redirect } from "next/navigation";
import { requireAuth } from "@icat/lib/auth";

export const bookCar = handlerFormActionWithError({
  schema: CarBookingRequestSchema,
  action: async (data: BookingRequestDto) => {
    const sessionUser = await requireAuth();
    const bookingService = new BookingService();
    const booking = await bookingService.createBooking(sessionUser.id, data);

    if (booking) {
      (await cookies()).delete(carCartKey);
      redirect(`${NavigationUrls.BOOKINGS}/${booking?.id}/confirmation`);
    }

    return booking;
  },
});
