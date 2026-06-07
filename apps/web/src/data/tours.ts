import "server-only";

import { GetToursBodyDto} from "@icat/contracts";
import { TourService, TourBookingService } from "@icat/services";

export async function getTours(query?: GetToursBodyDto) {
  const tourService = new TourService();
  return await tourService.getAll(query);
}

export async function getFeaturedTours() {
  const tourService = new TourService();
  return await tourService.getFeaturedTours();
}

export async function getTourById(id: string) {
  const tourService = new TourService();
  return await tourService.getTourById(id);
}

export async function getTourBookings(query?: any) {
  const service = new TourBookingService();
  return await service.getAll(query);
}

export async function getTourBookingById(id: string) {
  const service = new TourBookingService();
  return await service.getById(id);
}

export async function getTourBookingByIdWithUser(id: string) {
  const service = new TourBookingService();
  return await service.getByIdWithUser(id);
}
