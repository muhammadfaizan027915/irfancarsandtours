import "server-only";

import {
  DeleteTourBodyDto,
  GetToursBodyDto,
  PaginatedTourResponseDto,
  PaginatedTourResponseSchema,
  RegisterTourBodyDto,
  TourResponseDto,
  TourResponseSchema,
  ToursListResponseDto,
  ToursListResponseSchema,
  UpdateTourBodyDto,
} from "@icat/contracts";
import { db, DbOrTransaction } from "@icat/database";
import { TourRepository } from "@icat/repositories";

export class TourService {
  private tourRepository: TourRepository;

  constructor() {
    this.tourRepository = new TourRepository();
  }

  async getAll(
    args?: GetToursBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<PaginatedTourResponseDto> {
    const result = await this.tourRepository.findAll(args, tx);
    return PaginatedTourResponseSchema.parse(result);
  }

  async getFeaturedTours(
    tx: DbOrTransaction = db,
  ): Promise<ToursListResponseDto> {
    const tours = await this.tourRepository.findFeatured(tx);
    return ToursListResponseSchema.parse(tours);
  }

  async getTourById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<TourResponseDto | null> {
    const tour = await this.tourRepository.findById(id, tx);
    return tour ? TourResponseSchema.parse(tour) : null;
  }

  async getToursPricingsAndCapacity (id: string[], tx: DbOrTransaction = db) {
    const toursPricings = await this.tourRepository.getToursPricingsAndCapacity(id, tx);
    return toursPricings;
  }

  async createTour(
    data: RegisterTourBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<TourResponseDto> {
    const tour = await this.tourRepository.create(data, tx);
    return TourResponseSchema.parse(tour);
  }

  async updateTour(
    id: string,
    updates: Partial<UpdateTourBodyDto>,
    tx: DbOrTransaction = db,
  ): Promise<TourResponseDto | null> {
    const tour = await this.tourRepository.update(id, updates, tx);
    return tour ? TourResponseSchema.parse(tour) : null;
  }

  async deleteTour(
    data: DeleteTourBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<TourResponseDto | null> {
    const tour = await this.tourRepository.delete(data.id, tx);
    return tour ? TourResponseSchema.parse(tour) : null;
  }

  async hardDeleteTour(id: string, tx: DbOrTransaction = db): Promise<void> {
    await this.tourRepository.hardDelete(id, tx);
  }
}
