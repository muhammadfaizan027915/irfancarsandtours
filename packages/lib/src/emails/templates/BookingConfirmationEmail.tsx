import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface BookingConfirmationEmailProps {
  userFirstname?: string;
  bookingId?: string;
  totalPrice?: number;
  pickupDate?: string;
  dropoffDate?: string;
}

export const BookingConfirmationEmail = ({
  userFirstname,
  bookingId,
  totalPrice,
  pickupDate,
  dropoffDate,
}: BookingConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your booking confirmation - Irfan Cars & Tours</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking Confirmation</Heading>
          <Text style={text}>Hi {userFirstname},</Text>
          <Text style={text}>
            Thank you for booking with Irfan Cars & Tours! Your booking has been
            received and is being processed.
          </Text>
          <Section style={detailsContainer}>
            <Text style={detailText}>
              <strong>Booking ID:</strong> {bookingId}
            </Text>
            <Text style={detailText}>
              <strong>Total Price:</strong> Rs. {totalPrice?.toLocaleString()}
            </Text>
            <Text style={detailText}>
              <strong>Pickup Date:</strong> {pickupDate}
            </Text>
            <Text style={detailText}>
              <strong>Drop-off Date:</strong> {dropoffDate}
            </Text>
          </Section>
          <Text style={text}>
            We will contact you shortly with further details. If you have any
            questions, please reply to this email.
          </Text>
          <Text style={footer}>
            © {new Date().getFullYear()} Irfan Cars & Tours. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const detailsContainer = {
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "5px",
  margin: "20px 0",
};

const detailText = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "5px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "20px",
};

export default BookingConfirmationEmail;
