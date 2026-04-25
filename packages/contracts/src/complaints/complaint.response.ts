import { z } from "zod";
import { PaginatedResponseSchema } from "@icat/contracts/generic";

export const ComplaintResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  message: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ComplaintResponseDto = z.infer<typeof ComplaintResponseSchema>;

export const ComplaintsListResponseSchema = z.array(ComplaintResponseSchema);

export type ComplaintsListResponseDto = z.infer<typeof ComplaintsListResponseSchema>;

export const PaginatedComplaintResponseSchema = PaginatedResponseSchema(
  ComplaintResponseSchema
);

export type PaginatedComplaintResponseDto = z.infer<typeof PaginatedComplaintResponseSchema>;
