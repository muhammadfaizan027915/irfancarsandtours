import { z } from "zod";
import {
  BrandNamesList,
  FuelTypesList,
  AmenitiesList,
  CarTypesList,
  TransmissionTypesList,
} from "@icat/database";

export const RegisterCarSchema = z.object({
  name: z.string().min(1, "Name is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900, "Invalid year"),
  brand: z.enum(BrandNamesList),
  carType: z.enum(CarTypesList),
  fuelType: z.enum(FuelTypesList),
  transmissionType: z.enum(TransmissionTypesList),
  amenities: z.array(z.enum(AmenitiesList)),
  imageUrls: z.array(z.url()).optional(),
  seatingCapacity: z
    .number()
    .int()
    .min(1, "Seating capacity must be at least 1"),
  isFeatured: z.boolean().optional().default(false),
  timesSearched: z.number().int().optional().default(0),
  isAllowedBookingWithoutDriver: z.boolean().optional().default(false),
});

export type RegisterCarDto = z.infer<typeof RegisterCarSchema>;

export const UpdateCarSchema = RegisterCarSchema.partial().extend({
  id: z.uuid("Invalid car ID"),
});

export type UpdateCarDto = z.infer<typeof UpdateCarSchema>;

export const DeleteCarSchema = z.object({
  id: z.uuid("Invalid car ID"),
});

export type DeleteCarDto = z.infer<typeof DeleteCarSchema>;
