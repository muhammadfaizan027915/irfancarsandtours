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

import { SendWelcomeEmailArgs } from "../sender.types";

type WelcomeEmailProps =  SendWelcomeEmailArgs;

export const WelcomeEmail = ({ user }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Irfan Cars & Tours!</Preview>
    <Tailwind>
      <Body className="bg-[#f6f9fc] font-sans">
        <Container className="bg-white mx-auto py-5 pb-12 mb-16 px-4">
          <Heading className="text-[#333] text-2xl font-bold text-center my-8">
            Welcome, {user.name || "there"}!
          </Heading>
          <Section>
            <Text className="text-[#333] text-base leading-7 text-center">
              We&apos;re excited to have you on board with Irfan Cars & Tours. Your
              account has been successfully created.
            </Text>
            <Text className="text-[#333] text-base leading-7 text-center">
              You can now browse our fleet and book your next trip with ease.
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

export default WelcomeEmail;
