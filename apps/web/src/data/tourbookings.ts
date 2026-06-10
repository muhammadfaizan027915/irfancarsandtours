import { TourBookingService } from "@icat/services";
import {
  GetTourBookingByUserIdBodySchema,
  GetTourBookingsBodyDto,
} from "@icat/contracts";
import { requireAuth, requireAdmin } from "@icat/lib/auth";

export async function getUserTourBookings(arg?: GetTourBookingsBodyDto) {
  const sessionUser = await requireAuth();
  const args = GetTourBookingByUserIdBodySchema.parse({
    userId: sessionUser?.id,
    ...arg,
  });

  const tourBookingService = new TourBookingService();
  const result = await tourBookingService.getAllByUserId(args);

  return result;
}

export async function getUserTourBooking(bookingId: string) {
  await requireAuth();
  const tourBookingService = new TourBookingService();
  const booking = await tourBookingService.getByIdWithUser(bookingId);

  return booking;
}

export async function getTourBookingsByUserId(userId: string, arg?: GetTourBookingsBodyDto) {
  await requireAdmin();
  const args = GetTourBookingByUserIdBodySchema.parse({
    userId,
    ...arg,
  });

  const tourBookingService = new TourBookingService();
  const result = await tourBookingService.getAllByUserId(args);

  return result;
}
