import { z } from "zod";
import {
  BrandNamesList,
  FuelTypesList,
  AmenitiesList,
  CarTypesList,
  TransmissionTypesList,
} from "@icat/database/enums";
import { PaginatedResponseSchema } from "../generic";

export const CarResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  model: z.string(),
  year: z.number().int(),
  brand: z.enum(BrandNamesList),
  carType: z.enum(CarTypesList),
  fuelType: z.enum(FuelTypesList),
  transmissionType: z.enum(TransmissionTypesList),
  amenities: z.array(z.enum(AmenitiesList)),
  imageUrls: z.array(z.url()).default([]),
  seatingCapacity: z.number().int(),
  isFeatured: z.boolean(),
  timesSearched: z.number().int(),
  isAllowedBookingWithoutDriver: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
});

export type CarResponseDto = z.infer<typeof CarResponseSchema>;

export const PaginatedCarResponseSchema =
  PaginatedResponseSchema(CarResponseSchema);

export type PaginatedCarResponseDto = z.infer<
  typeof PaginatedCarResponseSchema
>;
