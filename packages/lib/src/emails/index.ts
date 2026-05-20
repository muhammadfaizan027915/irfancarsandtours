import * as React from "react";

import { sendEmail } from "./sender";
import {
  SendBookingConfirmationEmailArgs,
  SendComplaintCreatedAdminEmailArgs,
  SendComplaintStatusUpdateEmailArgs,
  SendForgotPasswordEmailArgs,
  SendPasswordResetSuccessEmailArgs,
  SendWelcomeEmailArgs,
} from "./sender.types";
import {
  BookingConfirmationEmail,
  ComplaintCreatedAdminEmail,
  ComplaintStatusUpdateEmail,
  ForgotPasswordEmail,
  PasswordResetSuccessEmail,
  WelcomeEmail,
} from "./templates";

export * from "./sender";

export async function sendWelcomeEmail({
  user,
}: SendWelcomeEmailArgs): Promise<void> {
  return sendEmail({
    to: user.email,
    subject: "Welcome to Irfan Cars & Tours!",
    content: React.createElement(WelcomeEmail, { user }),
  });
}

export async function sendForgotPasswordEmail({
  user,
  resetLink,
}: SendForgotPasswordEmailArgs): Promise<void> {
  return sendEmail({
    to: user.email,
    subject: "Reset your Irfan Cars & Tours password",
    content: React.createElement(ForgotPasswordEmail, {
      user,
      resetLink,
    }),
  });
}

export async function sendPasswordResetSuccessEmail({
  user,
}: SendPasswordResetSuccessEmailArgs): Promise<void> {
  return sendEmail({
    to: user.email,
    subject: "Your Irfan Cars & Tours password was reset",
    content: React.createElement(PasswordResetSuccessEmail, { user }),
  });
}

export async function sendBookingConfirmationEmail({
  user,
  booking,
}: SendBookingConfirmationEmailArgs): Promise<void> {
  return sendEmail({
    to: user.email,
    subject: `Booking Confirmation - ${booking.id}`,
    content: React.createElement(BookingConfirmationEmail, {
      user,
      booking,
    }),
  });
}

export async function sendComplaintCreatedAdminEmail({
  complaint,
}: SendComplaintCreatedAdminEmailArgs): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not set, skipping complaint notification.");
    return;
  }

  return sendEmail({
    to: adminEmail,
    subject: `New Complaint: ${complaint.id}`,
    content: React.createElement(ComplaintCreatedAdminEmail, {
      complaint,
    }),
  });
}

export async function sendComplaintStatusUpdateEmail({
  complaint,
}: SendComplaintStatusUpdateEmailArgs): Promise<void> {
  return sendEmail({
    to: complaint.email,
    subject: `Complaint Status Updated - ${complaint.id}`,
    content: React.createElement(ComplaintStatusUpdateEmail, {
      complaint,
    }),
  });
}
