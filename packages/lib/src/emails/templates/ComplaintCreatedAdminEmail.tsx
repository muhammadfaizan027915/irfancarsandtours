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

interface ComplaintCreatedAdminEmailProps {
  complaintId?: string;
  userName?: string;
  userEmail?: string;
  subject?: string;
  message?: string;
}

export const ComplaintCreatedAdminEmail = ({
  complaintId,
  userName,
  userEmail,
  subject,
  message,
}: ComplaintCreatedAdminEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Complaint Received - Irfan Cars & Tours</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Complaint Submitted</Heading>
          <Text style={text}>Hello Admin,</Text>
          <Text style={text}>
            A new complaint has been submitted through the platform.
          </Text>
          <Section style={detailsContainer}>
            <Text style={detailText}>
              <strong>Complaint ID:</strong> {complaintId}
            </Text>
            <Text style={detailText}>
              <strong>From:</strong> {userName} ({userEmail})
            </Text>
            <Text style={detailText}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Text style={detailText}>
              <strong>Message:</strong>
            </Text>
            <Text style={messageText}>{message}</Text>
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

const messageText = {
  color: "#555",
  fontSize: "14px",
  lineHeight: "22px",
  fontStyle: "italic",
  padding: "10px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "20px",
};

export default ComplaintCreatedAdminEmail;
