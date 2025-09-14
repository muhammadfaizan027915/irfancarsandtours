import { z } from "zod";
import { DetailedUserResponseSchema } from "./user.response";

export const SignInBodySchema = z.object({
  email: z.email({ error: "Email required." }),
  password: z.string({ error: "Password required." }).min(6),
});

export type SignInBodyDto = z.infer<typeof SignInBodySchema>;

export const CreateUserBodySchema = z
  .object({
    name: z.string({ error: "Name required." }),
    email: z.email({ error: "Email required." }),
    password: z.stringFormat(
      "passwod",
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      { error: "Password required." }
    ),
    confirmPassword: z.string({ error: "Confirm password requied." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type CreateUserBodyDto = z.infer<typeof CreateUserBodySchema>;

export const UpdateUserBodySchema = DetailedUserResponseSchema.omit({
  createdAt: true,
  updatedAt: true,
}).partial();

export type UpdateUserBodyDto = z.infer<typeof UpdateUserBodySchema>;
