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

import { SendTourBookingConfirmationEmailArgs } from "../sender.types";

type TourBookingConfirmationEmailProps = SendTourBookingConfirmationEmailArgs;

export const TourBookingConfirmationEmail = ({
  user,
  booking,
}: TourBookingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your tour booking confirmation - Irfan Cars & Tours</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              Tour Booking Received
            </Heading>
            <Text className="text-[#333] text-base leading-7">Hi {user.name},</Text>
            <Text className="text-[#333] text-base leading-7">
              Thank you for requesting a tour booking with Irfan Cars & Tours! We have
              received your request and are reviewing it.
            </Text>
            <Section className="bg-[#f9f9f9] p-5 rounded my-5">
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Booking ID:</strong> {booking.id}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Estimated Total Price:</strong> Rs. {booking.totalPrice?.toLocaleString()}
              </Text>
            </Section>
            <Text className="text-[#333] text-base leading-7">
              Our team will contact you shortly to confirm details and pricing. If you have any
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

export default TourBookingConfirmationEmail;
