import { and, desc, eq, gte, ilike, isNull, lte,sql } from "drizzle-orm";

import { GetComplaintsQueryDto } from "@icat/contracts";
import {
  ComplaintInsert,
  ComplaintSelect,
  complaintsTable,
  db,
} from "@icat/database";

export const ComplaintListSelect = {
  id: complaintsTable.id,
  name: complaintsTable.name,
  email: complaintsTable.email,
  phone: complaintsTable.phone,
  message: complaintsTable.message,
  createdAt: complaintsTable.createdAt,
  updatedAt: complaintsTable.updatedAt,
};

export class ComplaintRepository {
  async findAll(args: GetComplaintsQueryDto) {
    const {
      page = 1,
      limit = 50,
      search,
      name,
      email,
      phone,
      startDate,
      endDate,
    } = args;

    const offset = (page - 1) * limit;
    const conditions = [isNull(complaintsTable.deletedAt)];

    if (search) {
      conditions.push(
        sql`(${ilike(complaintsTable.name, `%${search}%`)} OR ${ilike(
          complaintsTable.email,
          `%${search}%`
        )} OR ${ilike(complaintsTable.phone, `%${search}%`)} OR ${ilike(
          complaintsTable.message,
          `%${search}%`
        )})`
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

    if (startDate) {
      conditions.push(gte(complaintsTable.createdAt, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(complaintsTable.createdAt, new Date(endDate)));
    }

    const whereClause = and(...conditions);

    const complaints = await db
      .select(ComplaintListSelect)
      .from(complaintsTable)
      .where(whereClause)
      .orderBy(desc(complaintsTable.createdAt))
      .limit(limit)
      .offset(offset);

    const [result] = await db
      .select({ total: sql<number>`count(*)` })
      .from(complaintsTable)
      .where(whereClause);

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

  async create(data: ComplaintInsert): Promise<ComplaintSelect> {
    const [complaint] = await db.insert(complaintsTable).values(data).returning();
    return complaint;
  }

  async findById(id: string): Promise<ComplaintSelect | null> {
    const complaint = await db.query.complaintsTable.findFirst({
      where: eq(complaintsTable.id, id),
    });
    return complaint ?? null;
  }

  async delete(id: string): Promise<ComplaintSelect | null> {
    const [complaint] = await db
      .update(complaintsTable)
      .set({ deletedAt: new Date() })
      .where(eq(complaintsTable.id, id))
      .returning();

    return complaint ?? null;
  }

  async hardDelete(id: string): Promise<void> {
    await db.delete(complaintsTable).where(eq(complaintsTable.id, id));
  }
}
