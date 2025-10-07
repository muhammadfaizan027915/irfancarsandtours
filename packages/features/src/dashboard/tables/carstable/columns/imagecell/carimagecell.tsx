import { CarCellPorps } from "./../columns.types";
import Image from "next/image";

export function CarImageCell({ row }: CarCellPorps) {
  const carName = row.original?.name || "Car Image";
  const imageUrl = row.original.imageUrls?.[0];

  return imageUrl ? (
    <div className="flex items-center">
      <Image
        alt={carName}
        src={imageUrl}
        width={50}
        height={50}
        className="w-24 h-24 rounded-md object-cover"
      />
    </div>
  ) : (
    <div className="flex items-center">
      <div className="w-24 h-24 rounded-md bg-muted flex items-center justify-center">
        <span className="text-xs text-muted-foreground">No Image</span>
      </div>
    </div>
  );
}
