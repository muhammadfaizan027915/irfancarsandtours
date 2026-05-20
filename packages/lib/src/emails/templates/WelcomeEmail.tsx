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

interface WelcomeEmailProps {
  name?: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Irfan Cars & Tours!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome, {name || "there"}!</Heading>
        <Section>
          <Text style={text}>
            We're excited to have you on board with Irfan Cars & Tours. Your
            account has been successfully created.
          </Text>
          <Text style={text}>
            You can now browse our fleet and book your next trip with ease.
          </Text>
        </Section>
        <Text style={footer}>
          © {new Date().getFullYear()} Irfan Cars & Tours. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

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
  textAlign: "center" as const,
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "20px",
};

export default WelcomeEmail;
