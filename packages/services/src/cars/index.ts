import "server-only";

import { after } from "next/server";

import {
  CarResponseDto,
  CarResponseSchema,
  CarsListResponseDto,
  CarsListResponseSchema,
  DeleteCarBodyDto,
  GetCarsBodyDto,
  PaginatedCarResponseDto,
  PaginatedCarResponseSchema,
  RegisterCarBodyDto,
  UpdateCarBodyDto,
} from "@icat/contracts";
import { db, DbOrTransaction } from "@icat/database";
import { CarRepository } from "@icat/repositories";

export class CarService {
  private carRepository: CarRepository;

  constructor() {
    this.carRepository = new CarRepository();
  }

  async getAll(
    args?: GetCarsBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<PaginatedCarResponseDto> {
    const result = await this.carRepository.findAll(args, tx);

    const data = result?.data;

    if (data?.length > 0) {
      after(() => {
        const carIds = data?.map((car) => car?.id);
        this.carRepository.incrementTimesSearched(carIds);
      });
    }

    return PaginatedCarResponseSchema.parse(result);
  }

  async getCarsDriverAndStartingPrice(
    carIds: string[],
    tx: DbOrTransaction = db,
  ) {
    return await this.carRepository.findCarsDriverAndStartingPrice(carIds, tx);
  }

  async getFeaturedCars(
    tx: DbOrTransaction = db,
  ): Promise<CarsListResponseDto> {
    const cars = await this.carRepository.findFeatured(tx);
    return CarsListResponseSchema.parse(cars);
  }

  async getMostSearchedCars(
    limit = 10,
    tx: DbOrTransaction = db,
  ): Promise<CarsListResponseDto> {
    const cars = await this.carRepository.findMostSearched(limit, tx);
    return CarsListResponseSchema.parse(cars);
  }

  async getCarById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<CarResponseDto | null> {
    const car = await this.carRepository.findById(id, tx);
    return car ? CarResponseSchema.parse(car) : null;
  }

  async createCar(
    data: RegisterCarBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<CarResponseDto> {
    const car = await this.carRepository.create(data, tx);
    return CarResponseSchema.parse(car);
  }

  async updateCar(
    id: string,
    updates: UpdateCarBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<CarResponseDto | null> {
    const car = await this.carRepository.update(id, updates, tx);
    return car ? CarResponseSchema.parse(car) : null;
  }

  async deleteCar(
    data: DeleteCarBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<CarResponseDto | null> {
    const car = await this.carRepository.delete(data.id, tx);
    return car ? CarResponseSchema.parse(car) : null;
  }

  async hardDeleteCar(id: string, tx: DbOrTransaction = db): Promise<void> {
    await this.carRepository.hardDelete(id, tx);
  }
}
