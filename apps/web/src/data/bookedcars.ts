import { BookedCarService } from "@icat/services";
import { requireAdmin, requireAuth } from "@icat/lib/auth";

export async function getUserBookedCars(bookingId: string) {
  await requireAuth();
  const bookedCarService = new BookedCarService();
  const bookedCars = await bookedCarService.getByBookingIdWithCars(bookingId);
  return bookedCars;
}

export async function getBookedCars(bookingId: string) {
  await requireAdmin();
  const bookedCarService = new BookedCarService();
  const bookedCars = await bookedCarService.getByBookingIdWithCars(bookingId);
  return bookedCars;
}
