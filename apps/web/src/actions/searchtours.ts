"use server";

import { GetToursBodyDto } from "@icat/contracts";
import { TourService } from "@icat/services";
import { requireAdmin } from "@icat/lib/auth";

export async function searchToursForBooking(params: GetToursBodyDto) {
  await requireAdmin();
  const tourService = new TourService();
  return tourService.getAll(params);
}
