import { z } from "zod";

import { PhoneSchema } from "../generic";

export const ComplaintRequestBodySchema = z.object({
  name: z.string("Name is required").min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: PhoneSchema,
  message: z.string("Message is required").min(10, "Message must be at least 10 characters"),
});

export type ComplaintRequestBodyDto = z.infer<typeof ComplaintRequestBodySchema>;

export const GetComplaintsBodySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(50),
  search: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type GetComplaintsBodyDto = z.infer<typeof GetComplaintsBodySchema>;
