import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ReactElement } from "react";

/**
 * Generic email sender using Nodemailer and React Email.
 */
export async function sendEmail({
  to,
  subject,
  template,
}: {
  to: string;
  subject: string;
  template: ReactElement;
}): Promise<void> {
  console.log("DEBUG: Email Environment Variables:");
  console.log("- SMTP_HOST:", process.env.SMTP_HOST);
  console.log("- SMTP_PORT:", process.env.SMTP_PORT);
  console.log("- SMTP_USER:", process.env.SMTP_USER);
  console.log("- MAIL_FROM_ADDRESS:", process.env.MAIL_FROM_ADDRESS);
  console.log("- APP_URL:", process.env.APP_URL);

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

    const html = await render(template);

    const fromName = process.env.MAIL_FROM_NAME || "Irfan Cars & Tours";
    const fromAddress = process.env.MAIL_FROM_ADDRESS || process.env.EMAIL_FROM || "noreply@irfancarsandtours.com";

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    // We don't throw here to avoid breaking the main flow (Fire and Forget)
  }
}
