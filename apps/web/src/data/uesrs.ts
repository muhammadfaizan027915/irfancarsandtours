import { UserService } from "@icat/services";
import { GetUsersBodyDto, GetUsersBodySchema } from "@icat/contracts";
import { auth } from "@icat/lib/auth";

export async function getUserProfile() {
  const session = await auth();
  const userService = new UserService();
  const user = await userService?.getDetailedUserByEmail(session?.user?.email!);
  return user;
}

export async function getCustomers(arg?: GetUsersBodyDto) {
  const args = GetUsersBodySchema.parse(arg);
  const userService = new UserService();
  const result = await userService.getAll(args);
  return result;
}
