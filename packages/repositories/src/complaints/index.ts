import "server-only";

import { and, desc, eq, gte, ilike, isNull, lte, sql } from "drizzle-orm";

import {
  ComplaintInsert,
  ComplaintSelect,
  complaintsTable,
  db,
  DbOrTransaction,
} from "@icat/database";
import { ComplaintStatus } from "@icat/database/enums";

export const ComplaintListSelect = {
  id: complaintsTable.id,
  name: complaintsTable.name,
  email: complaintsTable.email,
  phone: complaintsTable.phone,
  message: complaintsTable.message,
  status: complaintsTable.status,
  createdAt: complaintsTable.createdAt,
  updatedAt: complaintsTable.updatedAt,
};

export class ComplaintRepository {
  async findAll(
    args: {
      page?: number;
      limit?: number;
      search?: string;
      name?: string;
      email?: string;
      phone?: string;
      status?: ComplaintStatus;
      startDate?: string;
      endDate?: string;
    },
    tx: DbOrTransaction = db,
  ) {
    const {
      page = 1,
      limit = 50,
      search,
      name,
      email,
      phone,
      status,
      startDate,
      endDate,
    } = args;

    const offset = (page - 1) * limit;
    const conditions = [isNull(complaintsTable.deletedAt)];

    if (search) {
      conditions.push(
        sql`(${ilike(complaintsTable.name, `%${search}%`)} OR ${ilike(
          complaintsTable.email,
          `%${search}%`,
        )} OR ${ilike(complaintsTable.phone, `%${search}%`)} OR ${ilike(
          complaintsTable.message,
          `%${search}%`,
        )})`,
      );
    }

    if (name) {
      conditions.push(ilike(complaintsTable.name, `%${name}%`));
    }

    if (email) {
      conditions.push(ilike(complaintsTable.email, `%${email}%`));
    }

    if (phone) {
      conditions.push(ilike(complaintsTable.phone, `%${phone}%`));
    }

    if (status) {
      conditions.push(eq(complaintsTable.status, status));
    }

    if (startDate) {
      conditions.push(gte(complaintsTable.createdAt, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(complaintsTable.createdAt, new Date(endDate)));
    }

    const whereClause = and(...conditions);

    const [complaints, [result]] = await Promise.all([
      tx
        .select(ComplaintListSelect)
        .from(complaintsTable)
        .where(whereClause)
        .orderBy(desc(complaintsTable.createdAt))
        .limit(limit)
        .offset(offset),
      tx
        .select({ total: sql<number>`count(*)` })
        .from(complaintsTable)
        .where(whereClause),
    ]);

    const total = complaints.length > 0 ? Number(result.total) : 0;

    return {
      data: complaints,
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
  ): Promise<ComplaintSelect | null> {
    const complaint = await tx.query.complaintsTable.findFirst({
      where: eq(complaintsTable.id, id),
    });
    return complaint ?? null;
  }

  async create(
    data: ComplaintInsert,
    tx: DbOrTransaction = db,
  ): Promise<ComplaintSelect> {
    const [complaint] = await tx
      .insert(complaintsTable)
      .values(data)
      .returning();
    return complaint;
  }

  async update(
    id: string,
    data: Partial<ComplaintInsert>,
    tx: DbOrTransaction = db,
  ): Promise<ComplaintSelect | null> {
    const [complaint] = await tx
      .update(complaintsTable)
      .set(data)
      .where(eq(complaintsTable.id, id))
      .returning();

    return complaint ?? null;
  }
}
