import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

import { SendBookingStatusUpdateEmailArgs } from "../sender.types";

type BookingStatusUpdateEmailProps = SendBookingStatusUpdateEmailArgs;

export const BookingStatusUpdateEmail = ({
  user,
  booking,
}: BookingStatusUpdateEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your booking status update - Irfan Cars & Tours</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              Booking Status Update
            </Heading>
            <Text className="text-[#333] text-base leading-7">Hi {user.name},</Text>
            <Text className="text-[#333] text-base leading-7">
              We are writing to inform you that the status of your booking (ID: {booking.id}) has been updated.
            </Text>
            <Section className="bg-[#f9f9f9] p-5 rounded my-5 text-center">
              <Text className="text-[#333] text-lg font-semibold my-1">
                New Status: {booking.status}
              </Text>
            </Section>
            <Section className="bg-[#f9f9f9] p-5 rounded my-5">
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Booking ID:</strong> {booking.id}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Pickup Date:</strong> {booking.pickupDate.toLocaleString()}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Drop-off Date:</strong> {booking.dropoffDate.toLocaleString()}
              </Text>
            </Section>
            <Text className="text-[#333] text-base leading-7">
              If you have any questions or concerns regarding this update, please reply to this email or contact us through our website.
            </Text>
            <Text className="text-[#8898aa] text-xs leading-4 text-center mt-5">
              © {new Date().getFullYear()} Irfan Cars & Tours. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BookingStatusUpdateEmail;
