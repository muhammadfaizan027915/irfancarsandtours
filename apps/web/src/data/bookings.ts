import { BookingService } from "@icat/services";
import {
  getAuthenticatedAdminSession,
  getAuthenticatedUserSession,
} from "./session";

export async function getUserBookings() {
  const session = await getAuthenticatedUserSession();

  const bookingService = new BookingService();
  const result = await bookingService.getAllByUserId({
    userId: session?.user?.id!,
  });

  return result;
}

export async function getBookings() {
  await getAuthenticatedAdminSession();

  const bookingService = new BookingService();
  const result = await bookingService.getAll();

  return result;
}

export async function getUserBooking(bookingId: string) {
  await getAuthenticatedUserSession();

  const bookingService = new BookingService();
  const booking = await bookingService.getBookingByIdWithUser(bookingId);

  return booking;
}

export async function getBooking(bookingId: string) {
  await getAuthenticatedAdminSession();

  const bookingService = new BookingService();
  const booking = await bookingService.getBookingByIdWithUser(bookingId);

  return booking;
}
