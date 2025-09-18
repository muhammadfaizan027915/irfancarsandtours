import { db, usersTable, UserInsert, UserSelect } from "@icat/database";
import { eq } from "drizzle-orm";

export class UserRepository {
  async create(user: UserInsert): Promise<UserSelect> {
    const [createdUser] = await db.insert(usersTable).values(user).returning();
    return createdUser;
  }

  async findById(id: string): Promise<UserSelect | null> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
    });

    return user ?? null;
  }

  async findByEmail(email: string): Promise<UserSelect | null> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    return user ?? null;
  }

  async findAll(): Promise<UserSelect[]> {
    return db.query.usersTable.findMany();
  }

  async update(
    id: string,
    data: Partial<UserInsert>
  ): Promise<UserSelect | null> {
    const [updatedUser] = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();

    return updatedUser ?? null;
  }

  async delete(id: string): Promise<UserSelect | null> {
    const [deletedUser] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    return deletedUser ?? null;
  }
}
