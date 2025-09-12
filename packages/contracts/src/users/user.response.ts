import z from "zod";

export const UserResponseSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  email: z.email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserResponseDto = z.infer<typeof UserResponseSchema>;

export const UserResponseWithPasswordSchema = UserResponseSchema.extend({
  password: z.string(),
});

export type UserResponseWithPasswordDto = z.infer<typeof UserResponseWithPasswordSchema>;
