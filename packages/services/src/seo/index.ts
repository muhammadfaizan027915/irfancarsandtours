import {
  CarWithSeoResponseDto,
  SeoResponseDto,
  SeoResponseSchema,
  UpsertSeoBodyDto,
} from "@icat/contracts";
import { CarRepository } from "@icat/repositories";

export class SeoService {
  private carRepository: CarRepository;

  constructor() {
    this.carRepository = new CarRepository();
  }

  async getByCarId(carId: string): Promise<SeoResponseDto | null> {
    const car = (await this.carRepository.findById(carId)) as CarWithSeoResponseDto | null;
    // Since findById uses 'with: { seo: true }', we can access it directly
    const result = car?.seo;
    return result ? SeoResponseSchema.parse(result) : null;
  }

  async upsertSeo(data: UpsertSeoBodyDto): Promise<SeoResponseDto | null> {
    const car = (await this.carRepository.update(data.carId, { id: data.carId, seo: data })) as CarWithSeoResponseDto | null;
    const result = car?.seo;
    return result ? SeoResponseSchema.parse(result) : null;
  }
}
