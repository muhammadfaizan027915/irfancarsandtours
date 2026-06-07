import "server-only";

import {
  // BookedTourListResponseSchema,
  // BookedTourResponseDto,
  // BookedTourResponseSchema,
} from "@icat/contracts";
import { BookedTourInsert, db, DbOrTransaction } from "@icat/database";
import { BookedTourRepository } from "@icat/repositories";

export class BookedTourService {
  private bookedTourRepository: BookedTourRepository;

  constructor() {
    this.bookedTourRepository = new BookedTourRepository();
  }

  async create(
    data: BookedTourInsert,
    tx: DbOrTransaction = db,
  ): Promise<any> {
    const result = await this.bookedTourRepository.create(data, tx);
    return result;
  }

  async createBookedTours(
    data: BookedTourInsert[],
    tx: DbOrTransaction = db,
  ): Promise<any[]> {
    const result = await this.bookedTourRepository.createMany(data, tx);
    return result;
  }

  async getAll(tx: DbOrTransaction = db): Promise<any[]> {
    const result = await this.bookedTourRepository.findAll(tx);
    return result;
  }

  async getById(
    id: string,
    tx: DbOrTransaction = db
  ): Promise<any | null> {
    const result = await this.bookedTourRepository.findById(id, tx);
    return result;
  }

  async getBookedToursByBookingId(
    tourBookingId: string,
    tx: DbOrTransaction = db
  ): Promise<any[]> {
    const bookedTours = await this.bookedTourRepository.findManyByBookingId(
      tourBookingId,
      tx
    );
    return bookedTours;
  }

  async update(
    id: string,
    data: Partial<BookedTourInsert>,
    tx: DbOrTransaction = db
  ): Promise<any | null> {
    const result = await this.bookedTourRepository.update(id, data, tx);
    return result;
  }

  async delete(
    id: string,
    tx: DbOrTransaction = db
  ): Promise<any | null> {
    const result = await this.bookedTourRepository.delete(id, tx);
    return result;
  }
}
