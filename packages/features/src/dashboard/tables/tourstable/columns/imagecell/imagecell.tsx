import { SmallImage } from "@icat/ui/components/small-image";

import { TourCellProps } from "../columns.types";

export function TourImageCell({ row }: TourCellProps) {
  const tourName = row.original?.name || "Tour Image";
  const imageUrl = row.original.imageUrls?.[0];

  return <SmallImage src={imageUrl} alt={tourName} />;
}
