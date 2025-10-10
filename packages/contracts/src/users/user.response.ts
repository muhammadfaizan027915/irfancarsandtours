import z from "zod";
import { PaginatedResponseSchema } from "@icat/contracts/generic";

export const UserResponseSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  email: z.email(),
  image: z.url().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserResponseDto = z.infer<typeof UserResponseSchema>;

export const UserResponseWithPasswordSchema = UserResponseSchema.extend({
  password: z.string(),
});

export type UserResponseWithPasswordDto = z.infer<
  typeof UserResponseWithPasswordSchema
>;

export const DetailedUserResponseSchema = UserResponseSchema.extend({
  cnic: z.string().nullish(),
  phone: z.string().nullish(),
  address: z.string().nullish(),
});

export type DetailedUserResponseDto = z.infer<
  typeof DetailedUserResponseSchema
>;

export const UsersListResponseSchema = z.array(DetailedUserResponseSchema);

export type UsersListResponseDto = z.infer<typeof UsersListResponseSchema>;

export const PaginatedUserResponseSchema = PaginatedResponseSchema(
  DetailedUserResponseSchema
);

export type PaginatedUserResponseDto = z.infer<
  typeof PaginatedUserResponseSchema
>;
