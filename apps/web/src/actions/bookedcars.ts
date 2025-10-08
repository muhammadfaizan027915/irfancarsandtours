"use server";

import { DashboardNavigationUrls } from "@icat/features";
import {
  auth,
  handleServerActionWithError,
  UnauthorizedError,
} from "@icat/lib";
import { BookedCarService } from "@icat/services";
import { revalidatePath } from "next/cache";

export const qoutePrice = handleServerActionWithError(
  async (bookedCarId: string, quotedPrice: number) => {
    const session = await auth();
    const sessionUser = session?.user;

    if (!sessionUser?.id) {
      throw new UnauthorizedError({ message: "Unauthorized to qoute price." });
    }

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
