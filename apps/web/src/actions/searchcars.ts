"use server";

import { GetCarsBodyDto } from "@icat/contracts";
import { CarService } from "@icat/services";
import { requireAdmin } from "@icat/lib/auth";

export async function searchCarsForBooking(params: GetCarsBodyDto) {
  await requireAdmin();
  const carService = new CarService();
  return carService.getAll(params);
}
