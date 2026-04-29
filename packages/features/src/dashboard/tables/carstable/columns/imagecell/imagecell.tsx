import { SmallImage } from "@icat/ui/components/small-image";

import { CarCellProps } from "../columns.types";

export function CarImageCell({ row }: CarCellProps) {
  const carName = row.original?.name || "Car Image";
  const imageUrl = row.original.imageUrls?.[0];

  return <SmallImage src={imageUrl} alt={carName} />;
}
