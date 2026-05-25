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

import { SendComplaintConfirmationEmailArgs } from "../sender.types";

type ComplaintConfirmationEmailProps = SendComplaintConfirmationEmailArgs;

export const ComplaintConfirmationEmail = ({
  complaint,
}: ComplaintConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your complaint has been received - Irfan Cars & Tours</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              Complaint Received
            </Heading>
            <Text className="text-[#333] text-base leading-7">
              Hi {complaint.name},
            </Text>
            <Section>
              <Text className="text-[#333] text-base leading-7">
                Thank you for reaching out to us. We have received your complaint (ID: {complaint.id}) and our team is looking into it.
              </Text>
              <Text className="text-[#333] text-base leading-7">
                We value your feedback and are committed to resolving any issues you may have. We will get back to you as soon as possible.
              </Text>
              <Section className="bg-[#f9f9f9] p-5 rounded my-5">
                <Text className="text-[#333] text-sm leading-5 mt-3 mb-1">
                  <strong>Your Message:</strong>
                </Text>
                <Text className="text-[#555] text-sm leading-6 italic p-3 bg-white border border-solid border-[#ddd] rounded">
                  {complaint.message}
                </Text>
              </Section>
            </Section>
            <Text className="text-[#8898aa] text-xs leading-4 text-center mt-5">
              © {new Date().getFullYear()} Irfan Cars & Tours. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ComplaintConfirmationEmail;
