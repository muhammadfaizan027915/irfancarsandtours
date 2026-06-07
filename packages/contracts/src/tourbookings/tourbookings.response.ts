import z from "zod";

import { BookingStatusList } from "@icat/database/enums";

import { BookingWithUserListItemResponseSchema } from "../bookings";
import { PaginatedResponseSchema, toDate } from "../generic";
import { DetailedUserResponseSchema } from "../users";

export const TourBookingResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  cnic: z.string(),
  userId: z.string(),
  notes: z.string().optional(),
  totalPrice: z.number(),
  status: z.enum(BookingStatusList),
  deletedAt: toDate(z.date().nullish()),
  createdAt: toDate(z.date()),
  updatedAt: toDate(z.date()),
});

export type TourBookingResponseDto = z.infer<typeof TourBookingResponseSchema>;

export const TourBookingListItemResponseSchema = TourBookingResponseSchema.omit(
  {
    deletedAt: true,
  },
);

export type TourBookingListItemResponseDto = z.infer<
  typeof TourBookingListItemResponseSchema
>;

export const TourBookingListResponseSchema = z.array(
  TourBookingListItemResponseSchema,
);

export type TourBookingListResponseDto = z.infer<
  typeof TourBookingListResponseSchema
>;

export const PaginatedTourBookingResponseSchema = PaginatedResponseSchema(
  TourBookingListItemResponseSchema,
);

export type PaginatedTourBookingResponseDto = z.infer<
  typeof PaginatedTourBookingResponseSchema
>;

export const TourBookingWithUserListItemResponseSchema =
  TourBookingListItemResponseSchema.extend({
    bookedBy: DetailedUserResponseSchema.pick({
      id: true,
      name: true,
      email: true,
      phone: true,
      cnic: true,
      image: true,
    }),
  });

export type TourBookingWithUserListItemResponseDto = z.infer<
  typeof TourBookingWithUserListItemResponseSchema
>;

export const TourBookingWithUserListResponseSchema = z.array(
  TourBookingWithUserListItemResponseSchema,
);

export type TourBookingWithUserListResponseDto = z.infer<
  typeof TourBookingWithUserListResponseSchema
>;

export const PaginatedTourBookingWithUserResponseSchema = PaginatedResponseSchema(
  TourBookingWithUserListItemResponseSchema,
);

export type PaginatedTourBookingWithUserResponseDto = z.infer<
  typeof PaginatedTourBookingWithUserResponseSchema
>;
