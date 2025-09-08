import { db, usersTable, UserInsert } from "@icat/database";

export class UsersRepository {
  async create(user: UserInsert) {
    const createdUser = await db.insert(usersTable).values(user).returning();
    return createdUser;
  }

  fineByEmail(email: string) {
    return;
  }
}
