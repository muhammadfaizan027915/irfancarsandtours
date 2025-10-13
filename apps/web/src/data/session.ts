"use server";

import { NavigationUrls } from "@icat/features/header/header.constants";
import { UserRolesList } from "@icat/database/enums";
import { redirect } from "next/navigation";
import { auth } from "@icat/lib";

export async function getSession() {
  return await auth();
}

export async function getAuthenticatedUserSession() {
  const session = await getSession();

  if (!session) {
    return redirect(NavigationUrls.HOME);
  }

  return session;
}

export async function getAuthenticatedAdminSession() {
  const session = await getSession();

  if (!session || session?.user?.role !== UserRolesList[0]) {
    return redirect(NavigationUrls.HOME);
  }

  return session;
}
