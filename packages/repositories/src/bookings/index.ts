import {
  db,
  bookingsTable,
  BookingInsert,
  BookingSelect,
  usersTable,
} from "@icat/database";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { UserItemSelect } from "../users";

export const BookingItemSelect = {
  id: bookingsTable.id,
  pickupDate: bookingsTable.pickupDate,
  pickupAddress: bookingsTable.pickupAddress,
  dropoffDate: bookingsTable.dropoffDate,
  dropoffAddress: bookingsTable.dropoffAddress,
  userId: bookingsTable.userId,
  createdAt: bookingsTable.createdAt,
  updatedAt: bookingsTable.updatedAt,
};

export const BookingItemWithUserSelect = {
  ...BookingItemSelect,
  bookedBy: UserItemSelect,
};

export class BookingRepository {
  async findAll(args?: { page?: number; limit?: number; userId?: string }) {
    const { page = 1, limit = 50, userId } = args || {};
    const offset = (page - 1) * limit;

    const conditions = [isNull(bookingsTable.deletedAt)];

    if (userId) {
      conditions.push(eq(bookingsTable.userId, userId));
    }

    const whereClause = and(...conditions);

    const bookings = await db
      .select(BookingItemWithUserSelect)
      .from(bookingsTable)
      .leftJoin(usersTable, eq(bookingsTable.userId, usersTable.id))
      .orderBy(desc(bookingsTable.createdAt))
      .where(whereClause)
      .limit(limit)
      .offset(offset);

    const [result] = await db
      .select({ total: sql<number>`count(*)` })
      .from(bookingsTable)
      .where(whereClause);

    const total = bookings.length > 0 ? Number(result.total) : 0;

    return {
      data: bookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findAllByUserId(args: {
    page?: number;
    limit?: number;
    userId: string;
  }) {
    const { page = 1, limit = 50, userId } = args || {};
    const offset = (page - 1) * limit;

    const conditions = [isNull(bookingsTable.deletedAt)];

    if (userId) {
      conditions.push(eq(bookingsTable.userId, userId));
    }

    const whereClause = and(...conditions);

    const bookings = await db
      .select(BookingItemSelect)
      .from(bookingsTable)
      .leftJoin(usersTable, eq(bookingsTable.userId, usersTable.id))
      .orderBy(desc(bookingsTable.createdAt))
      .where(whereClause)
      .limit(limit)
      .offset(offset);

    const [result] = await db
      .select({ total: sql<number>`count(*)` })
      .from(bookingsTable)
      .where(whereClause);

    const total = bookings.length > 0 ? Number(result.total) : 0;

    return {
      data: bookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const conditions = [
      isNull(bookingsTable.deletedAt),
      eq(bookingsTable.id, id),
    ];

    const whereClause = and(...conditions);

    const [booking] = await db
      .select(BookingItemSelect)
      .from(bookingsTable)
      .where(whereClause);

    return booking;
  }

  async findByIdWithUser(id: string) {
    const conditions = [
      isNull(bookingsTable.deletedAt),
      eq(bookingsTable.id, id),
    ];

    const whereClause = and(...conditions);

    const [bookingWithUser] = await db
      .select(BookingItemWithUserSelect)
      .from(bookingsTable)
      .leftJoin(usersTable, eq(usersTable.id, bookingsTable.userId))
      .where(whereClause);

    return bookingWithUser;
  }

  async create(data: BookingInsert): Promise<BookingSelect> {
    const [booking] = await db.insert(bookingsTable).values(data).returning();
    return booking;
  }

  async update(
    id: string,
    data: Partial<BookingInsert>
  ): Promise<BookingSelect | null> {
    const [booking] = await db
      .update(bookingsTable)
      .set(data)
      .where(eq(bookingsTable.id, id))
      .returning();

    return booking ?? null;
  }

  async delete(id: string): Promise<BookingSelect | null> {
    const [booking] = await db
      .update(bookingsTable)
      .set({ deletedAt: new Date() })
      .where(eq(bookingsTable.id, id))
      .returning();

    return booking ?? null;
  }

  async hardDelete(id: string): Promise<void> {
    await db.delete(bookingsTable).where(eq(bookingsTable.id, id));
  }
}
