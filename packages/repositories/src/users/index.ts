import { db, usersTable, UserInsert } from "@icat/database";

export class UserRepository {
  constructor() {}

  async create(user: UserInsert) {
    const [createdUser] = await db.insert(usersTable).values(user).returning();
    const { password, ...safeUser } = createdUser;
    return safeUser;
  }

  findByEmail(email: string) {
    return;
  }
}
