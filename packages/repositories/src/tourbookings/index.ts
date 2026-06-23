import "server-only";

import { and, desc, eq, gte, isNull, lte, sql } from "drizzle-orm";

import {
  BookingStatus,
  db,
  DbOrTransaction,
  TourBookingInsert,
  TourBookingSelect,
  tourBookingsTable,
  usersTable,
} from "@icat/database";

import { UserItemSelect } from "../users";

export const TourBookingItemSelect = {
  id: tourBookingsTable.id,
  name: tourBookingsTable.name,
  email: tourBookingsTable.email,
  phone: tourBookingsTable.phone,
  cnic: tourBookingsTable.cnic,
  notes: tourBookingsTable.notes,
  status: tourBookingsTable.status,
  totalPrice: tourBookingsTable.totalPrice,
  userId: tourBookingsTable.userId,
  createdAt: tourBookingsTable.createdAt,
  updatedAt: tourBookingsTable.updatedAt,
};

export const TourBookingItemWithUserSelect = {
  ...TourBookingItemSelect,
  bookedBy: UserItemSelect,
};

export class TourBookingRepository {
  async findAll(
    args?: {
      page?: number;
      limit?: number;
      id?: string;
      name?: string;
      email?: string;
      phone?: string;
      status?: BookingStatus;
      startDate?: string;
      endDate?: string;
    },
    tx: DbOrTransaction = db,
  ) {
    const {
      page = 1,
      limit = 50,
      id,
      name,
      email,
      phone,
      status,
      startDate,
      endDate,
    } = args || {};

    const offset = (page - 1) * limit;
    const conditions = [];

    if (id) {
      conditions.push(sql`${tourBookingsTable.id} ILIKE ${`%${id}%`}`);
    }

    if (name) {
      conditions.push(sql`${tourBookingsTable.name} ILIKE ${`%${name}%`}`);
    }

    if (email) {
      conditions.push(sql`${tourBookingsTable.email} ILIKE ${`%${email}%`}`);
    }

    if (phone) {
      conditions.push(sql`${tourBookingsTable.phone} ILIKE ${`%${phone}%`}`);
    }

    if (status) {
      conditions.push(eq(tourBookingsTable.status, status as any));
    }

    if (startDate) {
      conditions.push(gte(tourBookingsTable.createdAt, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(tourBookingsTable.createdAt, new Date(endDate)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [tourBookings, [result]] = await Promise.all([
      tx
        .select(TourBookingItemWithUserSelect)
        .from(tourBookingsTable)
        .leftJoin(usersTable, eq(tourBookingsTable.userId, usersTable.id))
        .where(whereClause)
        .orderBy(desc(tourBookingsTable.createdAt))
        .limit(limit)
        .offset(offset),
      tx
        .select({ total: sql<number>`count(*)` })
        .from(tourBookingsTable)
        .leftJoin(usersTable, eq(tourBookingsTable.userId, usersTable.id))
        .where(whereClause),
    ]);

    const total = Number(result.total);

    return {
      data: tourBookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findAllByUserId(
    args: {
      page?: number;
      limit?: number;
      userId: string;
      status?: BookingStatus;
      startDate?: string;
      endDate?: string;
    },
    tx: DbOrTransaction = db,
  ) {
    const { page = 1, limit = 50, userId, status, startDate, endDate } = args;

    const offset = (page - 1) * limit;
    const conditions = [eq(tourBookingsTable.userId, userId)];

    if (status) {
      conditions.push(eq(tourBookingsTable.status, status));
    }

    if (startDate) {
      conditions.push(gte(tourBookingsTable.createdAt, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(tourBookingsTable.createdAt, new Date(endDate)));
    }

    const whereClause = and(...conditions);

    const [tourBookings, [result]] = await Promise.all([
      tx
        .select(TourBookingItemSelect)
        .from(tourBookingsTable)
        .where(whereClause)
        .orderBy(desc(tourBookingsTable.createdAt))
        .limit(limit)
        .offset(offset),
      tx
        .select({ total: sql<number>`count(*)` })
        .from(tourBookingsTable)
        .where(whereClause),
    ]);

    const total = tourBookings.length > 0 ? Number(result.total) : 0;

    return {
      data: tourBookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string, tx: DbOrTransaction = db) {
    const conditions = [
      isNull(tourBookingsTable.deletedAt),
      eq(tourBookingsTable.id, id),
    ];

    const whereClause = and(...conditions);

    const [tourBooking] = await tx
      .select(TourBookingItemSelect)
      .from(tourBookingsTable)
      .where(whereClause);

    return tourBooking;
  }

  async findByIdWithUser(id: string, tx: DbOrTransaction = db) {
    const conditions = [
      isNull(tourBookingsTable.deletedAt),
      eq(tourBookingsTable.id, id),
    ];

    const whereClause = and(...conditions);

    const [tourBooking] = await tx
      .select(TourBookingItemWithUserSelect)
      .from(tourBookingsTable)
      .leftJoin(usersTable, eq(tourBookingsTable.userId, usersTable.id))
      .where(whereClause)
      .limit(1);

    if (!tourBooking) return null;

    return tourBooking;
  }

  async create(
    data: Omit<TourBookingInsert, "id" | "createdAt" | "updatedAt">,
    tx: DbOrTransaction = db,
  ): Promise<TourBookingSelect> {
    const [tourBooking] = await tx
      .insert(tourBookingsTable)
      .values(data as TourBookingInsert)
      .returning();
    return tourBooking;
  }

  async update(
    id: string,
    data: Partial<TourBookingInsert>,
    tx: DbOrTransaction = db,
  ): Promise<TourBookingSelect | null> {
    const [updated] = await tx
      .update(tourBookingsTable)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(tourBookingsTable.id, id))
      .returning();

    return updated ?? null;
  }

  async updateStatus(
    id: string,
    status: BookingStatus,
    tx: DbOrTransaction = db,
  ) {
    const [updated] = await tx
      .update(tourBookingsTable)
      .set({
        status: status,
        updatedAt: new Date(),
      })
      .where(eq(tourBookingsTable.id, id))
      .returning();

    return updated;
  }
}
