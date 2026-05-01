import { and, desc, eq, gte, ilike, isNull, lte, sql } from "drizzle-orm";

import {
  db,
  DbOrTransaction,
  UserInsert,
  UserSelect,
  usersTable,
} from "@icat/database";

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
  async findAll(
    args?: {
      page?: number;
      limit?: number;
      name?: string;
      email?: string;
      phone?: string;
      cnic?: string;
      startDate?: string;
      endDate?: string;
    },
    tx: DbOrTransaction = db,
  ) {
    const {
      page = 1,
      limit = 50,
      name,
      email,
      phone,
      cnic,
      startDate,
      endDate,
    } = args || {};

    const offset = (page - 1) * limit;
    const conditions = [isNull(usersTable.deletedAt)];

    if (name) {
      conditions.push(ilike(usersTable.name, `%${name}%`));
    }

    if (email) {
      conditions.push(ilike(usersTable.email, `%${email}%`));
    }

    if (phone) {
      conditions.push(ilike(usersTable.phone, `%${phone}%`));
    }

    if (cnic) {
      conditions.push(ilike(usersTable.cnic, `%${cnic}%`));
    }

    if (startDate) {
      conditions.push(gte(usersTable.createdAt, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(usersTable.createdAt, new Date(endDate)));
    }

    const whereClause = and(...conditions);

    const users = await tx
      .select(UserItemSelect)
      .from(usersTable)
      .where(whereClause)
      .orderBy(desc(usersTable.createdAt))
      .limit(limit)
      .offset(offset);

    const [result] = await tx
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

  async findById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<UserSelect | null> {
    const user = await tx.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
    });

    return user ?? null;
  }

  async findByEmail(
    email: string,
    tx: DbOrTransaction = db,
  ): Promise<UserSelect | null> {
    const user = await tx.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    return user ?? null;
  }

  async create(
    user: UserInsert,
    tx: DbOrTransaction = db,
  ): Promise<UserSelect> {
    const [createdUser] = await tx.insert(usersTable).values(user).returning();
    return createdUser;
  }

  async update(
    id: string,
    data: Partial<UserInsert>,
    tx: DbOrTransaction = db,
  ): Promise<UserSelect | null> {
    const [updatedUser] = await tx
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();

    return updatedUser ?? null;
  }

  async delete(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<UserSelect | null> {
    const [deletedUser] = await tx
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    return deletedUser ?? null;
  }
}
