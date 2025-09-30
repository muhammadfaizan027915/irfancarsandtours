import { z } from "zod";

export const CarBookingRequestSchema = z.object({
  name: z.string("Name is required").min(1, "Name is required"),
  email: z.email("Invalid email"),
  phone: z
    .string("Phone number is required")
    .min(7, "Phone number is too short"),
  cnic: z.string("CNIC is required").min(5, "CNIC is required"),
  pickupDate: z.date("Pickup date required"),
  pickupAddress: z
    .string("Pickup address is required")
    .min(5, "Pickup address is required"),
  dropoffDate: z.date("Dropoff date required"),
  dropoffAddress: z
    .string("Dropoff address is required")
    .min(5, "Dropoff address is required"),
});

export type CarBookingRequestDto = z.infer<typeof CarBookingRequestSchema>;
