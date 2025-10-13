import { BookingService } from "@icat/services";
import {
  getAuthenticatedAdminSession,
  getAuthenticatedUserSession,
} from "./session";
import {
  GetBookingByUserIdBodySchema,
  GetBookingsBodyDto,
  GetBookingsBodySchema,
  GetBookingsByUserIdBodyDto,
} from "@icat/contracts";

export async function getUserBookings(arg?: GetBookingsByUserIdBodyDto) {
  const session = await getAuthenticatedUserSession();

  const args = GetBookingByUserIdBodySchema.parse({
    userId: session?.user?.id,
    ...arg,
  });

  const bookingService = new BookingService();
  const result = await bookingService.getAllByUserId(args);
  
  return result;
}

export async function getBookings(arg?: GetBookingsBodyDto) {
  await getAuthenticatedAdminSession();

  const args = GetBookingsBodySchema.parse(arg);
  const bookingService = new BookingService();
  const result = await bookingService.getAll(args);

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
