import { z } from "zod";
import { DetailedUserResponseSchema } from "./user.response";

const PasswordSchema = z.stringFormat(
  "passwod",
  /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  "Password required."
);

export const SignInBodySchema = z.object({
  email: z.email("Email required."),
  password: z.string("Password required.").min(6),
});

export type SignInBodyDto = z.infer<typeof SignInBodySchema>;

export const CreateUserBodySchema = z
  .object({
    name: z.string("Name required."),
    email: z.email("Email required."),
    password: PasswordSchema,
    confirmPassword: z.string("Confirm password requied."),
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

export const ChangePasswordBodySchema = z
  .object({
    currentPassword: z.string("Current password is required"),
    password: PasswordSchema,
    confirmPassword: z.string("Confirm password requied."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordBodyDto = z.infer<typeof ChangePasswordBodySchema>;
