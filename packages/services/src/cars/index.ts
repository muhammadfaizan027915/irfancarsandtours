import { CarsRepository } from "@icat/repositories";
import {
  CarResponseDto,
  CarResponseSchema,
  RegisterCarBodyDto,
  UpdateCarBodyDto,
  DeleteCarBodyDto,
  PaginatedCarResponseDto,
  PaginatedCarResponseSchema,
} from "@icat/contracts";

export class CarsService {
  private repo: CarsRepository;

  constructor() {
    this.repo = new CarsRepository();
  }

  async getAll(args: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedCarResponseDto> {
    const result = await this.repo.findAll(args);
    return PaginatedCarResponseSchema.parse(result);
  }

  async getById(id: string): Promise<CarResponseDto | null> {
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
