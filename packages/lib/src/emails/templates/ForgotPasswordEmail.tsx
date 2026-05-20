import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ForgotPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

export const ForgotPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: ForgotPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Irfan Cars & Tours password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={text}>Hi {userFirstname},</Text>
          <Text style={text}>
            Someone requested a password reset for your Irfan Cars & Tours account.
            If this was you, you can set a new password here:
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={resetPasswordLink}>
              Reset password
            </Button>
          </Section>
          <Text style={text}>
            If you don't want to change your password or didn't request this, just
            ignore and delete this message.
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

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "20px",
};

export default ForgotPasswordEmail;
