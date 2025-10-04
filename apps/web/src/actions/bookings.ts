"use server";

import { CarBookingRequestSchema, CarBookingRequestDto } from "@icat/contracts";
import { auth, handlerFormActionWithError, UnauthorizedError } from "@icat/lib";
import { CarCartItem, carCartKey } from "@icat/web/store";
import { BookingService } from "@icat/services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NavigationUrls } from "@icat/features";

export const bookCar = handlerFormActionWithError({
  schema: CarBookingRequestSchema,
  action: async (data: CarBookingRequestDto) => {
    const session = await auth();
    const sessionUser = session?.user;

    if (!sessionUser?.id) {
      throw new UnauthorizedError({ message: "Unauthorized to book car." });
    }

    const cookieStore = await cookies();
    const cartCookie = cookieStore.get(carCartKey);
    const cart = cartCookie ? JSON.parse(cartCookie.value) : [];
    const carsList = cart?.carsList ?? [];

    const cars = carsList?.map((car: CarCartItem) => ({
      carId: car?.id,
      quantity: car?.quantity,
      bookedWithDriver: car?.bookedWithDriver ?? false,
    }));

    const bookingService = new BookingService();
    const booking = await bookingService.createBooking({ ...data, cars });

    if (booking) {
      cookieStore.delete(carCartKey);
      redirect(`${NavigationUrls.BOOKINGS}/${booking?.id}/confirmation`);
    }

    return booking;
  },
});
