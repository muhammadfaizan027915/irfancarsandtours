"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { CarResponseDto } from "@icat/contracts";
import { Button } from "@icat/ui/components/button";
import { Checkbox } from "@icat/ui/components/checkbox";
import { Input } from "@icat/ui/components/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@icat/ui/components/table";

export type SelectedCar = {
  car: CarResponseDto;
  quantity: number;
  bookedWithDriver: boolean;
  quotedPrice: number;
};

export type SelectedCarsListProps = {
  selectedCars: SelectedCar[];
  onUpdate: (carId: string, updates: Partial<SelectedCar>) => void;
  onRemove: (carId: string) => void;
};

export function SelectedCarsList({ selectedCars, onUpdate, onRemove }: SelectedCarsListProps) {
  if (selectedCars.length === 0) {
    return (
      <div className="p-8 text-center border-2 border-dashed rounded-lg text-muted-foreground">
        No cars selected yet. Search and add cars above.
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Car</TableHead>
            <TableHead className="w-32">Price (Rs)</TableHead>
            <TableHead className="w-32 text-center">Quantity</TableHead>
            <TableHead className="w-32 text-center">With Driver</TableHead>
            <TableHead className="w-16 text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedCars.map((sc) => (
            <TableRow key={sc.car.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{sc.car.brand} {sc.car.name}</span>
                  <span className="text-xs text-muted-foreground">{sc.car.model}</span>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={sc.quotedPrice}
                  onChange={(e) => onUpdate(sc.car.id, { quotedPrice: parseInt(e.target.value) || 0 })}
                  className="h-8 shadow-none"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full shadow-none"
                    onClick={() => onUpdate(sc.car.id, { quantity: Math.max(1, sc.quantity - 1) })}
                  >
                    <Minus size={12} />
                  </Button>
                  <span className="w-4 text-center text-sm">{sc.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full shadow-none"
                    onClick={() => onUpdate(sc.car.id, { quantity: sc.quantity + 1 })}
                  >
                    <Plus size={12} />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Checkbox
                  checked={sc.bookedWithDriver}
                  onCheckedChange={(checked) => onUpdate(sc.car.id, { bookedWithDriver: !!checked })}
                />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onRemove(sc.car.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
