import z from "zod";

import { BookingStatusList } from "@icat/database/enums";

import { CNICSchema, PhoneSchema } from "../generic";

export const TourBookingBodySchema = z.object({
  name: z.string("Name is required").min(1, "Name is required"),
  email: z.email("Invalid email"),
  phone: PhoneSchema,
  cnic: CNICSchema,

  tours: z.array(
    z.object({
      tourId: z.uuid(),
      adultsNumber: z.coerce.number().int().min(1),
      childrenNumber: z.coerce.number().int().min(0),
      quotedPricePerAdult: z.coerce.number().int().min(0).optional(),
      quotedPricePerChild: z.coerce.number().int().min(0).optional(),
    }),
  ),

  notes: z.string().optional(),
  userId: z.string().optional(),
});

export type TourBookingBodyDto = z.infer<typeof TourBookingBodySchema>;

export const UpadateTourBookingStatusSchema = z.object({
  id: z.string().min(1, "Invalid booking ID"),
  status: z.enum(BookingStatusList, {
    error: "Please select a valid booking status",
  }),
});

export type UpdateTourBookingStatusDto = z.infer<
  typeof UpadateTourBookingStatusSchema
>;

export const GetTourBookingsBodySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.email().optional(),
  phone: PhoneSchema.optional(),
  status: z.enum(BookingStatusList).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type GetTourBookingsBodyDto = z.infer<typeof GetTourBookingsBodySchema>;

export const GetTourBookingByUserIdBodySchema =
  GetTourBookingsBodySchema.extend({
    userId: z.string(),
  });

export type GetTourBookingByUserIdBodyDto = z.infer<
  typeof GetTourBookingByUserIdBodySchema
>;