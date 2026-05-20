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

interface ComplaintResolvedEmailProps {
  userFirstname?: string;
  complaintId?: string;
  subject?: string;
}

export const ComplaintResolvedEmail = ({
  userFirstname,
  complaintId,
  subject,
}: ComplaintResolvedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your complaint has been resolved - Irfan Cars & Tours</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Complaint Resolved</Heading>
          <Text style={text}>Hi {userFirstname},</Text>
          <Section>
            <Text style={text}>
              We are writing to inform you that your complaint (ID: {complaintId})
              regarding "{subject}" has been marked as resolved.
            </Text>
            <Text style={text}>
              We hope our resolution is satisfactory. If you have any further
              concerns, please don't hesitate to reach out to us.
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

export default ComplaintResolvedEmail;
