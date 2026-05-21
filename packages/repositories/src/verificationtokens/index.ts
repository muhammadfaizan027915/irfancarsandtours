import "server-only";

import { and, eq } from "drizzle-orm";

import {
  db,
  DbOrTransaction,
  VerificationTokenInsert,
  VerificationTokenSelect,
  verificationTokensTable,
} from "@icat/database";

export class VerificationTokenRepository {
  async findByToken(
    token: string,
    tx: DbOrTransaction = db,
  ): Promise<VerificationTokenSelect | null> {
    const verificationToken = await tx.query.verificationTokensTable.findFirst({
      where: eq(verificationTokensTable.token, token),
    });

    return verificationToken ?? null;
  }

  async findByIdentifierAndToken(
    identifier: string,
    token: string,
    tx: DbOrTransaction = db,
  ): Promise<VerificationTokenSelect | null> {
    const verificationToken = await tx.query.verificationTokensTable.findFirst({
      where: and(
        eq(verificationTokensTable.identifier, identifier),
        eq(verificationTokensTable.token, token),
      ),
    });

    return verificationToken ?? null;
  }

  async create(
    data: VerificationTokenInsert,
    tx: DbOrTransaction = db,
  ): Promise<VerificationTokenSelect> {
    const [createdToken] = await tx
      .insert(verificationTokensTable)
      .values(data)
      .returning();
    return createdToken;
  }

  async delete(
    identifier: string,
    token: string,
    tx: DbOrTransaction = db,
  ): Promise<VerificationTokenSelect | null> {
    const [deletedToken] = await tx
      .delete(verificationTokensTable)
      .where(
        and(
          eq(verificationTokensTable.identifier, identifier),
          eq(verificationTokensTable.token, token),
        ),
      )
      .returning();

    return deletedToken ?? null;
  }

  async deleteByToken(
    token: string,
    tx: DbOrTransaction = db,
  ): Promise<VerificationTokenSelect | null> {
    const [deletedToken] = await tx
      .delete(verificationTokensTable)
      .where(eq(verificationTokensTable.token, token))
      .returning();

    return deletedToken ?? null;
  }
}
