import { z } from "zod";

export const SignInBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type SignInBodyDto = z.infer<typeof SignInBodySchema>;

export const CreateUserBodySchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.stringFormat(
      "passwod",
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
    ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type CreateUserBodyDto = z.infer<typeof CreateUserBodySchema>;
