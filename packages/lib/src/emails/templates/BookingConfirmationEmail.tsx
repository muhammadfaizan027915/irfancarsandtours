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

import { SendBookingConfirmationEmailArgs } from "../sender.types";

type BookingConfirmationEmailProps = SendBookingConfirmationEmailArgs;

export const BookingConfirmationEmail = ({
  user,
  booking,
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your booking confirmation - Irfan Cars & Tours</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              Booking Confirmation
            </Heading>
            <Text className="text-[#333] text-base leading-7">Hi {user.name},</Text>
            <Text className="text-[#333] text-base leading-7">
              Thank you for booking with Irfan Cars & Tours! Your booking has been
              received and is being processed.
            </Text>
            <Section className="bg-[#f9f9f9] p-5 rounded my-5">
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Booking ID:</strong> {booking.id}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Total Price:</strong> Rs. {booking.totalPrice?.toLocaleString()}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Pickup Date:</strong> {booking.pickupDate.toLocaleString()}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Drop-off Date:</strong> {booking.dropoffDate.toLocaleString()}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Pickup Address:</strong> {booking.pickupAddress}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Drop-off Address:</strong> {booking.dropoffAddress}
              </Text>
            </Section>
            <Text className="text-[#333] text-base leading-7">
              We will contact you shortly with further details. If you have any
              questions, please reply to this email.
            </Text>
            <Text className="text-[#8898aa] text-xs leading-4 text-center mt-5">
              © {new Date().getFullYear()} Irfan Cars & Tours. All rights
              reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BookingConfirmationEmail;
