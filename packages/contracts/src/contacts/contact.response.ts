import { z } from "zod";
import { PaginatedResponseSchema } from "../generic";

export const ContactResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  message: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ContactResponseDto = z.infer<typeof ContactResponseSchema>;

export const ContactsListResponseSchema = z.array(ContactResponseSchema);

export type ContactsListResponseDto = z.infer<typeof ContactsListResponseSchema>;

export const PaginatedContactResponseSchema = PaginatedResponseSchema(
  ContactsListResponseSchema
);

export type PaginatedContactResponseDto = z.infer<typeof PaginatedContactResponseSchema>;
