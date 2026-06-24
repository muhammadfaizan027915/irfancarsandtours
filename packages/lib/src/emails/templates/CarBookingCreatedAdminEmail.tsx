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

import { SendCarBookingCreatedAdminEmailArgs } from "../sender.types";

type CarBookingCreatedAdminEmailProps = SendCarBookingCreatedAdminEmailArgs;

export const CarBookingCreatedAdminEmail = ({
  user,
  booking,
}: CarBookingCreatedAdminEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Car Booking Received - {booking.id}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              New Car Booking Received
            </Heading>
            <Text className="text-[#333] text-base leading-7">
              A new car booking has been placed by {user.name}.
            </Text>
            <Section className="bg-[#f9f9f9] p-5 rounded my-5">
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Booking ID:</strong> {booking.id}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Customer Name:</strong> {user.name}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Customer Email:</strong> {user.email}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Pickup Date:</strong> {booking.pickupDate?.toLocaleDateString()}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Dropoff Date:</strong> {booking.dropoffDate?.toLocaleDateString()}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Estimated Total Price:</strong> Rs. {booking.totalPrice?.toLocaleString()}
              </Text>
            </Section>
            <Text className="text-[#333] text-base leading-7">
              Please review this booking and confirm the next steps.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CarBookingCreatedAdminEmail;
