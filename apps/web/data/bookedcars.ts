import { BookedCarService } from "@icat/services";
import {
  getAuthenticatedAdminSession,
  getAuthenticatedUserSession,
} from "./session";

export async function getUserBookedCars(bookingId: string) {
  // await getAuthenticatedUserSession();

  const bookedCarService = new BookedCarService();
  const bookedCars = await bookedCarService.getByBookingIdWithCars(bookingId);
  return bookedCars;
}

export async function getBookedCars(bookingId: string) {
  // await getAuthenticatedAdminSession();

  const bookedCarService = new BookedCarService();
  const bookedCars = await bookedCarService.getByBookingIdWithCars(bookingId);
  return bookedCars;
}
