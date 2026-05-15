import {
  SeoResponseDto,
  SeoResponseSchema,
  UpsertSeoBodyDto,
} from "@icat/contracts";
import { db, DbOrTransaction } from "@icat/database";
import { CarRepository, SeoRepository } from "@icat/repositories";

export class SeoService {
  private seoRepository: SeoRepository;
  private carRepository: CarRepository;

  constructor() {
    this.seoRepository = new SeoRepository();
    this.carRepository = new CarRepository();
  }

  async getByCarId(carId: string): Promise<SeoResponseDto | null> {
    const car = await this.carRepository.findById(carId);
    if (!car || !car.seoId) return null;

    const result = await this.seoRepository.findById(car.seoId);
    return result ? SeoResponseSchema.parse(result) : null;
  }

  async upsertSeo(data: UpsertSeoBodyDto): Promise<SeoResponseDto> {
    return await db.transaction(async (tx) => {
      const car = await this.carRepository.findById(data.carId);
      const { carId, ...seoData } = data;

      const seo = await this.seoRepository.upsert(
        car?.seoId,
        seoData,
        tx as DbOrTransaction,
      );

      if (car && car.seoId !== seo.id) {
        await this.carRepository.update(carId, { seoId: seo.id }, tx as any);
      }

      return SeoResponseSchema.parse(seo);
    });
  }
}
