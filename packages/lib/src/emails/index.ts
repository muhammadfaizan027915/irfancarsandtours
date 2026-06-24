import * as React from "react";

import { sendEmail } from "./sender";
import {
  SendBookingConfirmationEmailArgs,
  SendBookingStatusUpdateEmailArgs,
  SendCarBookingCreatedAdminEmailArgs,
  SendComplaintConfirmationEmailArgs,
  SendComplaintCreatedAdminEmailArgs,
  SendComplaintStatusUpdateEmailArgs,
  SendForgotPasswordEmailArgs,
  SendPasswordResetSuccessEmailArgs,
  SendTourBookingConfirmationEmailArgs,
  SendTourBookingCreatedAdminEmailArgs,
  SendTourBookingPriceUpdateEmailArgs,
  SendTourBookingStatusUpdateEmailArgs,
  SendWelcomeEmailArgs,
} from "./sender.types";
import {
  BookingConfirmationEmail,
  BookingStatusUpdateEmail,
  CarBookingCreatedAdminEmail,
  ComplaintConfirmationEmail,
  ComplaintCreatedAdminEmail,
  ComplaintStatusUpdateEmail,
  ForgotPasswordEmail,
  PasswordResetSuccessEmail,
  TourBookingConfirmationEmail,
  TourBookingCreatedAdminEmail,
  TourBookingPriceUpdateEmail,
  TourBookingStatusUpdateEmail,
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

export async function sendBookingStatusUpdateEmail({
  user,
  booking,
}: SendBookingStatusUpdateEmailArgs): Promise<void> {
  return sendEmail({
    to: user.email,
    subject: `Booking Status Updated - ${booking.id}`,
    content: React.createElement(BookingStatusUpdateEmail, {
      user,
      booking,
    }),
  });
}

export async function sendCarBookingCreatedAdminEmail({
  user,
  booking,
}: SendCarBookingCreatedAdminEmailArgs): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not set, skipping car booking admin notification.");
    return;
  }

  return sendEmail({
    to: adminEmail,
    subject: `New Car Booking Received: ${booking.id}`,
    content: React.createElement(CarBookingCreatedAdminEmail, {
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

export async function sendComplaintConfirmationEmail({
  complaint,
}: SendComplaintConfirmationEmailArgs): Promise<void> {
  return sendEmail({
    to: complaint.email,
    subject: `Complaint Received - ${complaint.id}`,
    content: React.createElement(ComplaintConfirmationEmail, {
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

export async function sendTourBookingConfirmationEmail({
  user,
  booking,
}: SendTourBookingConfirmationEmailArgs): Promise<void> {
  return sendEmail({
    to: user.email,
    subject: `Tour Booking Received - ${booking.id}`,
    content: React.createElement(TourBookingConfirmationEmail, {
      user,
      booking,
    }),
  });
}

export async function sendTourBookingStatusUpdateEmail({
  user,
  booking,
}: SendTourBookingStatusUpdateEmailArgs): Promise<void> {
  return sendEmail({
    to: user.email,
    subject: `Tour Booking Status Updated - ${booking.id}`,
    content: React.createElement(TourBookingStatusUpdateEmail, {
      user,
      booking,
    }),
  });
}

export async function sendTourBookingCreatedAdminEmail({
  user,
  booking,
}: SendTourBookingCreatedAdminEmailArgs): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not set, skipping tour booking admin notification.");
    return;
  }

  return sendEmail({
    to: adminEmail,
    subject: `New Tour Booking Received: ${booking.id}`,
    content: React.createElement(TourBookingCreatedAdminEmail, {
      user,
      booking,
    }),
  });
}

export async function sendTourBookingPriceUpdateEmail({
  user,
  booking,
}: SendTourBookingPriceUpdateEmailArgs): Promise<void> {
  return sendEmail({
    to: user.email,
    subject: `Tour Booking Quoted Price Updated - ${booking.id}`,
    content: React.createElement(TourBookingPriceUpdateEmail, {
      user,
      booking,
    }),
  });
}
