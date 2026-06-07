"use client";

import { Check, ChevronsUpDown, Loader2, SearchIcon } from "lucide-react";
import * as React from "react";

import { CarResponseDto } from "@icat/contracts";
import { Button } from "@icat/ui/components/button";
import { Input } from "@icat/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@icat/ui/components/popover";
import { cn } from "@icat/ui/lib/utils";
import { searchCarsForBooking } from "@icat/web/actions";

export type CarSelectionProps = {
  onSelect: (car: CarResponseDto) => void;
  selectedCarIds: string[];
};

const PAGE_SIZE = 10;

export function CarSelection({ onSelect, selectedCarIds }: CarSelectionProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [cars, setCars] = React.useState<CarResponseDto[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);

  const fetchCars = React.useCallback(
    async (pageNum: number, isInitial: boolean = false, searchTerm: string = search) => {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      try {
        const result = await searchCarsForBooking({
          search: searchTerm,
          limit: PAGE_SIZE,
          page: pageNum,
        });
        const newCars = result.data as CarResponseDto[];

        setCars((prev) => (isInitial ? newCars : [...prev, ...newCars]));
        setHasMore(newCars.length === PAGE_SIZE);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [search]
  );

  const handleSearch = () => {
    setPage(1);
    fetchCars(1, true);
  };

  React.useEffect(() => {
    fetchCars(1, true, "");
  }, [fetchCars]);

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMore && !loading && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCars(nextPage);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-11"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <SearchIcon className="size-4" />
              <span>Search and add cars...</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <div className="p-2 border-b">
            <div className="relative">
              <SearchIcon 
                className="absolute left-2 top-2.5 size-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" 
                onClick={handleSearch}
              />
              <Input
                placeholder="Search cars by name, model or brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="pl-8 h-9 shadow-none"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {loading && page === 1 && (
              <div className="p-4 text-sm text-center text-muted-foreground">
                Searching...
              </div>
            )}
            {!loading && cars.length === 0 && (
              <div className="p-4 text-sm text-center text-muted-foreground">
                No cars found.
              </div>
            )}

            {cars.map((car) => {
              const isSelected = selectedCarIds.includes(car.id);
              return (
                <div
                  key={car.id}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-2 cursor-pointer transition-colors",
                    isSelected
                      ? "opacity-50 cursor-not-allowed bg-accent/50"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => {
                    if (!isSelected) {
                      onSelect(car);
                      setOpen(false);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0 text-primary",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">
                      {car.brand} {car.name} ({car.model})
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      Starting Price: Rs. {car.startingPrice}
                    </span>
                  </div>
                </div>
              );
            })}

            {hasMore && cars.length > 0 && (
              <div className="p-2 border-t mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-muted-foreground hover:text-primary"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <Loader2 className="size-3 animate-spin mr-2" />
                  ) : null}
                  {loadingMore ? "Loading..." : "Load More Cars"}
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
