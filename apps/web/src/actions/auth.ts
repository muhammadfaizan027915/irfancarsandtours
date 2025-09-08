"use server";

import { AuthService } from "@icat/services";
import { SignInBodySchema } from "@icat/contracts";
import { parseWithZod } from "@conform-to/zod/v4";

export async function loginUser(initialValue: unknown, formData: FormData) {
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
