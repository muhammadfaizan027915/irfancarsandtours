"use server";

import {
  TourBookingBodyDto,
  TourBookingBodySchema,
  UpdateBookingStatusDto,
  UpdateBookingStatusSchema,
} from "@icat/contracts";
import {
  handlerFormActionWithError,
} from "@icat/lib/handlers";
import { getSessionUser, requireAdmin } from "@icat/lib/auth/auth.helpers";
import { TourBookingService } from "@icat/services";
import { tourCartKey } from "../store";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NavigationUrls } from "@icat/features/common/header";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";

export const bookTour = handlerFormActionWithError({
  schema: TourBookingBodySchema,
  action: async (data: TourBookingBodyDto) => {

    const sessionUser = await getSessionUser();
    const tourBookingService = new TourBookingService();
    const booking = await tourBookingService.createBooking(
      data,
      sessionUser?.id,
    );

    if (booking && sessionUser?.id) {
      (await cookies()).delete(tourCartKey);
      redirect(`${NavigationUrls.BOOKINGS_TOURS}/${booking.id}/confirmation`);
    }

    return { ...booking, isLoggedIn: !!sessionUser?.id };
  },
});

export const updateTourBookingStatus = handlerFormActionWithError({
  schema: UpdateBookingStatusSchema,
  action: async (data: UpdateBookingStatusDto) => {
    await requireAdmin();

    const service = new TourBookingService();
    const booking = await service.updateStatus(data.id, data.status);

    revalidatePath(DashboardNavigationUrls.BOOKINGS_TOURS);
    return booking;
  },
});

export const bookTourAdmin = handlerFormActionWithError({
  schema: TourBookingBodySchema,
  action: async (data: TourBookingBodyDto) => {
    await requireAdmin();

    const tourBookingService = new TourBookingService();
    const booking = await tourBookingService.createBooking(
      data,
      data.userId,
    );

    revalidatePath(DashboardNavigationUrls.BOOKINGS_TOURS);

    return booking;
  },
});
