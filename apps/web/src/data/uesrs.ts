import { UserService } from "@icat/services";
import {
  getAuthenticatedAdminSession,
  getAuthenticatedUserSession,
} from "./session";
import { GetUsersBodyDto, GetUsersBodySchema } from "@icat/contracts";

export async function getUserProfile() {
  const session = await getAuthenticatedUserSession();
  const userService = new UserService();
  const user = await userService?.getDetailedUserByEmail(session?.user?.email!);
  return user;
}

export async function getCustomers(arg?: GetUsersBodyDto) {
  await getAuthenticatedAdminSession();

  const args = GetUsersBodySchema.parse(arg);
  const userService = new UserService();
  const result = await userService.getAll(args);
  return result;
}
