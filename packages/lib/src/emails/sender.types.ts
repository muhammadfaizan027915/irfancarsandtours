import { ReactElement } from "react";

import {
  BookingResponseDto,
  ComplaintResponseDto,
  TourBookingResponseDto,
  UserResponseDto,
} from "@icat/contracts";

export type SendEmailArgs = {
  to: string;
  subject: string;
  content: ReactElement;
};

export type SendWelcomeEmailArgs = {
  user: UserResponseDto;
};

export type SendForgotPasswordEmailArgs = {
  user: UserResponseDto;
  resetLink: string;
};

export type SendPasswordResetSuccessEmailArgs = {
  user: UserResponseDto;
};

export type SendBookingConfirmationEmailArgs = {
  user: Pick<UserResponseDto, "name" | "email">;
  booking: BookingResponseDto;
};

export type SendBookingStatusUpdateEmailArgs = {
  user: Pick<UserResponseDto, "name" | "email">;
  booking: BookingResponseDto;
};

export type SendCarBookingCreatedAdminEmailArgs = {
  user: Pick<UserResponseDto, "name" | "email">;
  booking: BookingResponseDto;
};

export type SendTourBookingConfirmationEmailArgs = {
  user: Pick<UserResponseDto, "name" | "email">;
  booking: Pick<TourBookingResponseDto, "id" | "totalPrice">;
};

export type SendTourBookingStatusUpdateEmailArgs = {
  user: Pick<UserResponseDto, "name" | "email">;
  booking: Pick<TourBookingResponseDto, "id" | "status">;
};

export type SendTourBookingCreatedAdminEmailArgs = {
  user: Pick<UserResponseDto, "name" | "email">;
  booking: Pick<TourBookingResponseDto, "id" | "totalPrice" | "notes">;
};

export type SendTourBookingPriceUpdateEmailArgs = {
  user: Pick<UserResponseDto, "name" | "email">;
  booking: Pick<TourBookingResponseDto, "id" | "totalPrice">;
};

export type SendComplaintCreatedAdminEmailArgs = {
  complaint: ComplaintResponseDto;
};

export type SendComplaintConfirmationEmailArgs = {
  complaint: ComplaintResponseDto;
};

export type SendComplaintStatusUpdateEmailArgs = {
  complaint: ComplaintResponseDto;
};

