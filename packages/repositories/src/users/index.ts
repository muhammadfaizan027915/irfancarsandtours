import { db, usersTable, UserInsert } from "@icat/database";

export class UserRepository {
  constructor() {}

  async create(user: UserInsert) {
    const [createdUser] = await db.insert(usersTable).values(user).returning();
    const { password, ...safeUser } = createdUser;
    return safeUser;
  }

  async findByEmail(email: string) {
    const user = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users?.email, email),
      columns: {
        password: false,
      },
    });

    return user;
  }
}
