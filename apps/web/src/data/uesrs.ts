import { UserService } from "@icat/services";
import {
  GetUsersBodyDto,
  GetUsersBodySchema,
  UserResponseDto,
} from "@icat/contracts";
import { auth } from "@icat/lib/auth";

export async function getSessionUser() {
  const session = await auth();
  return session?.user as UserResponseDto;
}

export async function getUserProfile() {
  const sessionUser = await getSessionUser();
  const userService = new UserService();
  const user = await userService?.getDetailedUserByEmail(sessionUser?.email!);
  return user;
}

export async function getCustomers(arg?: GetUsersBodyDto) {
  const args = GetUsersBodySchema.parse(arg);
  const userService = new UserService();
  const result = await userService.getAll(args);
  return result;
}
