import { db, usersTable, UserInsert, UserSelect } from "@icat/database";
import { and, desc, eq, isNull, sql } from "drizzle-orm";

export const UserItemSelect = {
  id: usersTable.id,
  name: usersTable.name,
  email: usersTable.email,
  phone: usersTable.phone,
  cnic: usersTable.cnic,
  image: usersTable.image,
  role: usersTable.role,
  createdAt: usersTable.createdAt,
  updatedAt: usersTable.updatedAt,
};

export class UserRepository {
  async findAll(args?: { page?: number; limit?: number }) {
    const { page = 1, limit = 50 } = args || {};
    
    const offset = (page - 1) * limit;
    const conditions = [isNull(usersTable.deletedAt)];
    const whereClause = and(...conditions);

    const users = await db
      .select(UserItemSelect)
      .from(usersTable)
      .where(whereClause)
      .orderBy(desc(usersTable.createdAt))
      .limit(limit)
      .offset(offset)

    const [result] = await db
      .select({ total: sql<number>`count(*)` })
      .from(usersTable)
      .where(whereClause);

    const total = users.length > 0 ? Number(result.total) : 0;

    return {
      data: users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
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

  async create(user: UserInsert): Promise<UserSelect> {
    const [createdUser] = await db.insert(usersTable).values(user).returning();
    return createdUser;
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
