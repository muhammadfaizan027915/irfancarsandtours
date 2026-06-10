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

import { SendTourBookingCreatedAdminEmailArgs } from "../sender.types";

type TourBookingCreatedAdminEmailProps = SendTourBookingCreatedAdminEmailArgs;

export const TourBookingCreatedAdminEmail = ({
  user,
  booking,
}: TourBookingCreatedAdminEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Tour Booking Received - {booking.id}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              New Tour Booking Received
            </Heading>
            <Text className="text-[#333] text-base leading-7">
              A new tour booking has been placed by {user.name}.
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
                <strong>Estimated Total Price:</strong> Rs. {booking.totalPrice?.toLocaleString()}
              </Text>
              {booking.notes && (
                <Text className="text-[#333] text-sm leading-5 my-1 mt-3">
                  <strong>Notes:</strong> {booking.notes}
                </Text>
              )}
            </Section>
            <Text className="text-[#333] text-base leading-7">
              Please review this booking and provide a finalized quote to the customer.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TourBookingCreatedAdminEmail;
