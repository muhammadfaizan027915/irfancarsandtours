import { BookingService } from "@icat/services";
import {
  GetBookingByUserIdBodySchema,
  GetBookingsBodyDto,
  GetBookingsBodySchema,
} from "@icat/contracts";
import { requireAdmin, requireAuth } from "@icat/lib/auth";

export async function getUserBookings(arg?: GetBookingsBodyDto) {
  const sessionUser = await requireAuth();
  const args = GetBookingByUserIdBodySchema.parse({
    userId: sessionUser?.id,
    ...arg,
  });

  const bookingService = new BookingService();
  const result = await bookingService.getAllByUserId(args);

  return result;
}

export async function getBookings(arg?: GetBookingsBodyDto) {
  await requireAdmin();
  const args = GetBookingsBodySchema.parse(arg);
  const bookingService = new BookingService();
  const result = await bookingService.getAll(args);

  return result;
}

export async function getUserBooking(bookingId: string) {
  await requireAuth();
  const bookingService = new BookingService();
  const booking = await bookingService.getBookingByIdWithUser(bookingId);

  return booking;
}

export async function getBooking(bookingId: string) {
  await requireAdmin();
  const bookingService = new BookingService();
  const booking = await bookingService.getBookingByIdWithUser(bookingId);

  return booking;
}
