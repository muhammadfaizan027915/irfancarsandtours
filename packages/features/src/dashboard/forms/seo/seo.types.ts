import type { SeoResponseDto } from "@icat/contracts";

export type SeoFormProps = {
  carId: string;
  seo?: SeoResponseDto | null;
};