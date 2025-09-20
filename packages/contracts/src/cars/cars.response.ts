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
  description: z.string().nullish(),
  brand: z.enum(BrandNamesList),
  carType: z.enum(CarTypesList),
  fuelType: z.enum(FuelTypesList),
  transmissionType: z.enum(TransmissionTypesList),

  amenities: z.preprocess(
    (val) => (val === null ? [] : val),
    z.array(z.enum(AmenitiesList))
  ),

  imageUrls: z.preprocess(
    (val) => (val === null ? [] : val),
    z.array(z.url())
  ),

  seatingCapacity: z.number().int(),
  isFeatured: z.boolean(),
  timesSearched: z.number().int().nullish(),
  isAllowedBookingWithoutDriver: z.boolean().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
});

export type CarResponseDto = z.infer<typeof CarResponseSchema>;

const CarListItemResponseSchema = CarResponseSchema.omit({
  description: true,
  amenities: true,
  deletedAt: true,
});

export type CarListItemResponseDto = z.infer<typeof CarListItemResponseSchema>;

export const CarsListResponseSchema = z.array(CarListItemResponseSchema);

export type CarsListResponseDto = z.infer<typeof CarsListResponseSchema>;

export const PaginatedCarResponseSchema = PaginatedResponseSchema(
  CarListItemResponseSchema
);

export type PaginatedCarResponseDto = z.infer<
  typeof PaginatedCarResponseSchema
>;
