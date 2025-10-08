import { z } from "zod";
import { toDate } from "../generic";

export const CarBookingRequestSchema = z
  .object({
    name: z.string("Name is required").min(1, "Name is required"),
    email: z.email("Invalid email"),
    phone: z
      .string("Phone number is required")
      .min(7, "Phone number is too short"),
    cnic: z.string("CNIC is required").min(5, "CNIC is required"),
    pickupDate: toDate(z.date("Pickup date required")),
    pickupAddress: z
      .string("Pickup address is required")
      .min(5, "Pickup address must be at least 5 characters")
      .max(255, "Pickup address is too long"),

    dropoffDate: toDate(z.date("Dropoff date required")),
    dropoffAddress: z
      .string("Dropoff address is required")
      .min(5, "Dropoff address is required")
      .max(255, "Dropoff address too long"),
    cars: z.array(
      z.object({
        carId: z.string(),
        quantity: z.number().optional().default(1),
        bookedWithDriver: z.boolean().optional().default(false),
      })
    ),
  })
  .refine((obj) => obj.dropoffDate >= obj.pickupDate, {
    message: "dropoffDate must be the same or after pickupDate",
    path: ["dropoffDate"],
  });

export type BookingRequestDto = z.infer<typeof CarBookingRequestSchema>;

export const GetBookingsBodySchema = z.object({
  page: z
    .string()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .optional(),

  limit: z
    .string()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .optional(),
});

export type GetBookingsBodyDto = z.infer<typeof GetBookingsBodySchema>;

export const GetBookingByUserIdBodySchema = GetBookingsBodySchema.extend({
  userId: z.string(),
});

export type GetBookingsByUserIdBodyDto = z.infer<
  typeof GetBookingByUserIdBodySchema
>;
