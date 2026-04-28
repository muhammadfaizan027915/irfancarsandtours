import { after } from "next/server";

import {
  CarResponseDto,
  CarResponseSchema,
  CarsListResponseDto,
  CarsListResponseSchema,
  CarWithSeoResponseDto,
  CarWithSeoResponseSchema,
  DeleteCarBodyDto,
  GetCarsBodyDto,
  PaginatedCarResponseDto,
  PaginatedCarResponseSchema,
  RegisterCarBodyDto,
  UpdateCarBodyDto,
} from "@icat/contracts";
import { CarRepository } from "@icat/repositories";

export class CarService {
  private carRepository: CarRepository;

  constructor() {
    this.carRepository = new CarRepository();
  }

  async getAll(args?: GetCarsBodyDto): Promise<PaginatedCarResponseDto> {
    const result = await this.carRepository.findAll(args);

    const data = result?.data;

    if (data?.length > 0) {
      after(() => {
        const carIds = data?.map((car) => car?.id);
        this.carRepository.incrementTimesSearched(carIds);
      });
    }

    return PaginatedCarResponseSchema.parse(result);
  }

  async getCarsDriverRules(carIds: string[]) {
    return await this.carRepository.findCarsDriverRules(carIds);
  }

  async getFeaturedCars(): Promise<CarsListResponseDto> {
    const cars = await this.carRepository.findFeatured();
    return CarsListResponseSchema.parse(cars);
  }

  async getMostSearchedCars(limit = 10): Promise<CarsListResponseDto> {
    const cars = await this.carRepository.findMostSearched(limit);
    return CarsListResponseSchema.parse(cars);
  }

  async getCarById(id: string): Promise<CarWithSeoResponseDto | null> {
    const car = await this.carRepository.findById(id);
    return car ? CarWithSeoResponseSchema.parse(car) : null;
  }

  async createCar(data: RegisterCarBodyDto): Promise<CarWithSeoResponseDto> {
    const car = await this.carRepository.create(data);
    return CarWithSeoResponseSchema.parse(car);
  }

  async updateCar(
    id: string,
    updates: UpdateCarBodyDto,
  ): Promise<CarWithSeoResponseDto | null> {
    const car = await this.carRepository.update(id, updates);
    return car ? CarWithSeoResponseSchema.parse(car) : null;
  }

  async deleteCar(data: DeleteCarBodyDto): Promise<CarResponseDto | null> {
    const car = await this.carRepository.delete(data.id);
    return car ? CarResponseSchema.parse(car) : null;
  }

  async hardDeleteCar(id: string): Promise<void> {
    await this.carRepository.hardDelete(id);
  }
}
