import { UserResponseDto } from "@icat/contracts";
import { ForbiddenError, UnauthorizedError } from "../errors";
import { auth } from "./auth";

export async function getSessionUser() {
  const session = await auth();
  return session?.user as UserResponseDto;
}

export async function requireAuth() {
  const user = await getSessionUser();

  if (!user) {
    throw new UnauthorizedError({ message: "You must be logged in to perform this action." });
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (user.role !== "admin") {
    throw new ForbiddenError({ message: "Access denied. Administrative privileges required." });
  }

  return user;
}
