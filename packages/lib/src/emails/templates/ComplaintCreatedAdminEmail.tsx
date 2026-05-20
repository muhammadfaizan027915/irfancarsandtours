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

import { SendComplaintCreatedAdminEmailArgs } from "../sender.types";

type ComplaintCreatedAdminEmailProps = SendComplaintCreatedAdminEmailArgs;

export const ComplaintCreatedAdminEmail = ({
  complaint,
}: ComplaintCreatedAdminEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Complaint Received - Irfan Cars & Tours</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              New Complaint Submitted
            </Heading>
            <Text className="text-[#333] text-base leading-7">Hello Admin,</Text>
            <Text className="text-[#333] text-base leading-7">
              A new complaint has been submitted through the platform.
            </Text>
            <Section className="bg-[#f9f9f9] p-5 rounded my-5">
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Complaint ID:</strong> {complaint.id}
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>From:</strong> {complaint.name} ({complaint.email})
              </Text>
              <Text className="text-[#333] text-sm leading-5 my-1">
                <strong>Phone:</strong> {complaint.phone}
              </Text>
              <Text className="text-[#333] text-sm leading-5 mt-3 mb-1">
                <strong>Message:</strong>
              </Text>
              <Text className="text-[#555] text-sm leading-6 italic p-3 bg-white border border-solid border-[#ddd] rounded">
                {complaint.message}
              </Text>
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

export default ComplaintCreatedAdminEmail;
