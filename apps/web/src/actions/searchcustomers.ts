"use server";

import { GetUsersBodyDto } from "@icat/contracts";
import { UserService } from "@icat/services";
import { requireAdmin } from "@icat/lib/auth";

export async function searchCustomersForBooking(params: GetUsersBodyDto) {
  await requireAdmin();
  const userService = new UserService();
  return userService.getAll(params);
}
