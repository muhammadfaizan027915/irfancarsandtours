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

import { SendComplaintStatusUpdateEmailArgs } from "../sender.types";

type ComplaintStatusUpdateEmailProps = SendComplaintStatusUpdateEmailArgs;

export const ComplaintStatusUpdateEmail = ({
  complaint,
}: ComplaintStatusUpdateEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Update regarding your complaint - Irfan Cars & Tours</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              Complaint Status Update
            </Heading>
            <Text className="text-[#333] text-base leading-7">
              Hi {complaint.name},
            </Text>
            <Section>
              <Text className="text-[#333] text-base leading-7">
                We are writing to inform you that the status of your complaint
                (ID: {complaint.id}) has been updated to:{" "}
                <strong>{complaint.status}</strong>.
              </Text>
              <Text className="text-[#333] text-base leading-7">
                We are working to ensure your concerns are addressed. If you
                have any further questions, please don&apos;t hesitate to reach out
                to us.
              </Text>
            </Section>
            <Text className="text-[#8898aa] text-xs leading-4 text-center mt-5">
              © {new Date().getFullYear()} Irfan Cars & Tours. All rights
              reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ComplaintStatusUpdateEmail;
