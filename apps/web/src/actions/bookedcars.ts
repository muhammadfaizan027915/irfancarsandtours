"use server";

import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { handleServerActionWithError } from "@icat/lib";
import { BookedCarService } from "@icat/services";
import { revalidatePath } from "next/cache";

export const qoutePrice = handleServerActionWithError(
  async (bookedCarId: string, quotedPrice: number) => {
    const bookedCarService = new BookedCarService();
    const updatedBookedCar = await bookedCarService.update(bookedCarId, {
      quotedPrice,
    });

    revalidatePath(
      `${DashboardNavigationUrls.BOOKINGS}/${updatedBookedCar?.bookingId}`
    );

    return updatedBookedCar;
  }
);
