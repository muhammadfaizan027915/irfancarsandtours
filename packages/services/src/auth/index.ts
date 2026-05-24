import "server-only";

import { after } from "next/server";

import { ForgotPasswordBodyDto, ResetPasswordBodyDto } from "@icat/contracts";
import { db, DbOrTransaction } from "@icat/database";
import { NavigationUrls } from "@icat/features/common/header/header.constants";
import {
  sendForgotPasswordEmail,
  sendPasswordResetSuccessEmail,
} from "@icat/lib/emails";
import { ValidationError } from "@icat/lib/errors";

import { UserService } from "../users";
import { VerificationTokenService } from "../verificationtokens";
import { comparePassword, hashPassword } from "./password.utils";

export class AuthService {
  private readonly userService: UserService;
  private readonly verificationTokenService: VerificationTokenService;

  constructor() {
    this.userService = new UserService();
    this.verificationTokenService = new VerificationTokenService();
  }

  async hashPassword(password: string): Promise<string> {
    return hashPassword(password);
  }

  async comparePassword(password: string, hashed: string): Promise<boolean> {
    return comparePassword(password, hashed);
  }

  async forgotPassword(
    data: ForgotPasswordBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<void> {
    try {
      const user = await this.userService.getUserByEmail(data.email, tx);

      if (user) {
        const token = await this.verificationTokenService.generateToken(
          data.email,
          60,
          tx,
        );

        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const resetLink = `${baseUrl}${NavigationUrls.RESET_PASSWORD}?token=${token.token}`;

        after(
          sendForgotPasswordEmail({
            user,
            resetLink,
          }),
        );
      }
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  }

  async resetPassword(
    data: ResetPasswordBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<void> {
    const verificationToken = await this.verificationTokenService.verifyToken(
      data.token,
      tx,
    );

    if (!verificationToken) {
      throw new ValidationError({
        message: "Invalid or expired reset token. Please try again.",
      });
    }

    const user = await this.userService.getUserByEmail(
      verificationToken.identifier,
      tx,
    );

    const hashedPassword = await this.hashPassword(data.password);

    await this.userService.updateUser(
      user.id,
      {
        password: hashedPassword,
      },
      tx,
    );

    await this.verificationTokenService.deleteToken(data.token, tx);

    after(
      sendPasswordResetSuccessEmail({
        user,
      }),
    );
  }
}

