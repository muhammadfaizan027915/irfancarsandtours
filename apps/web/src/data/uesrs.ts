import { UserService } from "@icat/services";
import {
  getAuthenticatedAdminSession,
  getAuthenticatedUserSession,
} from "./session";

export async function getUserProfile() {
  const session = await getAuthenticatedUserSession();
  const userService = new UserService();
  const user = await userService.getDetailedUserByEmail(session?.user?.email!);
  return user;
}

export async function getCustomers() {
  await getAuthenticatedAdminSession();

  const userService = new UserService();
  const result = await userService.getAll();
  return result;
}
