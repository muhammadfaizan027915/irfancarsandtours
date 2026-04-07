import { UserService } from "@icat/services";
import {
  GetUsersBodyDto,
  GetUsersBodySchema,
} from "@icat/contracts";
import { requireAdmin, requireAuth } from "@icat/lib/auth";

export async function getUserProfile() {
  const sessionUser = await requireAuth();
  const userService = new UserService();
  const user = await userService?.getDetailedUserByEmail(sessionUser?.email!);
  return user;
}

export async function getCustomers(arg?: GetUsersBodyDto) {
  await requireAdmin();
  const args = GetUsersBodySchema.parse(arg);
  const userService = new UserService();
  const result = await userService.getAll(args);
  return result;
}
