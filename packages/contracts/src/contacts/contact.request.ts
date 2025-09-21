import { z } from "zod";

export const ContactRequestBodySchema = z.object({
  name: z.string("Name is required").min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string("Phone number is required").min(7, "Invalid phone number"),
  message: z.string("Message is required").min(10, "Message must be at least 10 characters"),
});

export type ContactRequestBodyDto = z.infer<typeof ContactRequestBodySchema>;
