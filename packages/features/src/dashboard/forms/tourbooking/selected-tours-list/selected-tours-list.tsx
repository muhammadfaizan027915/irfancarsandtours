"use client";

import { Minus, Plus, Trash2, Map } from "lucide-react";

import { TourResponseDto } from "@icat/contracts";
import { Button } from "@icat/ui/components/button";
import { EmptyMessage } from "@icat/ui/components/empty-message";
import { Input } from "@icat/ui/components/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@icat/ui/components/table";

export type SelectedTour = {
  tour: TourResponseDto;
  adultsNumber: number;
  childrenNumber: number;
  quotedPricePerAdult: number;
  quotedPricePerChild: number;
};

export type SelectedToursListProps = {
  selectedTours: SelectedTour[];
  onUpdate: (tourId: string, updates: Partial<SelectedTour>) => void;
  onRemove: (tourId: string) => void;
};

export function SelectedToursList({ selectedTours, onUpdate, onRemove }: SelectedToursListProps) {
  if (selectedTours.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed rounded-lg bg-muted/20">
        <EmptyMessage 
          icon={Map} 
          message="No tours selected yet. Search and add tours above." 
        />
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tour</TableHead>
            <TableHead className="w-32">Price (Adult/Child)</TableHead>
            <TableHead className="w-32 text-center">Adults</TableHead>
            <TableHead className="w-32 text-center">Children</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedTours.map((st) => (
            <TableRow key={st.tour.id}>
              <TableCell>
                <div className="font-medium">{st.tour.name}</div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Per Adult</label>
                    <Input
                      type="number"
                      min={0}
                      value={st.quotedPricePerAdult}
                      onChange={(e) =>
                        onUpdate(st.tour.id, {
                          quotedPricePerAdult: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="h-8"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Per Child</label>
                    <Input
                      type="number"
                      min={0}
                      value={st.quotedPricePerChild}
                      onChange={(e) =>
                        onUpdate(st.tour.id, {
                          quotedPricePerChild: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="h-8"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      onUpdate(st.tour.id, {
                        adultsNumber: Math.max(1, st.adultsNumber - 1),
                      })
                    }
                    type="button"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-4 text-center">{st.adultsNumber}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      onUpdate(st.tour.id, {
                        adultsNumber: st.adultsNumber + 1,
                      })
                    }
                    type="button"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      onUpdate(st.tour.id, {
                        childrenNumber: Math.max(0, st.childrenNumber - 1),
                      })
                    }
                    type="button"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-4 text-center">{st.childrenNumber}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      onUpdate(st.tour.id, {
                        childrenNumber: st.childrenNumber + 1,
                      })
                    }
                    type="button"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onRemove(st.tour.id)}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
