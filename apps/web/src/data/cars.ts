import { GetCarsBodyDto, GetCarsBodySchema } from "@icat/contracts";
import { CarService } from "@icat/services";
import { getAuthenticatedAdminSession } from "./session";

export async function getUserCars(arg: GetCarsBodyDto) {
  const args = GetCarsBodySchema.parse(arg);
  const carService = new CarService();
  const result = await carService.getAll(args);
  return result;
}

export async function getCars(arg?: GetCarsBodyDto) {
  await getAuthenticatedAdminSession();

  const args = GetCarsBodySchema.parse(arg);
  const carService = new CarService();
  const result = await carService.getAll(args);
  return result;
}

export async function getFeaturedCars() {
  const carService = new CarService();
  const cars = await carService.getFeaturedCars();
  return cars;
}

export async function getMostSearchedCars() {
  const carService = new CarService();
  const cars = await carService.getMostSearchedCars();
  return cars;
}

export async function getUserCar(carId: string) {
  const carService = new CarService();
  const car = await carService.getCarById(carId);
  return car;
}


export async function getCar(carId: string) {
  await getAuthenticatedAdminSession();

  const carService = new CarService();
  const car = await carService.getCarById(carId);
  return car;
}
