import "server-only";

import {
  SeoResponseDto,
  SeoResponseSchema,
  UpsertSeoBodyDto,
} from "@icat/contracts";
import { db, DbOrTransaction } from "@icat/database";
import { NotFoundError, ValidationError } from "@icat/lib/errors";
import { SeoRepository } from "@icat/repositories";

import { CarService } from "../cars";
import { TourService } from "../tours";

export class SeoService {
  private seoRepository: SeoRepository;
  private carService: CarService;
  private tourService: TourService;

  constructor() {
    this.seoRepository = new SeoRepository();
    this.carService = new CarService();
    this.tourService = new TourService();
  }

  async getByCarId(
    carId: string,
    tx: DbOrTransaction = db,
  ): Promise<SeoResponseDto | null> {
    const car = await this.carService.getCarById(carId, tx);
    if (!car || !car.seoId) return null;

    const result = await this.seoRepository.findById(car.seoId, tx);
    return result ? SeoResponseSchema.parse(result) : null;
  }

  async getByTourId(
    tourId: string,
    tx: DbOrTransaction = db,
  ): Promise<SeoResponseDto | null> {
    const tour = await this.tourService.getTourById(tourId, tx);
    if (!tour || !tour.seoId) return null;

    const result = await this.seoRepository.findById(tour.seoId, tx);
    return result ? SeoResponseSchema.parse(result) : null;
  }

  async upsertSeo(
    data: UpsertSeoBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<SeoResponseDto> {
    if (!data.carId && !data.tourId) {
      throw new ValidationError({ message: "Either carId or tourId must be provided" });
    }

    const executeUpsert = async (transaction: DbOrTransaction) => {
      const { carId, tourId, ...seoData } = data;

      if (carId) {
        const car = await this.carService.getCarById(carId, transaction);
        if (!car) {
          throw new NotFoundError("Car");
        }

        const seo = await this.seoRepository.upsert(
          car.seoId,
          seoData,
          transaction,
        );

        if (car.seoId !== seo.id) {
          await this.carService.updateCar(
            carId,
            { seoId: seo.id },
            transaction
          );
        }

        return SeoResponseSchema.parse(seo);
      } else if (tourId) {
        const tour = await this.tourService.getTourById(tourId, transaction);
        if (!tour) {
          throw new NotFoundError("Tour");
        }

        const seo = await this.seoRepository.upsert(
          tour.seoId,
          seoData,
          transaction,
        );

        if (tour.seoId !== seo.id) {
          await this.tourService.updateTour(
            tourId,
            { seoId: seo.id },
            transaction
          );
        }

        return SeoResponseSchema.parse(seo);
      } else {
        throw new ValidationError({ message: "Must provide either carId or tourId" });
      }
    };

    return tx === db
      ? await db.transaction((newTx) => executeUpsert(newTx))
      : await executeUpsert(tx);
  }
}
