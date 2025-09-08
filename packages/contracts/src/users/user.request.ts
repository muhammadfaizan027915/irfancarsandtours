import { z } from "zod";

export const SignInBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type SignInBodyDto = z.infer<typeof SignInBodySchema>;
