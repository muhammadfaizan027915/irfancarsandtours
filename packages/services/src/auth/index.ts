import {
  ForgotPasswordBodyDto,
  ResetPasswordBodyDto,
  UserResponseDto,
} from "@icat/contracts";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { db, DbOrTransaction } from "@icat/database";
import { ValidationError } from "@icat/lib";

import { VerificationTokenService } from "../verificationtokens";
import { UserService } from "../users";
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

        // In a real application, you would send an email here.
        // For testing, we log the link to the console.
        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const resetLink = `${baseUrl}${NavigationUrls.RESET_PASSWORD}?token=${token.token}`;
        console.log("Password reset link:", resetLink);
      }
    } catch (error) {
      // If user not found, we still return success to prevent email enumeration
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
  }
}
