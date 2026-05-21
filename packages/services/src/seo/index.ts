import "server-only";

import {
  SeoResponseDto,
  SeoResponseSchema,
  UpsertSeoBodyDto,
} from "@icat/contracts";
import { db, DbOrTransaction } from "@icat/database";
import { SeoRepository } from "@icat/repositories";

import { CarService } from "../cars";

export class SeoService {
  private seoRepository: SeoRepository;
  private carService: CarService;

  constructor() {
    this.seoRepository = new SeoRepository();
    this.carService = new CarService();
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

  async upsertSeo(
    data: UpsertSeoBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<SeoResponseDto> {
    const executeUpsert = async (transaction: DbOrTransaction) => {
      const car = await this.carService.getCarById(data.carId, transaction);
      const { carId, ...seoData } = data;

      const seo = await this.seoRepository.upsert(
        car?.seoId,
        seoData,
        transaction,
      );

      if (car && car.seoId !== seo.id) {
        await this.carService.updateCar(
          carId,
          { seoId: seo.id },
          transaction
        );
      }

      return SeoResponseSchema.parse(seo);
    };

    return tx === db
      ? await db.transaction((newTx) => executeUpsert(newTx))
      : await executeUpsert(tx);
  }
}
