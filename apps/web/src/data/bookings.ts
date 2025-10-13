import { BookingService } from "@icat/services";
import {
  GetBookingByUserIdBodySchema,
  GetBookingsBodyDto,
  GetBookingsBodySchema,
  GetBookingsByUserIdBodyDto,
} from "@icat/contracts";
import { getSessionUser } from "../actions";

export async function getUserBookings(arg?: GetBookingsByUserIdBodyDto) {
  const sessionUser = await getSessionUser();
  const args = GetBookingByUserIdBodySchema.parse({
    userId: sessionUser?.id,
    ...arg,
  });

  const bookingService = new BookingService();
  const result = await bookingService.getAllByUserId(args);

  return result;
}

export async function getBookings(arg?: GetBookingsBodyDto) {
  const args = GetBookingsBodySchema.parse(arg);
  const bookingService = new BookingService();
  const result = await bookingService.getAll(args);

  return result;
}

export async function getUserBooking(bookingId: string) {
  const bookingService = new BookingService();
  const booking = await bookingService.getBookingByIdWithUser(bookingId);

  return booking;
}

export async function getBooking(bookingId: string) {
  const bookingService = new BookingService();
  const booking = await bookingService.getBookingByIdWithUser(bookingId);

  return booking;
}
