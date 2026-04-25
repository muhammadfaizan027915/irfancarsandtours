import { z } from "zod";

export const ComplaintRequestBodySchema = z.object({
  name: z.string("Name is required").min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string("Phone number is required").min(7, "Invalid phone number"),
  message: z.string("Message is required").min(10, "Message must be at least 10 characters"),
});

export type ComplaintRequestBodyDto = z.infer<typeof ComplaintRequestBodySchema>;

export const GetComplaintsQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(50),
  search: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type GetComplaintsQueryDto = z.infer<typeof GetComplaintsQuerySchema>;
