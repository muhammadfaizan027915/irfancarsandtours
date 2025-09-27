import { db, bookingsTable, BookingInsert, BookingSelect } from "@icat/database";
import { and, eq, isNull, sql } from "drizzle-orm";

export const BookingListSelect = {
  id: bookingsTable.id,
  pickupAddress: bookingsTable.pickupAddress,
  pickupDate: bookingsTable.pickupDate,
  dropoffAddress: bookingsTable.dropoffAddress,
  dropoffDate: bookingsTable.dropoffDate,
  userId: bookingsTable.userId,
  createdAt: bookingsTable.createdAt,
  updatedAt: bookingsTable.updatedAt,
};

export class BookingsRepository {
  async findAll(args: { page?: number; limit?: number; userId?: string }) {
    const { page = 1, limit = 10, userId } = args;
    const offset = (page - 1) * limit;

    const conditions = [isNull(bookingsTable.deletedAt)];
    if (userId) {
      conditions.push(eq(bookingsTable.userId, userId));
    }

    const whereClause = and(...conditions);

    const bookings = await db
      .select(BookingListSelect)
      .from(bookingsTable)
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

  async findById(id: string): Promise<BookingSelect | null> {
    const booking = await db.query.bookingsTable.findFirst({
      where: and(eq(bookingsTable.id, id), isNull(bookingsTable.deletedAt)),
    });
    return booking ?? null;
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
