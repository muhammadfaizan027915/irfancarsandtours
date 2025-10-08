import { BookedCarRepository } from "@icat/repositories";
import { BookedCarInsert } from "@icat/database";
import {
  BookedCarResponseDto,
  BookedCarResponseSchema,
  BookedCarWithCarListResponseDto,
  BookedCarWithCarListResponseSchema,
} from "@icat/contracts";

export class BookedCarService {
  private bookedCarRepository: BookedCarRepository;

  constructor() {
    this.bookedCarRepository = new BookedCarRepository();
  }

  async create(data: BookedCarInsert): Promise<BookedCarResponseDto> {
    const result = await this.bookedCarRepository.create(data);
    return BookedCarResponseSchema.parse(result);
  }

  async getAll(): Promise<BookedCarResponseDto[]> {
    const result = await this.bookedCarRepository.findAll();
    return result.map((item) => BookedCarResponseSchema.parse(item));
  }

  async getById(id: string): Promise<BookedCarResponseDto | null> {
    const result = await this.bookedCarRepository.findById(id);
    return result ? BookedCarResponseSchema.parse(result) : null;
  }

  async getByBookingIdWithCars(
    bookingId: string
  ): Promise<BookedCarWithCarListResponseDto> {
    const bookedCars = await this.bookedCarRepository.findByBookingIdWithCars(
      bookingId
    );
    return BookedCarWithCarListResponseSchema.parse(bookedCars);
  }

  async update(
    id: string,
    data: Partial<BookedCarInsert>
  ): Promise<BookedCarResponseDto | null> {
    const result = await this.bookedCarRepository.update(id, data);
    return result ? BookedCarResponseSchema.parse(result) : null;
  }

  async delete(id: string): Promise<BookedCarResponseDto | null> {
    const result = await this.bookedCarRepository.delete(id);
    return result ? BookedCarResponseSchema.parse(result) : null;
  }
}
