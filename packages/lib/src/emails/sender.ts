import nodemailer from "nodemailer";
import { render } from "react-email";

import { SendEmailArgs } from "./sender.types";



export async function sendEmail({
  to,
  subject,
  content,
}: SendEmailArgs): Promise<void> {

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = await render(content);
    const from = process.env.MAIL_FROM_NAME || "Irfan Cars & Tours";
    const email = process.env.MAIL_FROM_ADDRESS || process.env.EMAIL_FROM || "noreply@irfancarsandtours.com";

    const info = await transporter.sendMail({
      from: `"${from}" <${email}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
