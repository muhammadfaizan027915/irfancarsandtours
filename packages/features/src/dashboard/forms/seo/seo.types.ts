import type { SeoResponseDto } from "@icat/contracts";

export type SeoFormProps = {
  carId?: string;
  tourId?: string;
  seo?: SeoResponseDto | null;
};