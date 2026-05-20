import { ReactElement } from "react";

import {
  BookingResponseDto,
  ComplaintResponseDto,
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
  user: UserResponseDto;
  booking: BookingResponseDto;
};

export type SendComplaintCreatedAdminEmailArgs = {
  complaint: ComplaintResponseDto;
};

export type SendComplaintStatusUpdateEmailArgs = {
  complaint: ComplaintResponseDto;
};

