"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  CarBookingRequestSchema,
  BookingRequestDto,
  UpdateBookingStatusSchema,
  UpdateBookingStatusDto,
} from "@icat/contracts";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import {
  handlerFormActionWithError,
} from "@icat/lib";
import { carCartKey } from "@icat/web/store";
import { BookingService } from "@icat/services";
import { redirect } from "next/navigation";
import { getSessionUser, requireAdmin } from "@icat/lib/auth";

export const bookCar = handlerFormActionWithError({
  schema: CarBookingRequestSchema,
  action: async (data: BookingRequestDto) => {
    const sessionUser = await getSessionUser();
    const bookingService = new BookingService();
    const booking = await bookingService.createBooking(data, sessionUser?.id);

    if (booking && sessionUser?.id) {
      (await cookies()).delete(carCartKey);
      redirect(`${NavigationUrls.BOOKINGS}/${booking?.id}/confirmation`);
    }

    return { ...booking, isLoggedIn: !!sessionUser?.id };
  },
});

export const updateBookingStatus = handlerFormActionWithError({
  schema: UpdateBookingStatusSchema,
  action: async (data: UpdateBookingStatusDto) => {
    await requireAdmin();

    const bookingService = new BookingService();
    const booking = await bookingService.updateBooking(data.id, {
      status: data.status,
    });

    revalidatePath(DashboardNavigationUrls.BOOKINGS);
    revalidatePath(`${DashboardNavigationUrls.BOOKINGS}/${data.id}`);

    return booking;
  },
});
