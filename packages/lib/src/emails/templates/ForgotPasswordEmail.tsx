import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

import { SendForgotPasswordEmailArgs } from "../sender.types";

type ForgotPasswordEmailProps = SendForgotPasswordEmailArgs;

export const ForgotPasswordEmail = ({
  user,
  resetLink,
}: ForgotPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Irfan Cars & Tours password</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
            <Heading className="text-[#333] text-2xl font-bold text-center my-8">
              Reset your password
            </Heading>
            <Text className="text-[#333] text-base leading-7">
              Hi {user.name},
            </Text>
            <Text className="text-[#333] text-base leading-7">
              Someone requested a password reset for your Irfan Cars & Tours
              account. If this was you, you can set a new password here:
            </Text>
            <Section className="text-center my-8">
              <Button
                className="bg-[#5F51E8] rounded text-white text-base font-semibold text-center block p-3 no-underline"
                href={resetLink}
              >
                Reset password
              </Button>
            </Section>
            <Text className="text-[#333] text-base leading-7">
              If you don&apos;t want to change your password or didn&apos;t request this,
              just ignore and delete this message.
            </Text>
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

export default ForgotPasswordEmail;
