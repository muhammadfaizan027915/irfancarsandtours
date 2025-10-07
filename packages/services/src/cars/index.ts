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
  GetCarsBodyDto,
} from "@icat/contracts";

import { after } from "next/server";

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

  async getFeaturedCars(): Promise<CarsListResponseDto> {
    const cars = await this.carRepository.findFeatured();
    return CarsListResponseSchema.parse(cars);
  }

  async getMostSearchedCars(limit = 10): Promise<CarsListResponseDto> {
    const cars = await this.carRepository.findMostSearched(limit);
    return CarsListResponseSchema.parse(cars);
  }

  async getCarById(id: string): Promise<CarResponseDto | null> {
    const car = await this.carRepository.findById(id);
    return car ? CarResponseSchema.parse(car) : null;
  }

  async createCar(data: RegisterCarBodyDto): Promise<CarResponseDto> {
    const car = await this.carRepository.create(data);
    return CarResponseSchema.parse(car);
  }

  async updateCar(
    id: string,
    updates: UpdateCarBodyDto
  ): Promise<CarResponseDto | null> {
    const car = await this.carRepository.update(id, updates);
    return car ? CarResponseSchema.parse(car) : null;
  }

  async deleteCar(data: DeleteCarBodyDto): Promise<CarResponseDto | null> {
    const car = await this.carRepository.delete(data.id);
    return car ? CarResponseSchema.parse(car) : null;
  }

  async hardDeleteCar(id: string): Promise<void> {
    await this.carRepository.hardDelete(id);
  }
}
