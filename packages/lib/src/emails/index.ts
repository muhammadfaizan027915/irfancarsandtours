import * as React from "react";
import { sendEmail } from "./sender";
import WelcomeEmail from "./templates/WelcomeEmail";
import ForgotPasswordEmail from "./templates/ForgotPasswordEmail";
import PasswordResetSuccessEmail from "./templates/PasswordResetSuccessEmail";
import BookingConfirmationEmail from "./templates/BookingConfirmationEmail";
import ComplaintCreatedAdminEmail from "./templates/ComplaintCreatedAdminEmail";
import ComplaintResolvedEmail from "./templates/ComplaintResolvedEmail";

export * from "./sender";

export async function sendWelcomeEmail({
  email,
  name,
}: {
  email: string;
  name?: string;
}) {
  return sendEmail({
    to: email,
    subject: "Welcome to Irfan Cars & Tours!",
    template: React.createElement(WelcomeEmail, { name }),
  });
}

export async function sendForgotPasswordEmail({
  email,
  userFirstname,
  resetPasswordLink,
}: {
  email: string;
  userFirstname?: string;
  resetPasswordLink: string;
}) {
  return sendEmail({
    to: email,
    subject: "Reset your Irfan Cars & Tours password",
    template: React.createElement(ForgotPasswordEmail, {
      userFirstname,
      resetPasswordLink,
    }),
  });
}

export async function sendPasswordResetSuccessEmail({
  email,
  userFirstname,
}: {
  email: string;
  userFirstname?: string;
}) {
  return sendEmail({
    to: email,
    subject: "Your Irfan Cars & Tours password was reset",
    template: React.createElement(PasswordResetSuccessEmail, { userFirstname }),
  });
}

export async function sendBookingConfirmationEmail({
  email,
  userFirstname,
  bookingId,
  totalPrice,
  pickupDate,
  dropoffDate,
}: {
  email: string;
  userFirstname?: string;
  bookingId: string;
  totalPrice?: number | null;
  pickupDate: string;
  dropoffDate: string;
}) {
  return sendEmail({
    to: email,
    subject: `Booking Confirmation - ${bookingId}`,
    template: React.createElement(BookingConfirmationEmail, {
      userFirstname,
      bookingId,
      totalPrice: totalPrice ?? 0,
      pickupDate,
      dropoffDate,
    }),
  });
}

export async function sendComplaintCreatedAdminEmail({
  complaintId,
  userName,
  userEmail,
  subject,
  message,
}: {
  complaintId: string;
  userName?: string;
  userEmail?: string;
  subject: string;
  message?: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not set, skipping complaint notification.");
    return;
  }

  return sendEmail({
    to: adminEmail,
    subject: `New Complaint: ${subject}`,
    template: React.createElement(ComplaintCreatedAdminEmail, {
      complaintId,
      userName,
      userEmail,
      subject,
      message,
    }),
  });
}

export async function sendComplaintResolvedEmail({
  email,
  userFirstname,
  complaintId,
  subject,
}: {
  email: string;
  userFirstname?: string;
  complaintId: string;
  subject: string;
}) {
  return sendEmail({
    to: email,
    subject: "Your complaint has been resolved",
    template: React.createElement(ComplaintResolvedEmail, {
      userFirstname,
      complaintId,
      subject,
    }),
  });
}
