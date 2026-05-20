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

interface PasswordResetSuccessEmailProps {
  userFirstname?: string;
}

export const PasswordResetSuccessEmail = ({
  userFirstname,
}: PasswordResetSuccessEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Irfan Cars & Tours password was reset</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Password updated successfully</Heading>
          <Text style={text}>Hi {userFirstname},</Text>
          <Section>
            <Text style={text}>
              This is a confirmation that the password for your Irfan Cars & Tours account
              has been successfully changed.
            </Text>
            <Text style={text}>
              If you did not make this change, please contact our support team immediately.
            </Text>
          </Section>
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

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "20px",
};

export default PasswordResetSuccessEmail;
