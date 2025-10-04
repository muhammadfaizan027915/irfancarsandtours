import z from "zod";
import { toDate } from "../generic";

export const CarBookingResponseSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  pickupAddress: z.string().min(1),
  pickupDate: toDate(z.date()),
  dropoffAddress: z.string().min(1),
  dropoffDate: toDate(z.date()),
  deletedAt: toDate(z.date().nullable()),
  createdAt: toDate(z.date().nullable()),
  updatedAt: toDate(z.date().nullable()),
});

export type CarBookingResponseDto = z.infer<typeof CarBookingResponseSchema>;
