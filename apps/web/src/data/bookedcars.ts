import { BookedCarService } from "@icat/services";

export async function getUserBookedCars(bookingId: string) {
  const bookedCarService = new BookedCarService();
  const bookedCars = await bookedCarService.getByBookingIdWithCars(bookingId);
  return bookedCars;
}

export async function getBookedCars(bookingId: string) {
  const bookedCarService = new BookedCarService();
  const bookedCars = await bookedCarService.getByBookingIdWithCars(bookingId);
  return bookedCars;
}
