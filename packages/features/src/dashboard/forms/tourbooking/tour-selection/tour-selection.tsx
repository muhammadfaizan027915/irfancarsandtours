"use client";

import { Check, ChevronsUpDown, Loader2, SearchIcon } from "lucide-react";
import * as React from "react";

import { TourResponseDto } from "@icat/contracts";
import { Button } from "@icat/ui/components/button";
import { Input } from "@icat/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@icat/ui/components/popover";
import { cn } from "@icat/ui/lib/utils";
import { searchToursForBooking } from "@icat/web/actions";

export type TourSelectionProps = {
  onSelect: (tour: TourResponseDto) => void;
  selectedTourIds: string[];
};

const PAGE_SIZE = 10;

export function TourSelection({ onSelect, selectedTourIds }: TourSelectionProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [tours, setTours] = React.useState<TourResponseDto[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);

  const fetchTours = React.useCallback(
    async (pageNum: number, isInitial: boolean = false, searchTerm: string = search) => {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      try {
        const result = await searchToursForBooking({
          search: searchTerm,
          limit: PAGE_SIZE,
          page: pageNum,
        } as any);
        const newTours = result.data as TourResponseDto[];

        setTours((prev) => (isInitial ? newTours : [...prev, ...newTours]));
        setHasMore(newTours.length === PAGE_SIZE);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [search]
  );

  const handleSearch = () => {
    setPage(1);
    fetchTours(1, true);
  };

  React.useEffect(() => {
    // Only fetch when popover opens initially
    if (open && tours.length === 0) {
      fetchTours(1, true, "");
    }
  }, [open, tours.length, fetchTours]);

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMore && !loading && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTours(nextPage);
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
              <span>Search and add tours...</span>
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
                placeholder="Search tours by name or location..."
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
            {!loading && tours.length === 0 && (
              <div className="p-4 text-sm text-center text-muted-foreground">
                No tours found.
              </div>
            )}

            {tours.map((tour) => {
              const isSelected = selectedTourIds.includes(tour.id);
              return (
                <div
                  key={tour.id}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-2 cursor-pointer transition-colors",
                    isSelected
                      ? "opacity-50 cursor-not-allowed bg-accent/50"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => {
                    if (!isSelected) {
                      onSelect(tour);
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
                      {tour.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      Starting at Rs. {tour.pricePerAdult} / Adult
                    </span>
                  </div>
                </div>
              );
            })}

            {hasMore && tours.length > 0 && (
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
                  {loadingMore ? "Loading..." : "Load More Tours"}
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
