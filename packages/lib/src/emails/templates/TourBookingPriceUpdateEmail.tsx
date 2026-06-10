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

import { SendTourBookingPriceUpdateEmailArgs } from "../sender.types";

type TourBookingPriceUpdateEmailProps = SendTourBookingPriceUpdateEmailArgs;

export const TourBookingPriceUpdateEmail = ({
  user,
  booking,
}: TourBookingPriceUpdateEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Price Updated for Tour Booking - Irfan Cars & Tours</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              Tour Booking Quoted Price Updated
            </Heading>
            <Text className="text-[#333] text-base leading-7">Hi {user.name},</Text>
            <Text className="text-[#333] text-base leading-7">
              Our team has reviewed your tour booking request (ID: {booking.id}) and we have finalized the total price for your trip.
            </Text>
            <Section className="bg-[#f9f9f9] p-5 rounded my-5 text-center">
              <Text className="text-[#333] text-lg font-semibold my-1">
                New Total Price: Rs. {booking.totalPrice?.toLocaleString()}
              </Text>
            </Section>
            <Section className="bg-[#f9f9f9] p-5 rounded my-5">
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Booking ID:</strong> {booking.id}
              </Text>
            </Section>
            <Text className="text-[#333] text-base leading-7">
              You can now proceed to review and confirm your booking through your dashboard. If you have any questions, please reply to this email.
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

export default TourBookingPriceUpdateEmail;
