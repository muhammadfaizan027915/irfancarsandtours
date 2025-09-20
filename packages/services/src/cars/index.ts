import { CarRepository } from "@icat/repositories";
import {
  CarResponseDto,
  CarResponseSchema,
  CarsListResponseSchema,
  CarsListResponseDto,
  RegisterCarBodyDto,
  UpdateCarBodyDto,
  DeleteCarBodyDto,
  PaginatedCarResponseSchema,
  PaginatedCarResponseDto,
} from "@icat/contracts";

export class CarService {
  private repo: CarRepository;

  constructor() {
    this.repo = new CarRepository();
  }

  async getAll(args: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedCarResponseDto> {
    const result = await this.repo.findAll(args);
    return PaginatedCarResponseSchema.parse(result);
  }

  async getFeaturedCars(): Promise<CarsListResponseDto> {
    const cars = await this.repo.findFeatured();
    return CarsListResponseSchema.parse(cars);
  }

  async getMostSearchedCars(limit = 10): Promise<CarsListResponseDto> {
    const cars = await this.repo.findMostSearched(limit);
    return CarsListResponseSchema.parse(cars);
  }

  async getCarById(id: string): Promise<CarResponseDto | null> {
    const car = await this.repo.findById(id);
    return CarResponseSchema.parse(car);
  }

  async createCar(data: RegisterCarBodyDto): Promise<CarResponseDto> {
    const car = await this.repo.create(data);
    return CarResponseSchema.parse(car);
  }

  async updateCar(
    id: string,
    updates: UpdateCarBodyDto
  ): Promise<CarResponseDto | null> {
    const car = await this.repo.update(id, updates);
    return CarResponseSchema.parse(car);
  }

  async deleteCar(data: DeleteCarBodyDto): Promise<CarResponseDto | null> {
    const car = await this.repo.delete(data.id);
    return CarResponseSchema.parse(car);
  }

  async hardDeleteCar(id: string): Promise<void> {
    await this.repo.hardDelete(id);
  }
}
