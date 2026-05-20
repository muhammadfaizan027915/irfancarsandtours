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

import { SendPasswordResetSuccessEmailArgs } from "../sender.types";

type PasswordResetSuccessEmailProps = SendPasswordResetSuccessEmailArgs;

export const PasswordResetSuccessEmail = ({
  user,
}: PasswordResetSuccessEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Irfan Cars & Tours password was reset</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              Password updated successfully
            </Heading>
            <Text className="text-[#333] text-base leading-7">Hi {user.name},</Text>
            <Section>
              <Text className="text-[#333] text-base leading-7">
                This is a confirmation that the password for your Irfan Cars & Tours account
                has been successfully changed.
              </Text>
              <Text className="text-[#333] text-base leading-7">
                If you did not make this change, please contact our support team immediately.
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

export default PasswordResetSuccessEmail;
