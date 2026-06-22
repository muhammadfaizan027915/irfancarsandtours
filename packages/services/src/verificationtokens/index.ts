import {
  db,
  DbOrTransaction,
  VerificationTokenInsert,
  VerificationTokenSelect,
} from "@icat/database";
import { VerificationTokenRepository } from "@icat/repositories";

export class VerificationTokenService {
  private readonly verificationTokenRepository: VerificationTokenRepository;

  constructor() {
    this.verificationTokenRepository = new VerificationTokenRepository();
  }

  async generateToken(
    identifier: string,
    expiresInMinutes: number = 60,
    tx: DbOrTransaction = db,
  ): Promise<VerificationTokenSelect> {
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + expiresInMinutes * 60 * 1000);

    const data: VerificationTokenInsert = {
      identifier,
      token,
      expires,
    };

    return await this.verificationTokenRepository.create(data, tx);
  }

  async verifyToken(
    token: string,
    tx: DbOrTransaction = db,
  ): Promise<VerificationTokenSelect | null> {
    const verificationToken = await this.verificationTokenRepository.findByToken(
      token,
      tx,
    );

    if (!verificationToken) {
      return null;
    }

    if (new Date(verificationToken.expires) < new Date()) {
      await this.verificationTokenRepository.deleteByToken(token, tx);
      return null;
    }

    return verificationToken;
  }

  async deleteToken(token: string, tx: DbOrTransaction = db): Promise<void> {
    await this.verificationTokenRepository.deleteByToken(token, tx);
  }
}
