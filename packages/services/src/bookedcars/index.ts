import {
  BookedCarListResponseSchema,
  BookedCarResponseDto,
  BookedCarResponseSchema,
  BookedCarWithCarListResponseDto,
  BookedCarWithCarListResponseSchema,
} from "@icat/contracts";
import { BookedCarInsert, db, DbOrTransaction } from "@icat/database";
import { BookedCarRepository } from "@icat/repositories";

export class BookedCarService {
  private bookedCarRepository: BookedCarRepository;

  constructor() {
    this.bookedCarRepository = new BookedCarRepository();
  }

  async create(
    data: BookedCarInsert,
    tx: DbOrTransaction = db,
  ): Promise<BookedCarResponseDto> {
    const result = await this.bookedCarRepository.create(data, tx);
    return BookedCarResponseSchema.parse(result);
  }

  async createBookedCars(
    data: BookedCarInsert[],
    tx: DbOrTransaction = db,
  ): Promise<BookedCarResponseDto[]> {
    const result = await this.bookedCarRepository.createMany(data, tx);
    return BookedCarListResponseSchema.parse(result);
  }

  async getAll(tx: DbOrTransaction = db): Promise<BookedCarResponseDto[]> {
    const result = await this.bookedCarRepository.findAll(tx);
    return result.map((item) => BookedCarResponseSchema.parse(item));
  }

  async getById(
    id: string,
    tx: DbOrTransaction = db
  ): Promise<BookedCarResponseDto | null> {
    const result = await this.bookedCarRepository.findById(id, tx);
    return result ? BookedCarResponseSchema.parse(result) : null;
  }

  async getByBookingIdWithCars(
    bookingId: string,
    tx: DbOrTransaction = db
  ): Promise<BookedCarWithCarListResponseDto> {
    const bookedCars = await this.bookedCarRepository.findByBookingIdWithCars(
      bookingId,
      tx
    );
    return BookedCarWithCarListResponseSchema.parse(bookedCars);
  }

  async update(
    id: string,
    data: Partial<BookedCarInsert>,
    tx: DbOrTransaction = db
  ): Promise<BookedCarResponseDto | null> {
    const result = await this.bookedCarRepository.update(id, data, tx);
    return result ? BookedCarResponseSchema.parse(result) : null;
  }

  async delete(
    id: string,
    tx: DbOrTransaction = db
  ): Promise<BookedCarResponseDto | null> {
    const result = await this.bookedCarRepository.delete(id, tx);
    return result ? BookedCarResponseSchema.parse(result) : null;
  }
}
