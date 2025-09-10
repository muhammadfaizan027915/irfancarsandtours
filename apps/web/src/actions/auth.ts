"use server";

import { AuthService, UserService } from "@icat/services";
import {
  SignInBodySchema,
  CreateUserBodySchema,
  CreateUserBodyDto,
} from "@icat/contracts";
import { parseWithZod } from "@conform-to/zod/v4";
import { NavigationUrls } from "@icat/features";
import { redirect } from "next/navigation";

export async function logInUser(initialValue: unknown, formData: FormData) {
  const result = parseWithZod(formData, { schema: SignInBodySchema });

  if (result.status !== "success") {
    return result.reply();
  }

  const { email, password } = result.payload;

  const authService = new AuthService();

  await authService.signIn("credentials", {
    email,
    password,
  });
}

export async function signUpUser(initialValue: unknown, formData: FormData) {
  const result = parseWithZod(formData, { schema: CreateUserBodySchema });

  if (result.status !== "success") {
    return result.reply();
  }

  try {
    const userService = new UserService();

    const createdUser = await userService.createUser(
      result?.payload as CreateUserBodyDto
    );

    if (createdUser?.id) {
      redirect(NavigationUrls.SIGNIN);
    }
  } catch (e) {
    console.log(e)
  }
}
