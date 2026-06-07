import { BookedTourService } from "@icat/services";
import { requireAdmin, requireAuth } from "@icat/lib/auth";

export async function getUserTourBookedTours(tourBookingId: string) {
  await requireAuth();
  const service = new BookedTourService();
  const bookedTours = await service.getBookedToursByBookingId(tourBookingId);
  return bookedTours;
}

export async function getBookedTours(tourBookingId: string) {
  await requireAdmin();
  const service = new BookedTourService();
  const bookedTours = await service.getBookedToursByBookingId(tourBookingId);
  return bookedTours;
}
