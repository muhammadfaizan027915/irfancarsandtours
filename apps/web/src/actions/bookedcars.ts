"use server";

import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { handleServerActionWithError } from "@icat/lib/handlers";
import { BookingService } from "@icat/services";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@icat/lib/auth";

export const qoutePrice = handleServerActionWithError(
  async (bookedCarId: string, quotedPrice: number) => {
    await requireAdmin();
    const bookingService = new BookingService();
    
    const updatedBookedCar = await bookingService.updateBookedCarPrice(
      bookedCarId,
      quotedPrice
    );

    revalidatePath(
      `${DashboardNavigationUrls.BOOKINGS_CARS}/${updatedBookedCar?.bookingId}`
    );

    return updatedBookedCar;
  }
);
