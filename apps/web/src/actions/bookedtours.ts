"use server";

import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { handleServerActionWithError } from "@icat/lib/handlers";
import { TourBookingService } from "@icat/services";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@icat/lib/auth";

export const quoteTourPrices = handleServerActionWithError(
  async (bookedTourId: string, quotedPricePerAdult: number, quotedPricePerChild: number) => {
    await requireAdmin();
    const tourBookingService = new TourBookingService();
    
    const updatedBookedTour = await tourBookingService.updateBookedTourPrices(
      bookedTourId,
      quotedPricePerAdult,
      quotedPricePerChild
    );

    revalidatePath(
      `${DashboardNavigationUrls.BOOKINGS_TOURS}/${updatedBookedTour?.tourBookingId}`
    );

    return updatedBookedTour;
  }
);
